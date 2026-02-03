package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/shiverin/gotalk/backend/internal/models"
)

func GetUserByID(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		userIDStr := chi.URLParam(r, "userID")
		userID, err := strconv.Atoi(userIDStr)
		if err != nil {
			http.Error(w, "Invalid user ID", http.StatusBadRequest)
			return
		}

		var user models.User
		var createdAt sql.NullTime

		err = db.QueryRow(`
            SELECT id, username, email, created_at 
            FROM users 
            WHERE id = ?
        `, userID).Scan(
			&user.ID,
			&user.Username,
			&user.Email,
			&createdAt,
		)

		if err != nil {
			log.Println("GetUserByID DB ERROR:", err)
			if err == sql.ErrNoRows {
				http.Error(w, "User not found", http.StatusNotFound)
				return
			}
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}

		// Convert NullTime → time.Time
		if createdAt.Valid {
			user.CreatedAt = createdAt.Time
		}

		// Convert NullString → string for JSON
		response := map[string]interface{}{
			"id":        user.ID,
			"username":  user.Username.String,
			"email":     user.Email.String,
			"createdAt": user.CreatedAt,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

func GetPostsByUser(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		userIDStr := chi.URLParam(r, "userID")
		userID, err := strconv.Atoi(userIDStr)
		if err != nil {
			http.Error(w, "Invalid user ID", http.StatusBadRequest)
			return
		}

		query := `
			SELECT 
				p.id, p.title, p.content, p.link, p.author_id, p.community_id,
				p.created_at, p.updated_at,
				COALESCE((SELECT SUM(value) FROM votes WHERE post_id = p.id), 0) as score,
				COALESCE((SELECT COUNT(*) FROM comments WHERE post_id = p.id), 0) as comments_count
			FROM posts p
			WHERE p.author_id = ?
			ORDER BY p.created_at DESC
		`

		rows, err := db.Query(query, userID)
		if err != nil {
			http.Error(w, "DB error", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var result []struct {
			Post          models.Post      `json:"post"`
			Author        string           `json:"author"`
			Community     models.Community `json:"community"`
			Comments      []models.Comment `json:"comments"`
			Score         int              `json:"score"`
			CommentsCount int              `json:"commentsCount"`
		}

		for rows.Next() {
			var p models.Post
			var content, link sql.NullString
			var createdStr, updatedStr string
			var score, commentsCount sql.NullInt64

			if err := rows.Scan(
				&p.ID, &p.Title, &content, &link,
				&p.AuthorID, &p.CommunityID,
				&createdStr, &updatedStr,
				&score, &commentsCount,
			); err != nil {
				continue
			}

			// Fix nullable values
			p.Content = content.String
			p.Link = link.String

			p.CreatedAt, _ = parseTime(createdStr)
			p.UpdatedAt, _ = parseTime(updatedStr)

			// Fetch username
			var author string
			if err := db.QueryRow("SELECT username FROM users WHERE id = ?", p.AuthorID).Scan(&author); err != nil {
				author = "Unknown"
			}

			// Fetch community data
			community, err := GetCommunityByID(db, p.CommunityID)
			if err != nil {
				continue
			}

			// Fetch comments for this post
			commentRows, err := db.Query(`
				SELECT id, content, author_id, post_id, created_at, updated_at
				FROM comments
				WHERE post_id = ?
				ORDER BY created_at ASC
			`, p.ID)
			if err != nil {
				continue
			}

			var postComments []models.Comment
			for commentRows.Next() {
				var c models.Comment
				var created, updated string
				if err := commentRows.Scan(&c.ID, &c.Content, &c.AuthorID, &c.PostID, &created, &updated); err != nil {
					continue
				}
				c.CreatedAt, _ = parseTime(created)
				c.UpdatedAt, _ = parseTime(updated)
				postComments = append(postComments, c)
			}
			commentRows.Close()

			// Append aligned structure
			result = append(result, struct {
				Post          models.Post      `json:"post"`
				Author        string           `json:"author"`
				Community     models.Community `json:"community"`
				Comments      []models.Comment `json:"comments"`
				Score         int              `json:"score"`
				CommentsCount int              `json:"commentsCount"`
			}{
				Post:          p,
				Author:        author,
				Community:     community,
				Comments:      postComments,
				Score:         int(score.Int64),
				CommentsCount: int(commentsCount.Int64),
			})
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(result)
	}
}

func GetCommentsByUser(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		userIDStr := chi.URLParam(r, "userID")
		userID, err := strconv.Atoi(userIDStr)
		if err != nil {
			http.Error(w, "Invalid user ID", http.StatusBadRequest)
			return
		}

		rows, err := db.Query(`
            SELECT id, content, author_id, post_id, created_at, updated_at
            FROM comments
            WHERE author_id = ?
            ORDER BY created_at DESC
        `, userID)

		if err != nil {
			http.Error(w, "DB error", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		comments := []models.Comment{}

		for rows.Next() {
			var c models.Comment
			err := rows.Scan(
				&c.ID,
				&c.Content,
				&c.AuthorID,
				&c.PostID,
				&c.CreatedAt,
				&c.UpdatedAt,
			)
			if err != nil {
				continue
			}

			comments = append(comments, c)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(comments)
	}
}
