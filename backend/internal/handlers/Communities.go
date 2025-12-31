package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
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

// ---- GET POSTS BY COMMUNITY ----
func GetPostsByCommunity(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		communityIDStr := chi.URLParam(r, "communityID")
		communityID, err := strconv.Atoi(communityIDStr)
		if err != nil {
			log.Println("GetPostsByCommunity invalid communityID:", communityIDStr)
			http.Error(w, "Invalid community ID", http.StatusBadRequest)
			return
		}
		log.Println("GetPostsByCommunity called for communityID:", communityID)

		// Fetch posts for this community
		query := `
			SELECT 
				p.id, p.title, p.content, p.link, p.author_id, p.community_id,
				p.created_at, p.updated_at,
				COALESCE((SELECT SUM(value) FROM votes WHERE post_id = p.id), 0) as score,
				COALESCE((SELECT COUNT(*) FROM comments WHERE post_id = p.id), 0) as comments_count
			FROM posts p
			WHERE p.community_id = ?
			ORDER BY p.created_at DESC
		`

		rows, err := db.Query(query, communityID)
		if err != nil {
			log.Println("GetPostsByCommunity db.Query error:", err)
			http.Error(w, "Failed to fetch posts", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var posts []struct {
			Post      models.Post      `json:"post"`
			Author    string           `json:"author"`
			Community models.Community `json:"community"`
			Comments  []models.Comment `json:"comments"`
			Score     int              `json:"score"`
		}

		for rows.Next() {
			var p models.Post
			var authorID int
			var createdStr, updatedStr string
			var content, link sql.NullString
			var score, commentsCount sql.NullInt64

			if err := rows.Scan(
				&p.ID, &p.Title, &content, &link, &authorID, &p.CommunityID,
				&createdStr, &updatedStr, &score, &commentsCount,
			); err != nil {
				log.Println("GetPostsByCommunity rows.Scan error:", err)
				http.Error(w, "Failed to parse posts", http.StatusInternalServerError)
				return
			}

			if content.Valid {
				p.Content = content.String
			}
			if link.Valid {
				p.Link = link.String
			}

			p.CreatedAt, _ = time.Parse(time.RFC3339, createdStr)
			p.UpdatedAt, _ = time.Parse(time.RFC3339, updatedStr)
			if score.Valid {
				p.Score = int(score.Int64)
			}

			// Fetch author username
			var author string
			if err := db.QueryRow("SELECT username FROM users WHERE id = ?", authorID).Scan(&author); err != nil {
				author = "Unknown"
			}

			// Fetch community info
			community, err := GetCommunityByID(db, p.CommunityID)
			if err != nil {
				log.Println("GetPostsByCommunity GetCommunityByID error:", err)
				http.Error(w, "Failed to fetch community", http.StatusInternalServerError)
				return
			}

			// Fetch comments
			commentRows, err := db.Query(`
				SELECT id, content, author_id, post_id, created_at, updated_at
				FROM comments
				WHERE post_id = ?
				ORDER BY created_at ASC
			`, p.ID)
			if err != nil {
				log.Println("GetPostsByCommunity comment query error:", err)
				http.Error(w, "Failed to fetch comments", http.StatusInternalServerError)
				return
			}

			var postComments []models.Comment
			for commentRows.Next() {
				var c models.Comment
				var created, updated string
				if err := commentRows.Scan(&c.ID, &c.Content, &c.AuthorID, &c.PostID, &created, &updated); err != nil {
					continue
				}
				c.CreatedAt, _ = time.Parse(time.RFC3339, created)
				c.UpdatedAt, _ = time.Parse(time.RFC3339, updated)
				postComments = append(postComments, c)
			}
			commentRows.Close()

			posts = append(posts, struct {
				Post      models.Post      `json:"post"`
				Author    string           `json:"author"`
				Community models.Community `json:"community"`
				Comments  []models.Comment `json:"comments"`
				Score     int              `json:"score"`
			}{
				Post:      p,
				Author:    author,
				Community: community,
				Comments:  postComments,
				Score:     p.Score,
			})
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(posts)
	}
}
