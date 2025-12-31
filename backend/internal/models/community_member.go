package models

import "time"

type CommunityMember struct {
	ID          int       `json:"id"`
	UserID      int       `json:"userId"`
	CommunityID int       `json:"communityId"`
	JoinedAt    time.Time `json:"joinedAt"`
}
