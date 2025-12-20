package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
	auth "github.com/shiverin/gotalk/backend/internal/middleware"
	"github.com/shiverin/gotalk/backend/internal/models"
)

// ---- CREATE POST ----
func CreatePost(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := auth.GetUserID(r)
		log.Println("CreatePost called by userID:", userID)

		var req struct {
			Title       string `json:"title"`
			Content     string `json:"content"`
			Link        string `json:"link"`
			CommunityID int    `json:"communityId"`
		}

		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			log.Println("CreatePost decode error:", err)
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		log.Printf("CreatePost payload: %+v\n", req)

		res, err := db.Exec(`
			INSERT INTO posts (title, content, link, author_id, community_id)
			VALUES (?, ?, ?, ?, ?)
		`, req.Title, req.Content, req.Link, userID, req.CommunityID)
		if err != nil {
			log.Println("CreatePost db.Exec error:", err)
			http.Error(w, "Failed to create post", http.StatusInternalServerError)
			return
		}

		postID, err := res.LastInsertId()
		if err != nil {
			log.Println("CreatePost LastInsertId error:", err)
			http.Error(w, "Failed to retrieve post ID", http.StatusInternalServerError)
			return
		}

		log.Println("CreatePost successful, postID:", postID)
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]int64{"id": postID})
	}
}

