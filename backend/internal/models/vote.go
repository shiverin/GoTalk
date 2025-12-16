// internal/models/vote.go
package models

type Vote struct {
	UserID int `json:"userId"`
	PostID int `json:"postId"`
	Value  int `json:"value"` // 1 for upvote, -1 for downvote
}
