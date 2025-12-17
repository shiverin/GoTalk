package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"

	auth "github.com/shiverin/gotalk/backend/internal/middleware"
)

// ---- CREATE POST ----
func GetTopCommunities(db *sql.DB) http.HandlerFunc {
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
