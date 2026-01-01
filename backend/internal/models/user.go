package models

import (
    "database/sql"
    "time"
)

type User struct {
    ID        int            `json:"id"`
    Username  sql.NullString `json:"username"`
    Email     sql.NullString `json:"email"`
    Password  string         `json:"-"` // hidden
    CreatedAt time.Time      `json:"createdAt"`
}
