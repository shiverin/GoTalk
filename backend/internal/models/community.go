package models

import "time"

type Community struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	Icon        string    `json:"icon,omitempty"`      // optional, URL to community icon
	Description string    `json:"description,omitempty"` // optional description of the community
	CreatedAt   time.Time `json:"createdAt"`
	Members     int       `json:"members"`             // number of members
	PostsCount  int       `json:"postsCount"`          // optional: number of posts
	IsPrivate   bool      `json:"isPrivate"`           // optional: if community is private
	Rules       string    `json:"rules,omitempty"` // optional description of the community
}