// ---- GET ALL POSTS ----
func GetPosts(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println("GetPosts called")

		// Fetch posts with basic info and score/comments count
		query := `
			SELECT 
				p.id, p.title, p.content, p.link, p.author_id, p.community_id,
				p.created_at, p.updated_at,
				COALESCE((SELECT SUM(value) FROM votes WHERE post_id = p.id), 0) as score,
				COALESCE((SELECT COUNT(*) FROM comments WHERE post_id = p.id), 0) as comments_count
			FROM posts p
			ORDER BY p.created_at DESC
		`

		rows, err := db.Query(query)
		if err != nil {
			log.Println("GetPosts db.Query error:", err)
			http.Error(w, "Failed to fetch posts", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var posts []struct {
			Post      models.Post      `json:"post"`
			Author    string           `json:"author"`
			Community models.Community `json:"community"`
			Comments  []models.Comment `json:"comments"`
			Score     int              `json:"score"`
		}

		for rows.Next() {
			var p models.Post
			var authorID, communityID int
			var createdStr, updatedStr string
			var content, link sql.NullString
			var score, commentsCount sql.NullInt64

			if err := rows.Scan(
				&p.ID, &p.Title, &content, &link, &authorID, &communityID,
				&createdStr, &updatedStr, &score, &commentsCount,
			); err != nil {
				log.Println("GetPosts rows.Scan error:", err)
				http.Error(w, "Failed to parse posts", http.StatusInternalServerError)
				return
			}

			// Assign nullable fields
			p.Content = ""
			if content.Valid {
				p.Content = content.String
			}
			p.Link = ""
			if link.Valid {
				p.Link = link.String
			}

			// Parse timestamps
			var err1, err2 error
			p.CreatedAt, err1 = time.Parse(time.RFC3339, createdStr)
			p.UpdatedAt, err2 = time.Parse(time.RFC3339, updatedStr)
			if err1 != nil || err2 != nil {
				log.Println("GetPosts time.Parse error:", err1, err2)
				http.Error(w, "Invalid post timestamp format", http.StatusInternalServerError)
				return
			}

			// Score
			p.Score = 0
			if score.Valid {
				p.Score = int(score.Int64)
			}

			// Fetch author username
			var author string
			if err := db.QueryRow("SELECT username FROM users WHERE id = ?", authorID).Scan(&author); err != nil {
				log.Println("GetPosts author lookup error:", err)
				author = "Unknown"
			}

			// Fetch community info
			community, err := GetCommunityByID(db, communityID)
			if err != nil {
				log.Println("GetPosts GetCommunityByID error:", err)
				http.Error(w, "Failed to fetch community", http.StatusInternalServerError)
				return
			}

			// Fetch all comments for this post
			commentsQuery := `
				SELECT id, content, author_id, post_id, created_at, updated_at
				FROM comments
				WHERE post_id = ?
				ORDER BY created_at ASC
			`
			commentRows, err := db.Query(commentsQuery, p.ID)
			if err != nil {
				log.Println("GetPosts comment query error:", err)
				http.Error(w, "Failed to fetch comments", http.StatusInternalServerError)
				return
			}
			defer commentRows.Close()

			var postComments []models.Comment
			for commentRows.Next() {
				var c models.Comment
				var created, updated string
				if err := commentRows.Scan(&c.ID, &c.Content, &c.AuthorID, &c.PostID, &created, &updated); err != nil {
					log.Println("GetPosts comment scan error:", err)
					continue
				}
				c.CreatedAt, _ = time.Parse(time.RFC3339, created)
				c.UpdatedAt, _ = time.Parse(time.RFC3339, updated)
				postComments = append(postComments, c)
			}

			posts = append(posts, struct {
				Post      models.Post      `json:"post"`
				Author    string           `json:"author"`
				Community models.Community `json:"community"`
				Comments  []models.Comment `json:"comments"`
				Score     int              `json:"score"`
			}{
				Post:      p,
				Author:    author,
				Community: community,
				Comments:  postComments,
				Score:     p.Score,
			})
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(posts)
	}
}


// ---- GET SINGLE POST ----
func GetPost(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		postIDStr := chi.URLParam(r, "postID")
		postID, err := strconv.Atoi(postIDStr)
		if err != nil {
			log.Println("GetPost invalid postID:", postIDStr)
			http.Error(w, "Invalid post ID", http.StatusBadRequest)
			return
		}
		log.Println("GetPost called for postID:", postID)

		var p models.Post
		var createdAtStr, updatedAtStr string
		var link sql.NullString

		query := `
			SELECT p.id, p.title, p.content, p.link, p.author_id, p.community_id,
			       p.created_at, p.updated_at,
			       COALESCE((SELECT SUM(value) FROM votes WHERE post_id = p.id), 0) as score
			FROM posts p
			WHERE p.id = ?
		`

		if err := db.QueryRow(query, postID).Scan(
			&p.ID, &p.Title, &p.Content, &link, &p.AuthorID, &p.CommunityID,
			&createdAtStr, &updatedAtStr, &p.Score,
		); err != nil {
			if err == sql.ErrNoRows {
				log.Println("GetPost not found postID:", postID)
				http.Error(w, "Post not found", http.StatusNotFound)
				return
			}
			log.Println("GetPost db.QueryRow error:", err)
			http.Error(w, "Failed to fetch post", http.StatusInternalServerError)
			return
		}

		if link.Valid {
			p.Link = link.String
		} else {
			p.Link = ""
		}

		p.CreatedAt, err = time.Parse(time.RFC3339, createdAtStr)
		if err != nil {
			log.Println("GetPost time.Parse created_at error:", err)
			http.Error(w, "Invalid post created_at format", http.StatusInternalServerError)
			return
		}
		p.UpdatedAt, err = time.Parse(time.RFC3339, updatedAtStr)
		if err != nil {
			log.Println("GetPost time.Parse updated_at error:", err)
			http.Error(w, "Invalid post updated_at format", http.StatusInternalServerError)
			return
		}

		// Fetch post author username
		var authorName string
		if err := db.QueryRow(`SELECT username FROM users WHERE id = ?`, p.AuthorID).Scan(&authorName); err != nil {
			log.Println("GetPost author lookup error:", err)
			http.Error(w, "Failed to fetch author", http.StatusInternalServerError)
			return
		}

		// Fetch community
		community, err := GetCommunityByID(db, p.CommunityID)
		if err != nil {
			log.Println("GetPost GetCommunityByID error:", err)
			http.Error(w, "Failed to fetch community", http.StatusInternalServerError)
			return
		}

		// Fetch comments with usernames
		commentRows, err := db.Query(`
			SELECT c.id, c.content, c.author_id, u.username, c.post_id, c.created_at, c.updated_at
			FROM comments c
			JOIN users u ON c.author_id = u.id
			WHERE c.post_id = ?
			ORDER BY c.created_at ASC
		`, postID)
		if err != nil {
			log.Println("GetPost comments query error:", err)
			http.Error(w, "Failed to fetch comments", http.StatusInternalServerError)
			return
		}
		defer commentRows.Close()

		type CommentWithUsername struct {
			models.Comment
			Username string `json:"username"`
		}

		var comments []CommentWithUsername
		for commentRows.Next() {
			var c CommentWithUsername
			var createdStr, updatedStr string
			if err := commentRows.Scan(&c.ID, &c.Content, &c.AuthorID, &c.Username, &c.PostID, &createdStr, &updatedStr); err != nil {
				log.Println("GetPost comment scan error:", err)
				continue
			}
			c.CreatedAt, _ = time.Parse(time.RFC3339, createdStr)
			c.UpdatedAt, _ = time.Parse(time.RFC3339, updatedStr)
			comments = append(comments, c)
		}

		response := struct {
			Post      models.Post      `json:"post"`
			Author    string           `json:"author"`
			Community models.Community `json:"community"`
			Comments  []CommentWithUsername `json:"comments"`
		}{
			Post:      p,
			Author:    authorName,
			Community: community,
			Comments:  comments,
		}

		log.Printf("GetPost returning postID: %d, title: %s, comments: %d\n", p.ID, p.Title, len(comments))
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}




// ---- UPDATE POST ----
func UpdatePost(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := auth.GetUserID(r)
		postIDStr := chi.URLParam(r, "postID")
		postID, err := strconv.Atoi(postIDStr)
		if err != nil {
			log.Println("UpdatePost invalid postID:", postIDStr)
			http.Error(w, "Invalid post ID", http.StatusBadRequest)
			return
		}

		log.Println("UpdatePost called for postID:", postID, "by userID:", userID)

		var req struct {
			Title   string `json:"title"`
			Content string `json:"content"`
			Link    string `json:"link"`
		}
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			log.Println("UpdatePost decode error:", err)
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		var authorID int
		if err := db.QueryRow(`SELECT author_id FROM posts WHERE id = ?`, postID).Scan(&authorID); err != nil {
			log.Println("UpdatePost post not found postID:", postID)
			http.Error(w, "Post not found", http.StatusNotFound)
			return
		}
		if authorID != userID {
			log.Println("UpdatePost forbidden: userID", userID, "is not authorID", authorID)
			http.Error(w, "Forbidden: cannot edit this post", http.StatusForbidden)
			return
		}

		_, err = db.Exec(`
			UPDATE posts SET title = ?, content = ?, link = ?, updated_at = CURRENT_TIMESTAMP
			WHERE id = ?
		`, req.Title, req.Content, req.Link, postID)
		if err != nil {
			log.Println("UpdatePost db.Exec error:", err)
			http.Error(w, "Failed to update post", http.StatusInternalServerError)
			return
		}

		log.Println("UpdatePost successful postID:", postID)
		w.WriteHeader(http.StatusOK)
	}
}

// ---- DELETE POST ----
func DeletePost(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := auth.GetUserID(r)
		postIDStr := chi.URLParam(r, "postID")
		postID, err := strconv.Atoi(postIDStr)
		if err != nil {
			log.Println("DeletePost invalid postID:", postIDStr)
			http.Error(w, "Invalid post ID", http.StatusBadRequest)
			return
		}

		log.Println("DeletePost called for postID:", postID, "by userID:", userID)

		var authorID int
		if err := db.QueryRow(`SELECT author_id FROM posts WHERE id = ?`, postID).Scan(&authorID); err != nil {
			log.Println("DeletePost post not found postID:", postID)
			http.Error(w, "Post not found", http.StatusNotFound)
			return
		}
		if authorID != userID {
			log.Println("DeletePost forbidden: userID", userID, "is not authorID", authorID)
			http.Error(w, "Forbidden: cannot delete this post", http.StatusForbidden)
			return
		}

		_, err = db.Exec(`DELETE FROM posts WHERE id = ?`, postID)
		if err != nil {
			log.Println("DeletePost db.Exec error:", err)
			http.Error(w, "Failed to delete post", http.StatusInternalServerError)
			return
		}

		log.Println("DeletePost successful postID:", postID)
		w.WriteHeader(http.StatusOK)
	}
}
