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
		//log.Println("JoinCommunity handler triggered")

		communityIDStr := chi.URLParam(r, "id")
		communityID, err := strconv.Atoi(communityIDStr)
		if err != nil {
			//log.Println("Invalid community ID:", err)
			http.Error(w, "Invalid community ID", http.StatusBadRequest)
			return
		}

		userID := auth.GetUserID(r)
		log.Printf("User %d joining community %d\n", userID, communityID)

		// Example: every user joins as "member"
		role := "member"

		tx, err := db.Begin()
		if err != nil {
			//log.Println("Failed to begin transaction:", err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}
		defer tx.Rollback()

		// Insert membership WITH role
		_, err = tx.Exec(`
            INSERT INTO community_members (user_id, community_id, role)
            VALUES (?, ?, ?)
            ON CONFLICT(user_id, community_id) DO NOTHING;
        `, userID, communityID, role)
		if err != nil {
			//log.Println("SQL Error inserting membership:", err)
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
			//log.Println("SQL Error updating member count:", err)
			http.Error(w, "Failed to update member count", http.StatusInternalServerError)
			return
		}

		if err := tx.Commit(); err != nil {
			//log.Println("Transaction commit failed:", err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		//log.Println("Join successful")
		json.NewEncoder(w).Encode(map[string]string{"status": "joined"})
	}
}

// ---- LEAVE COMMUNITY ----
func LeaveCommunity(db *sql.DB) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        communityIDStr := chi.URLParam(r, "id")
        communityID, err := strconv.Atoi(communityIDStr)
        if err != nil {
            http.Error(w, "Invalid community ID", http.StatusBadRequest)
            return
        }

        userID := auth.GetUserID(r)

        tx, err := db.Begin()
        if err != nil {
            http.Error(w, "Internal server error", http.StatusInternalServerError)
            return
        }
        defer tx.Rollback()

        // --- CHECK IF USER IS OWNER ---
        var role string
        err = tx.QueryRow(`
            SELECT role FROM community_members
            WHERE user_id = ? AND community_id = ?
        `, userID, communityID).Scan(&role)

        if err == sql.ErrNoRows {
            w.WriteHeader(http.StatusForbidden)
            json.NewEncoder(w).Encode(map[string]string{
                "error": "You are not a member of this community",
            })
            return
        }

        if err != nil {
            w.WriteHeader(http.StatusInternalServerError)
            json.NewEncoder(w).Encode(map[string]string{
                "error": "Failed to check member role",
            })
            return
        }

        if role == "owner" {
            w.WriteHeader(http.StatusForbidden)
            json.NewEncoder(w).Encode(map[string]string{
                "error": "Community owners cannot leave their own community",
            })
            return
        }

        // --- DELETE MEMBERSHIP ---
        _, err = tx.Exec(`
            DELETE FROM community_members
            WHERE user_id = ? AND community_id = ?
        `, userID, communityID)
        if err != nil {
            http.Error(w, "Failed to leave community", http.StatusInternalServerError)
            return
        }

        // --- UPDATE MEMBER COUNT ---
        _, err = tx.Exec(`
            UPDATE communities
            SET members = members - 1
            WHERE id = ? AND members > 0
        `, communityID)
        if err != nil {
            http.Error(w, "Failed to update member count", http.StatusInternalServerError)
            return
        }

        if err := tx.Commit(); err != nil {
            http.Error(w, "Internal server error", http.StatusInternalServerError)
            return
        }

        json.NewEncoder(w).Encode(map[string]string{"status": "left"})
    }
}


// ---- CHECK MEMBERSHIP ----
func CheckMembership(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		//log.Println("CheckMembership handler triggered")

		communityIDStr := chi.URLParam(r, "id")
		communityID, err := strconv.Atoi(communityIDStr)
		if err != nil {
			//log.Println("Invalid community ID:", err)
			http.Error(w, "Invalid community ID", http.StatusBadRequest)
			return
		}

		userID := auth.GetUserID(r)
		//log.Printf("Checking membership: user=%d community=%d\n", userID, communityID)

		var exists int
		err = db.QueryRow(`
			SELECT 1 FROM community_members
			WHERE user_id = ? AND community_id = ?
		`, userID, communityID).Scan(&exists)

		if err != nil && err != sql.ErrNoRows {
			//log.Println("SQL Error:", err)
			http.Error(w, "Failed to check membership", http.StatusInternalServerError)
			return
		}

		//log.Println("Joined =", exists == 1)
		json.NewEncoder(w).Encode(map[string]bool{
			"joined": exists == 1,
		})
	}
}
