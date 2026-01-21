package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
)

// Vote represents a vote
type Vote struct {
	UserID int `json:"userId"`
	PostID int `json:"postId"`
	Value  int `json:"value"` // 1 = upvote, -1 = downvote
}

// POST /vote
func CastVote(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var v Vote
		if err := json.NewDecoder(r.Body).Decode(&v); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		if v.Value != 1 && v.Value != -1 {
			http.Error(w, "Vote must be 1 (upvote) or -1 (downvote)", http.StatusBadRequest)
			return
		}

		// Fetch existing vote
		var existing int
		err := db.QueryRow(`SELECT value FROM votes WHERE user_id = ? AND post_id = ?`, v.UserID, v.PostID).Scan(&existing)
		if err != nil && err != sql.ErrNoRows {
			log.Println("DB select error:", err)
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}

		tx, err := db.Begin()
		if err != nil {
			log.Println("DB transaction begin error:", err)
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}
		defer tx.Rollback()

		if existing == v.Value {
			// Toggle vote off -> delete
			_, err = tx.Exec(`DELETE FROM votes WHERE user_id = ? AND post_id = ?`, v.UserID, v.PostID)
			if err != nil {
				log.Println("DB delete error:", err)
				http.Error(w, "Database error", http.StatusInternalServerError)
				return
			}
			v.Value = 0 // vote removed
		} else {
			// Insert new vote or update existing
			_, err = tx.Exec(`
				INSERT INTO votes (user_id, post_id, value)
				VALUES (?, ?, ?)
				ON CONFLICT(user_id, post_id) DO UPDATE SET value = excluded.value
			`, v.UserID, v.PostID, v.Value)
			if err != nil {
				log.Println("DB insert/update error:", err)
				http.Error(w, "Database error", http.StatusInternalServerError)
				return
			}
		}

		// Update post score
		if err := UpdatePostScoreTx(tx, v.PostID); err != nil {
			log.Println("UpdatePostScore error:", err)
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}

		if err := tx.Commit(); err != nil {
			log.Println("DB transaction commit error:", err)
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}

		// Return current vote and updated score
		var score int
		err = db.QueryRow(`SELECT score FROM posts WHERE id = ?`, v.PostID).Scan(&score)
		if err != nil {
			log.Println("Fetch post score error:", err)
			score = 0
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"status": "success",
			"value":  v.Value,
			"score":  score,
		})
	}
}

// DELETE /vote
func RemoveVote(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var v Vote
		if err := json.NewDecoder(r.Body).Decode(&v); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		tx, err := db.Begin()
		if err != nil {
			log.Println("DB transaction begin error:", err)
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}
		defer tx.Rollback()

		_, err = tx.Exec(`DELETE FROM votes WHERE user_id = ? AND post_id = ?`, v.UserID, v.PostID)
		if err != nil {
			log.Println("DB delete error:", err)
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}

		if err := UpdatePostScoreTx(tx, v.PostID); err != nil {
			log.Println("UpdatePostScore error:", err)
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}

		if err := tx.Commit(); err != nil {
			log.Println("DB transaction commit error:", err)
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}

		var score int
		err = db.QueryRow(`SELECT score FROM posts WHERE id = ?`, v.PostID).Scan(&score)
		if err != nil {
			log.Println("Fetch post score error:", err)
			score = 0
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"status": "removed",
			"value":  0,
			"score":  score,
		})
	}
}

// GET /vote/{userID}/{postID}
func GetVote(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userIDStr := chi.URLParam(r, "userID")
		postIDStr := chi.URLParam(r, "postID")

		userID, err := strconv.Atoi(userIDStr)
		if err != nil {
			http.Error(w, "Invalid user ID", http.StatusBadRequest)
			return
		}
		postID, err := strconv.Atoi(postIDStr)
		if err != nil {
			http.Error(w, "Invalid post ID", http.StatusBadRequest)
			return
		}

		var value int
		err = db.QueryRow(`SELECT value FROM votes WHERE user_id = ? AND post_id = ?`, userID, postID).Scan(&value)
		if err == sql.ErrNoRows {
			value = 0
		} else if err != nil {
			log.Println("DB select error:", err)
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]int{"value": value})
	}
}

// UpdatePostScoreTx updates post score inside a transaction
func UpdatePostScoreTx(tx *sql.Tx, postID int) error {
	_, err := tx.Exec(`
		UPDATE posts
		SET score = COALESCE((SELECT SUM(value) FROM votes WHERE post_id = ?), 0)
		WHERE id = ?
	`, postID, postID)
	return err
}
