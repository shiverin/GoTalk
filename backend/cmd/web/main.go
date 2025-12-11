// backend/cmd/web/main.go  
package main  

import (  
	"encoding/json"  
	"fmt"  
	"net/http"  
	"time"  

	"github.com/go-chi/chi/v5"  
	"github.com/go-chi/chi/v5/middleware"  
	"github.com/go-chi/cors"  
)  

// A simple struct for our example response  
type Post struct {  
	ID        int       `json:"id"`  
	Title     string    `json:"title"`  
	CreatedAt time.Time `json:"createdAt"`  
}  

func main() {  
	r := chi.NewRouter()  

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
				{ID: 1, Title: "Success! Go is talking to React!", CreatedAt: time.Now()},  
				{ID: 2, Title: "This is a post from your Go API.", CreatedAt: time.Now()},  
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