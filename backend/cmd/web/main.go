package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	_ "github.com/mattn/go-sqlite3"
)

type Post struct {
	ID            int       `json:"id"`
	Title         string    `json:"title"`
	Subreddit     Subreddit `json:"subreddit"`
	Author        string    `json:"author"`
	CreatedAt     time.Time `json:"createdAt"`
	TimeAgo       string    `json:"timeAgo"` // optional, calculated in backend
	Score         int       `json:"score"`
	CommentsCount int       `json:"commentsCount"`
	Link          string    `json:"link"`
}

type Subreddit struct {
	Name string `json:"name"`
	Icon string `json:"icon"`
}

func main() {
	db, err := sql.Open("sqlite3", "./test.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	createTables(db)

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	r.Route("/api", func(r chi.Router) {
		r.Get("/posts", func(w http.ResponseWriter, r *http.Request) {
			posts := []Post{
				{
					ID:    1,
					Title: "Test1?",
					Subreddit: Subreddit{
						Name: "r/AskReddit",
						Icon: "https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_p6kb2m6b185b1.png",
					},
					Author:        "No-Macaron-9527",
					CreatedAt:     time.Now().Add(-9 * time.Hour),
					TimeAgo:       "9h ago",
					Score:         2039,
					CommentsCount: 2545,
					Link:          "https://www.reddit.com/r/AskReddit/comments/1ple5oj/when_was_the_moment_you_realised_that_the_person/",
				},
				{
					ID:    2,
					Title: "Test2?",
					Subreddit: Subreddit{
						Name: "r/Food",
						Icon: "https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_p6kb2m6b185b1.png",
					},
					Author:        "FoodLover99",
					CreatedAt:     time.Now().Add(-2 * 24 * time.Hour),
					TimeAgo:       "2d ago",
					Score:         512,
					CommentsCount: 89,
					Link:          "https://www.reddit.com/r/Food/comments/example/",
				},
			}

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(posts)
		})
	})

	fmt.Println("Go API server starting on http://localhost:8080")
	http.ListenAndServe(":8080", r)
}

func createTables(db *sql.DB) {
	query := `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        email TEXT,
        created_at TEXT
    );
    `
	_, err := db.Exec(query)
	if err != nil {
		log.Fatal(err)
	}
}
