// internal/models/user.go
package models

import "time"

type User struct {
	ID        int       `json:"id"`
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	Password  string    `json:"-"`        // hide password in JSON
	CreatedAt time.Time `json:"createdAt"`
}
