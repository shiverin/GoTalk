package database

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func Open() *sql.DB {
	// Use DB_PATH environment variable if set, otherwise use default
	dbPath := os.Getenv("DB_PATH")
	if dbPath == "" {
		dbPath = "./forum.db" // Default for local development
	}

	var err error
	DB, err = sql.Open("sqlite3", dbPath)
	if err != nil {
		log.Fatal(err)
	}
	return DB
}
