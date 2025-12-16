// internal/models/community.go
package models

import "time"

type Community struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Icon      string    `json:"icon,omitempty"`  // optional
	CreatedAt time.Time `json:"createdAt"`
}
