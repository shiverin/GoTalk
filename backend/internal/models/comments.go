// internal/models/comment.go
package models

import "time"

type Comment struct {
	ID        int       `json:"id"`
	Content   string    `json:"content"`
	AuthorID  int       `json:"authorId"`
	PostID    int       `json:"postId"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
