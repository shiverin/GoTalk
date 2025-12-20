package database

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func Open() *sql.DB {
	var err error
	DB, err = sql.Open("sqlite3", "/Users/shizhen/Documents/vscode/cvwoAssignment/GoTalk/backend/cmd/api/forum.db")
	if err != nil {
		log.Fatal(err)
	}
	return DB
}

///Users/shizhen/Documents/vscode/cvwoAssignment/GoTalk/backend/internal/database/database.go