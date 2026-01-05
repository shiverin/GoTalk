package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"time"

	"github.com/shiverin/gotalk/backend/internal/database"
	"github.com/shiverin/gotalk/backend/internal/middleware"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var jwtSecret = []byte("dev-secret-change-later")

// ---------- REQUEST STRUCTS ----------

type RegisterRequest struct {
	Username string `json:"username"`
	// Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// ---------- REGISTER ----------

func Register(w http.ResponseWriter, r *http.Request) {
	var req RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	// Hash password
	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), 12)
	if err != nil {
		http.Error(w, "Failed to hash password", 500)
		return
	}

	_, err = database.DB.Exec(`
		INSERT INTO users (username, password)
		VALUES (?, ?)
	`, req.Username, string(hash))

	if err != nil {
		http.Error(w, "Username already exists", 400)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "User registered successfully",
	})
}

// ---------- LOGIN ----------

func Login(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	var (
		userID       int
		password string
	)

	err := database.DB.QueryRow(`
		SELECT id, password FROM users WHERE username = ?
	`, req.Username).Scan(&userID, &password)

	if err == sql.ErrNoRows {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	if bcrypt.CompareHashAndPassword([]byte(password), []byte(req.Password)) != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	// Create JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
	})

	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		http.Error(w, "Failed to create token", 500)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "access_token",
		Value:    tokenString,
		HttpOnly: true,
		Path:     "/",
		MaxAge:   86400 * 7, // 7 days
		Secure:   false,      // SET TRUE in production (https)
		SameSite: http.SameSiteLaxMode,
	})
	json.NewEncoder(w).Encode(map[string]interface{}{
		"user": map[string]interface{}{
			"id":   userID,
			"username": req.Username,
		},
	})

}

func Me(w http.ResponseWriter, r *http.Request) {
    userID := middleware.GetUserID(r)
    if userID == 0 {
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }

    var username string
    database.DB.QueryRow(`SELECT username FROM users WHERE id = ?`, userID).Scan(&username)

    json.NewEncoder(w).Encode(map[string]interface{}{
        "user": map[string]interface{}{
            "id": userID,
            "username": username,
        },
    })
}


func RefreshToken(w http.ResponseWriter, r *http.Request) {
	var body map[string]string

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	oldToken := body["token"]
	if oldToken == "" {
		http.Error(w, "Token missing", http.StatusBadRequest)
		return
	}

	token, err := jwt.Parse(oldToken, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})

	if err != nil || !token.Valid {
		http.Error(w, "Invalid or expired token", http.StatusUnauthorized)
		return
	}

	claims := token.Claims.(jwt.MapClaims)
	userID := int(claims["user_id"].(float64))

	// Create NEW token with new-expiry
	newToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
	})

	newTokenString, err := newToken.SignedString(jwtSecret)
	if err != nil {
		http.Error(w, "Failed creating token", 500)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{
		"token": newTokenString,
	})
}

func Logout(w http.ResponseWriter, r *http.Request) {
    http.SetCookie(w, &http.Cookie{
        Name:     "access_token",
        Value:    "",
        Path:     "/",
        MaxAge:   -1, // delete cookie
        HttpOnly: true,
        Secure:   false,
        SameSite: http.SameSiteLaxMode,
    })

    json.NewEncoder(w).Encode(map[string]string{
        "message": "Logged out",
    })
}
