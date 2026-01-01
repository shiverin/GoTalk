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
