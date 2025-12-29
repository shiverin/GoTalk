package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/shiverin/gotalk/backend/internal/models"
)

// ---- GET TOP N COMMUNITIES ----
func GetTopCommunities(db *sql.DB, limit int) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		query := `
			SELECT id, name, icon, description, rules, created_at, members, posts_count, is_private
			FROM communities
			ORDER BY members DESC
			LIMIT ?
		`
		rows, err := db.Query(query, limit)
		if err != nil {
			log.Println("DB query error:", err)
			http.Error(w, "Failed to fetch top communities", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var communities []models.Community
		for rows.Next() {
			var c models.Community
			var createdStr string
			var icon, description, rules sql.NullString

			err := rows.Scan(
				&c.ID,
				&c.Name,
				&icon,
				&description,
				&rules,
				&createdStr,
				&c.Members,
				&c.PostsCount,
				&c.IsPrivate,
			)
			if err != nil {
				log.Println("Scan error, skipping row:", err)
				continue
			}

			c.Icon = icon.String
			c.Description = description.String
			c.Rules = rules.String

			c.CreatedAt, err = time.Parse("2006-01-02 15:04:05", createdStr)
			if err != nil {
				log.Println("Time parse error for created_at:", createdStr, "error:", err)
				c.CreatedAt = time.Now()
			}

			communities = append(communities, c)
		}

		if err := rows.Err(); err != nil {
			log.Println("Rows iteration error:", err)
		}

		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(communities); err != nil {
			log.Println("JSON encode error:", err)
		}
	}
}

// ---- GET ALL COMMUNITIES ----
func GetAllCommunities(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		query := `
			SELECT id, name, icon, description, rules, created_at, members, posts_count, is_private
			FROM communities
			ORDER BY name ASC
		`
		rows, err := db.Query(query)
		if err != nil {
			log.Println("DB query error:", err)
			http.Error(w, "Failed to fetch communities", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var communities []models.Community
		for rows.Next() {
			var c models.Community
			var createdStr string
			var icon, description, rules sql.NullString

			err := rows.Scan(
				&c.ID,
				&c.Name,
				&icon,
				&description,
				&rules,
				&createdStr,
				&c.Members,
				&c.PostsCount,
				&c.IsPrivate,
			)
			if err != nil {
				log.Println("Scan error, skipping row:", err)
				continue
			}

			c.Icon = icon.String
			c.Description = description.String
			c.Rules = rules.String

			c.CreatedAt, err = time.Parse("2006-01-02 15:04:05", createdStr)
			if err != nil {
				log.Println("Time parse error for created_at:", createdStr, "error:", err)
				c.CreatedAt = time.Now()
			}

			communities = append(communities, c)
		}

		if err := rows.Err(); err != nil {
			log.Println("Rows iteration error:", err)
		}

		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(communities); err != nil {
			log.Println("JSON encode error:", err)
		}
	}
}

// ---- GET COMMUNITY BY ID ----
func GetCommunityByID(db *sql.DB, id int) (models.Community, error) {
	var c models.Community
	var createdStr string
	var icon, description, rules sql.NullString

	query := `
		SELECT id, name, icon, description, rules, created_at, members, posts_count, is_private
		FROM communities
		WHERE id = ?
	`

	err := db.QueryRow(query, id).Scan(
		&c.ID,
		&c.Name,
		&icon,
		&description,
		&rules,
		&createdStr,
		&c.Members,
		&c.PostsCount,
		&c.IsPrivate,
	)
	if err != nil {
		return c, err
	}

	c.Icon = icon.String
	c.Description = description.String
	c.Rules = rules.String

	c.CreatedAt, _ = time.Parse("2006-01-02 15:04:05", createdStr)

	return c, nil
}
