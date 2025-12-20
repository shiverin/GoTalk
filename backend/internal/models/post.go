// internal/models/post.go
package models

import "time"

type Post struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	Content     string    `json:"content,omitempty"`
	Link        string    `json:"link,omitempty"`
	AuthorID    int       `json:"authorId"`
	CommunityID int       `json:"communityId"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
	Score       int       `json:"score,omitempty"`
	// Author        string `json:"author,omitempty"`       // username
	// CommunityName string `json:"communityName,omitempty"` // community name
}
