package models

import "time"

type CommunityMember struct {
    ID          int       `json:"id"`
    UserID      int       `json:"userId"`
    CommunityID int       `json:"communityId"`
    Role        string    `json:"role"`    // e.g., "member", "owner", "moderator"
    JoinedAt    time.Time `json:"joinedAt"`
}
