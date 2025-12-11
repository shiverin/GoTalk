// backend/cmd/web/main.go
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

	"github.com/shiverin/gotalk/backend/internal/api"
	"github.com/shiverin/gotalk/backend/internal/repo"
)

// A simple struct for our example response
type Post struct {
	ID        int       `json:"id"`
	Title     string    `json:"title"`
	CreatedAt time.Time `json:"createdAt"`
}

func main() {

	// connect to SQLite
	db, err := sql.Open("sqlite3", "./test.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// create tables if not exist
	createTables(db)

	userRepo := repo.NewUserRepo(db)
	userHandler := &api.UserHandler{Repo: userRepo}

	r := chi.NewRouter()
	userHandler.Routes(r)

	// --- Middleware Setup ---
	// A good base middleware stack
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// Basic CORS setup for development
	// This allows your React app (running on localhost:5173) to make requests
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"}, // IMPORTANT: Use your Vite dev server's port
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any major browsers
	}))

	// --- API Routes ---
	r.Route("/api", func(r chi.Router) {
		r.Get("/posts", func(w http.ResponseWriter, r *http.Request) {
			// Create some dummy data for now
			posts := []Post{
				{ID: 1, Title: "web forum for gooning", CreatedAt: time.Now()},
				{ID: 2, Title: "time to goon", CreatedAt: time.Now()},
			}

			fmt.Println("API Endpoint /api/posts was hit!")

			// Set header and encode the response
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(posts)
		})
	})

	fmt.Println("Go API server starting on http://localhost:8080")
	http.ListenAndServe(":8080", r)

}

// Create tables on startup (for testing)
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
