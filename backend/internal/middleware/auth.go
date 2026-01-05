package middleware

import (
    "context"
    "net/http"

    "github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte("dev-secret-change-later")

type contextKey string

const userIDKey contextKey = "userID"

func RequireAuth(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

        // 1. Read JWT from HttpOnly cookie
        cookie, err := r.Cookie("access_token")
        if err != nil {
            http.Error(w, "Unauthorized: no session", http.StatusUnauthorized)
            return
        }

        tokenStr := cookie.Value

        // 2. Parse and verify JWT
        token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
            return jwtSecret, nil
        })

        if err != nil || !token.Valid {
            http.Error(w, "Unauthorized: invalid token", http.StatusUnauthorized)
            return
        }

        // 3. Extract user_id from token claims
        claims := token.Claims.(jwt.MapClaims)
        userID := int(claims["user_id"].(float64))

        // 4. Save userID in context
        ctx := context.WithValue(r.Context(), userIDKey, userID)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}

// Helper to retrieve user ID
func GetUserID(r *http.Request) int {
    id, _ := r.Context().Value(userIDKey).(int)
    return id
}
