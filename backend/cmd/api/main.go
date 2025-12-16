package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"

	"github.com/shiverin/gotalk/backend/internal/database"
	"github.com/shiverin/gotalk/backend/internal/handlers"
	authMiddleware "github.com/shiverin/gotalk/backend/internal/middleware"
)

func main() {
	// 1. Open DB
	db := database.Open()
	defer db.Close()

	// 2. Create tables
	database.CreateTables(db)

	// 3. Router
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// 4. CORS
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// 5. Routes
	r.Route("/api", func(r chi.Router) {
		r.Post("/auth/register", handlers.Register)
		r.Post("/auth/login", handlers.Login)

		r.Group(func(r chi.Router) {
			r.Use(authMiddleware.RequireAuth)

			r.Post("/posts", handlers.CreatePost(db))
		})
	})

	// 6. Start server
	fmt.Println("Go API server starting on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
