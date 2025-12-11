package api

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"

	"github.com/shiverin/gotalk/backend/internal/models"
	"github.com/shiverin/gotalk/backend/internal/repo"
)

type UserHandler struct {
	Repo *repo.UserRepo
}

// Register routes
func (h *UserHandler) Routes(r chi.Router) {
	r.Post("/users", h.CreateUser)
	r.Get("/users/{id}", h.GetUserByID)
}

// POST /users
func (h *UserHandler) CreateUser(w http.ResponseWriter, r *http.Request) {
	var input models.CreateUserRequest

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "invalid JSON", http.StatusBadRequest)
		return
	}

	user, err := h.Repo.CreateUser(input)
	if err != nil {
		http.Error(w, "failed to create user", http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusCreated, user)
}

// GET /users/{id}
func (h *UserHandler) GetUserByID(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		http.Error(w, "invalid ID", http.StatusBadRequest)
		return
	}

	user, err := h.Repo.GetUserByID(id)
	if err != nil {
		http.Error(w, "user not found", http.StatusNotFound)
		return
	}

	writeJSON(w, http.StatusOK, user)
}

func writeJSON(w http.ResponseWriter, status int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}
