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

//
// CREATE COMMENT
//
func CreateComment(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := auth.GetUserID(r)
		postIDStr := chi.URLParam(r, "postID")
		postID, err := strconv.Atoi(postIDStr)
		if err != nil {
			http.Error(w, "Invalid post ID", http.StatusBadRequest)
			return
		}

		var req struct {
			Content string `json:"content"`
		}

		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			log.Println("CreateComment decode error:", err)
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}
		if req.Content == "" {
			http.Error(w, "Content cannot be empty", http.StatusBadRequest)
			return
		}

		now := time.Now()

		res, err := db.Exec(`
			INSERT INTO comments (content, author_id, post_id, created_at, updated_at)
			VALUES (?, ?, ?, ?, ?)
		`, req.Content, userID, postID, now, now)
		if err != nil {
			log.Println("CreateComment DB error:", err)
			http.Error(w, "Failed to create comment", http.StatusInternalServerError)
			return
		}

		id, _ := res.LastInsertId()

		comment := models.Comment{
			ID:        int(id),
			Content:   req.Content,
			AuthorID:  userID,
			PostID:    postID,
			CreatedAt: now,
			UpdatedAt: now,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(comment)
	}
}

//
// UPDATE COMMENT
//
func UpdateComment(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := auth.GetUserID(r)
		commentIDStr := chi.URLParam(r, "commentID")
		commentID, err := strconv.Atoi(commentIDStr)
		if err != nil {
			http.Error(w, "Invalid comment ID", http.StatusBadRequest)
			return
		}

		var req struct {
			Content string `json:"content"`
		}
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			log.Println("UpdateComment decode error:", err)
			http.Error(w, "Invalid body", http.StatusBadRequest)
			return
		}
		if req.Content == "" {
			http.Error(w, "Content cannot be empty", http.StatusBadRequest)
			return
		}

		// Verify ownership
		var authorID int
		err = db.QueryRow(`SELECT author_id FROM comments WHERE id = ?`, commentID).Scan(&authorID)
		if err == sql.ErrNoRows {
			http.Error(w, "Comment not found", http.StatusNotFound)
			return
		}
		if authorID != userID {
			http.Error(w, "Forbidden: cannot edit this comment", http.StatusForbidden)
			return
		}

		_, err = db.Exec(`
			UPDATE comments 
			SET content = ?, updated_at = CURRENT_TIMESTAMP
			WHERE id = ?
		`, req.Content, commentID)
		if err != nil {
			log.Println("UpdateComment DB error:", err)
			http.Error(w, "Failed to update comment", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(struct {
			ID      int    `json:"id"`
			Content string `json:"content"`
		}{
			ID:      commentID,
			Content: req.Content,
		})
	}
}

//
// DELETE COMMENT
//
func DeleteComment(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := auth.GetUserID(r)
		commentIDStr := chi.URLParam(r, "commentID")
		commentID, err := strconv.Atoi(commentIDStr)
		if err != nil {
			http.Error(w, "Invalid comment ID", http.StatusBadRequest)
			return
		}

		// Verify ownership
		var authorID int
		err = db.QueryRow(`SELECT author_id FROM comments WHERE id = ?`, commentID).Scan(&authorID)
		if err == sql.ErrNoRows {
			http.Error(w, "Comment not found", http.StatusNotFound)
			return
		}
		if authorID != userID {
			http.Error(w, "Forbidden: cannot delete this comment", http.StatusForbidden)
			return
		}

		_, err = db.Exec(`DELETE FROM comments WHERE id = ?`, commentID)
		if err != nil {
			log.Println("DeleteComment DB error:", err)
			http.Error(w, "Failed to delete comment", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{
			"message": "Comment deleted",
		})
	}
}

//
// GET ALL COMMENTS FOR A POST (OPTIONAL, if needed)
//
func GetComments(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		postIDStr := chi.URLParam(r, "postID")
		postID, err := strconv.Atoi(postIDStr)
		if err != nil {
			http.Error(w, "Invalid post ID", http.StatusBadRequest)
			return
		}

		rows, err := db.Query(`
			SELECT id, content, author_id, post_id, created_at, updated_at
			FROM comments
			WHERE post_id = ?
			ORDER BY created_at ASC
		`, postID)
		if err != nil {
			log.Println("GetComments DB error:", err)
			http.Error(w, "Failed to fetch comments", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var comments []models.Comment

		for rows.Next() {
			var c models.Comment
			var createdStr, updatedStr string
			if err := rows.Scan(&c.ID, &c.Content, &c.AuthorID, &c.PostID, &createdStr, &updatedStr); err != nil {
				continue
			}
			c.CreatedAt, _ = time.Parse(time.RFC3339, createdStr)
			c.UpdatedAt, _ = time.Parse(time.RFC3339, updatedStr)
			comments = append(comments, c)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(comments)
	}
}
