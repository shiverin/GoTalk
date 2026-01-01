package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

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
		// Auth routes
		r.Post("/auth/register", handlers.Register)
		r.Post("/auth/login", handlers.Login)

		// Communities
		r.Get("/communities/top/{limit}", func(w http.ResponseWriter, r *http.Request) {
			limitStr := chi.URLParam(r, "limit")
			limit, err := strconv.Atoi(limitStr)
			if err != nil || limit <= 0 {
				limit = 20 // default
			}
			handlers.GetTopCommunities(db, limit)(w, r)
		})
		r.Get("/communities", handlers.GetAllCommunities(db)) // Get all communities
		// ---- GET COMMUNITY BY ID ----
		r.Get("/communities/{communityID}", func(w http.ResponseWriter, r *http.Request) {
			idStr := chi.URLParam(r, "communityID")
			id, err := strconv.Atoi(idStr)
			if err != nil {
				http.Error(w, "Invalid community ID", http.StatusBadRequest)
				return
			}

			community, err := handlers.GetCommunityByID(db, id) // your function that returns (Community, error)
			if err != nil {
				if err == sql.ErrNoRows {
					http.Error(w, "Community not found", http.StatusNotFound)
					return
				}
				http.Error(w, "Failed to fetch community", http.StatusInternalServerError)
				return
			}

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(community)
		})

		// Posts
		r.Get("/posts", handlers.GetPosts(db))         // Get all posts
		r.Get("/posts/{postID}", handlers.GetPost(db)) // Get single post

		r.Get("/communities/{communityID}/posts", handlers.GetPostsByCommunity(db))

		// Auth-protected routes
		r.Group(func(r chi.Router) {
			r.Use(authMiddleware.RequireAuth)

			// ---- Membership APIs ----
			r.Post("/communities/{id}/join", handlers.JoinCommunity(db))
			r.Post("/communities/{id}/leave", handlers.LeaveCommunity(db))
			r.Get("/communities/{id}/joined", handlers.CheckMembership(db))

			// Posts
			r.Post("/posts", handlers.CreatePost(db))
			r.Put("/posts/{postID}", handlers.UpdatePost(db))
			r.Delete("/posts/{postID}", handlers.DeletePost(db))

			/// Comments
			r.Post("/posts/{postID}/comments", handlers.CreateComment(db))
			r.Get("/posts/{postID}/comments", handlers.GetComments(db))
			r.Route("/comments/{commentID}", func(r chi.Router) {
				r.Patch("/", handlers.UpdateComment(db))
				r.Delete("/", handlers.DeleteComment(db))
			})
			
		})
		// Users
		r.Route("/users", func(r chi.Router) {
			r.Get("/{userID}", handlers.GetUserByID(db))

		})
	})

	// 6. Start server
	fmt.Println("Go API server starting on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
