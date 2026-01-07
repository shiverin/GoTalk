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

func CreateCommunity(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var c models.Community
		if err := json.NewDecoder(r.Body).Decode(&c); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		c.CreatedAt = time.Now()

		// Insert into communities
		result, err := db.Exec(
			`INSERT INTO communities 
                (name, icon, description, is_private, rules, created_at, members) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
			c.Name, c.Icon, c.Description, c.IsPrivate, c.Rules, c.CreatedAt, 1,
		)
		if err != nil {
			http.Error(w, "Failed to create community", http.StatusInternalServerError)
			return
		}

		communityID, _ := result.LastInsertId()
		c.ID = int(communityID)
		c.Members = 1
		c.PostsCount = 0

		// ⭐ Get logged in user ID (community owner)
		userID := auth.GetUserID(r)
		c.OwnerID = userID // ⭐ return owner to frontend

		// Insert owner into community_members table
		_, err = db.Exec(
			`INSERT INTO community_members (user_id, community_id, role, joined_at)
             VALUES (?, ?, ?, ?)`,
			userID, communityID, "owner", time.Now(),
		)

		if err != nil {
			http.Error(w, "Failed to assign community owner", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(c)
	}
}

// UpdateCommunity updates an existing community
func UpdateCommunity(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		idStr := chi.URLParam(r, "communityID")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "Invalid community ID", http.StatusBadRequest)
			return
		}

		var c models.Community
		if err := json.NewDecoder(r.Body).Decode(&c); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		_, err = db.Exec(
			`UPDATE communities 
			 SET name=?, icon=?, description=?, is_private=?, rules=? 
			 WHERE id=?`,
			c.Name, c.Icon, c.Description, c.IsPrivate, c.Rules, id,
		)
		if err != nil {
			http.Error(w, "Failed to update community", http.StatusInternalServerError)
			return
		}

		c.ID = id
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(c)
	}
}

// DeleteCommunity deletes a community
func DeleteCommunity(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		idStr := chi.URLParam(r, "communityID")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "Invalid community ID", http.StatusBadRequest)
			return
		}

		_, err = db.Exec("DELETE FROM communities WHERE id=?", id)
		if err != nil {
			http.Error(w, "Failed to delete community", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusNoContent) // 204
	}
}
