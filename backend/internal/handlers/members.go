package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	auth "github.com/shiverin/gotalk/backend/internal/middleware"
)

// ---- JOIN COMMUNITY ----
func JoinCommunity(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println("🔥 JoinCommunity handler triggered")

		communityIDStr := chi.URLParam(r, "id")
		communityID, err := strconv.Atoi(communityIDStr)
		if err != nil {
			log.Println("❌ Invalid community ID:", err)
			http.Error(w, "Invalid community ID", http.StatusBadRequest)
			return
		}

		userID := auth.GetUserID(r)
		log.Printf("👉 User %d joining community %d\n", userID, communityID)

		tx, err := db.Begin()
		if err != nil {
			log.Println("❌ Failed to begin transaction:", err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}
		defer tx.Rollback()

		// Insert membership
		_, err = tx.Exec(`
			INSERT INTO community_members (user_id, community_id)
			VALUES (?, ?)
			ON CONFLICT(user_id, community_id) DO NOTHING
		`, userID, communityID)
		if err != nil {
			log.Println("❌ SQL Error inserting membership:", err)
			http.Error(w, "Failed to join community", http.StatusInternalServerError)
			return
		}

		// Update member count
		_, err = tx.Exec(`
			UPDATE communities
			SET members = members + 1
			WHERE id = ?;
		`, communityID)
		if err != nil {
			log.Println("❌ SQL Error updating member count:", err)
			http.Error(w, "Failed to update member count", http.StatusInternalServerError)
			return
		}

		if err := tx.Commit(); err != nil {
			log.Println("❌ Transaction commit failed:", err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		log.Println("✅ Join successful")
		json.NewEncoder(w).Encode(map[string]string{"status": "joined"})
	}
}

// ---- LEAVE COMMUNITY ----
func LeaveCommunity(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println("🔥 LeaveCommunity handler triggered")

		communityIDStr := chi.URLParam(r, "id")
		communityID, err := strconv.Atoi(communityIDStr)
		if err != nil {
			log.Println("❌ Invalid community ID:", err)
			http.Error(w, "Invalid community ID", http.StatusBadRequest)
			return
		}

		userID := auth.GetUserID(r)
		log.Printf("👉 User %d leaving community %d\n", userID, communityID)

		tx, err := db.Begin()
		if err != nil {
			log.Println("❌ Failed to begin transaction:", err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}
		defer tx.Rollback()

		// Delete membership
		_, err = tx.Exec(`
			DELETE FROM community_members
			WHERE user_id = ? AND community_id = ?;
		`, userID, communityID)
		if err != nil {
			log.Println("❌ SQL Error deleting membership:", err)
			http.Error(w, "Failed to leave community", http.StatusInternalServerError)
			return
		}

		// Update member count
		_, err = tx.Exec(`
			UPDATE communities
			SET members = members - 1
			WHERE id = ? AND members > 0;
		`, communityID)
		if err != nil {
			log.Println("❌ SQL Error updating member count:", err)
			http.Error(w, "Failed to update member count", http.StatusInternalServerError)
			return
		}

		if err := tx.Commit(); err != nil {
			log.Println("❌ Transaction commit failed:", err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		log.Println("✅ Leave successful")
		json.NewEncoder(w).Encode(map[string]string{"status": "left"})
	}
}

// ---- CHECK MEMBERSHIP ----
func CheckMembership(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println("🔥 CheckMembership handler triggered")

		communityIDStr := chi.URLParam(r, "id")
		communityID, err := strconv.Atoi(communityIDStr)
		if err != nil {
			log.Println("❌ Invalid community ID:", err)
			http.Error(w, "Invalid community ID", http.StatusBadRequest)
			return
		}

		userID := auth.GetUserID(r)
		log.Printf("👉 Checking membership: user=%d community=%d\n", userID, communityID)

		var exists int
		err = db.QueryRow(`
			SELECT 1 FROM community_members
			WHERE user_id = ? AND community_id = ?
		`, userID, communityID).Scan(&exists)

		if err != nil && err != sql.ErrNoRows {
			log.Println("❌ SQL Error:", err)
			http.Error(w, "Failed to check membership", http.StatusInternalServerError)
			return
		}

		log.Println("🔎 Joined =", exists == 1)
		json.NewEncoder(w).Encode(map[string]bool{
			"joined": exists == 1,
		})
	}
}
