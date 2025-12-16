package handlers

import (
	"database/sql"
	"encoding/json"
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

		var req struct {
			Title       string `json:"title"`
			Content     string `json:"content"`
			Link        string `json:"link"`
			CommunityID int    `json:"communityId"`
		}

		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		res, err := db.Exec(`
			INSERT INTO posts (title, content, link, author_id, community_id)
			VALUES (?, ?, ?, ?, ?)
		`, req.Title, req.Content, req.Link, userID, req.CommunityID)

		if err != nil {
			http.Error(w, "Failed to create post", http.StatusInternalServerError)
			return
		}

		postID, _ := res.LastInsertId()
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]int64{"id": postID})
	}
}

// ---- GET ALL POSTS ----
func GetPosts(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		query := `
			SELECT p.id, p.title, p.content, p.link, p.author_id, p.community_id,
			       p.created_at, p.updated_at,
			       u.username,
			       (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comments_count,
			       COALESCE((SELECT SUM(value) FROM votes WHERE post_id = p.id), 0) as score
			FROM posts p
			JOIN users u ON p.author_id = u.id
			ORDER BY p.created_at DESC
		`

		rows, err := db.Query(query)
		if err != nil {
			http.Error(w, "Failed to fetch posts", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var posts []struct {
			Post      models.Post   `json:"post"`
			Community models.Community `json:"community"`
		}

		for rows.Next() {
			var p models.Post
			var createdAtStr, updatedAtStr string

			if err := rows.Scan(&p.ID, &p.Title, &p.Content, &p.Link, &p.AuthorID, &p.CommunityID,
				&createdAtStr, &updatedAtStr, &p.Author, &p.CommentsCount, &p.Score); err != nil {
				http.Error(w, "Failed to parse posts", http.StatusInternalServerError)
				return
			}

			p.CreatedAt, _ = time.Parse("2006-01-02 15:04:05", createdAtStr)
			p.UpdatedAt, _ = time.Parse("2006-01-02 15:04:05", updatedAtStr)

			community, err := GetCommunityByID(db, p.CommunityID)
			if err != nil {
				http.Error(w, "Failed to fetch community", http.StatusInternalServerError)
				return
			}

			posts = append(posts, struct {
				Post      models.Post   `json:"post"`
				Community models.Community `json:"community"`
			}{
				Post:      p,
				Community: community,
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
			http.Error(w, "Invalid post ID", http.StatusBadRequest)
			return
		}

		var p models.Post
		var createdAtStr, updatedAtStr string
		query := `
			SELECT p.id, p.title, p.content, p.link, p.author_id, p.community_id,
			       p.created_at, p.updated_at,
			       u.username,
			       (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comments_count,
			       COALESCE((SELECT SUM(value) FROM votes WHERE post_id = p.id), 0) as score
			FROM posts p
			JOIN users u ON p.author_id = u.id
			WHERE p.id = ?
		`

		if err := db.QueryRow(query, postID).Scan(&p.ID, &p.Title, &p.Content, &p.Link,
			&p.AuthorID, &p.CommunityID, &createdAtStr, &updatedAtStr,
			&p.Author, &p.CommentsCount, &p.Score); err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, "Post not found", http.StatusNotFound)
				return
			}
			http.Error(w, "Failed to fetch post", http.StatusInternalServerError)
			return
		}

		p.CreatedAt, _ = time.Parse("2006-01-02 15:04:05", createdAtStr)
		p.UpdatedAt, _ = time.Parse("2006-01-02 15:04:05", updatedAtStr)

		community, err := GetCommunityByID(db, p.CommunityID)
		if err != nil {
			http.Error(w, "Failed to fetch community", http.StatusInternalServerError)
			return
		}

		response := struct {
			Post      models.Post   `json:"post"`
			Community models.Community `json:"community"`
		}{
			Post:      p,
			Community: community,
		}

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
			http.Error(w, "Invalid post ID", http.StatusBadRequest)
			return
		}

		var req struct {
			Title   string `json:"title"`
			Content string `json:"content"`
			Link    string `json:"link"`
		}
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		var authorID int
		if err := db.QueryRow(`SELECT author_id FROM posts WHERE id = ?`, postID).Scan(&authorID); err != nil {
			http.Error(w, "Post not found", http.StatusNotFound)
			return
		}
		if authorID != userID {
			http.Error(w, "Forbidden: cannot edit this post", http.StatusForbidden)
			return
		}

		_, err = db.Exec(`
			UPDATE posts SET title = ?, content = ?, link = ?, updated_at = CURRENT_TIMESTAMP
			WHERE id = ?
		`, req.Title, req.Content, req.Link, postID)
		if err != nil {
			http.Error(w, "Failed to update post", http.StatusInternalServerError)
			return
		}

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
			http.Error(w, "Invalid post ID", http.StatusBadRequest)
			return
		}

		var authorID int
		if err := db.QueryRow(`SELECT author_id FROM posts WHERE id = ?`, postID).Scan(&authorID); err != nil {
			http.Error(w, "Post not found", http.StatusNotFound)
			return
		}
		if authorID != userID {
			http.Error(w, "Forbidden: cannot delete this post", http.StatusForbidden)
			return
		}

		_, err = db.Exec(`DELETE FROM posts WHERE id = ?`, postID)
		if err != nil {
			http.Error(w, "Failed to delete post", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
	}
}

// ---- HELPER: GET COMMUNITY BY ID ----
func GetCommunityByID(db *sql.DB, id int) (models.Community, error) {
	var c models.Community
	var createdAtStr string
	query := `SELECT id, name, icon, created_at FROM communities WHERE id = ?`
	err := db.QueryRow(query, id).Scan(&c.ID, &c.Name, &c.Icon, &createdAtStr)
	if err != nil {
		return c, err
	}
	c.CreatedAt, _ = time.Parse("2006-01-02 15:04:05", createdAtStr)
	return c, nil
}
