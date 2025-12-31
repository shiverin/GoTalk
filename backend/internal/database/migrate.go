package database

import (
	"database/sql"
	"log"
)

// CreateTables runs automatically at backend startup and ensures all tables exist.
func CreateTables(db *sql.DB) {

	// ---------------- USERS ----------------
	userTable := `
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username TEXT UNIQUE NOT NULL,
		email TEXT UNIQUE,
		password TEXT NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);`

	// ---------------- COMMUNITIES ----------------
	communityTable := `
	CREATE TABLE IF NOT EXISTS communities (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT UNIQUE NOT NULL,
		icon TEXT,
		description TEXT,
		rules TEXT,
		members INTEGER DEFAULT 0,
		posts_count INTEGER DEFAULT 0,
		is_private BOOLEAN DEFAULT 0,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);`

	// ---------------- POSTS ----------------
	postTable := `
	CREATE TABLE IF NOT EXISTS posts (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT NOT NULL,
		content TEXT,
		link TEXT,
		author_id INTEGER NOT NULL,
		community_id INTEGER NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (author_id) REFERENCES users(id),
		FOREIGN KEY (community_id) REFERENCES communities(id)
	);`

	// ---------------- COMMENTS ----------------
	commentTable := `
	CREATE TABLE IF NOT EXISTS comments (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		content TEXT NOT NULL,
		author_id INTEGER NOT NULL,
		post_id INTEGER NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (author_id) REFERENCES users(id),
		FOREIGN KEY (post_id) REFERENCES posts(id)
	);`

	// ---------------- VOTES ----------------
	voteTable := `
	CREATE TABLE IF NOT EXISTS votes (
		user_id INTEGER NOT NULL,
		post_id INTEGER NOT NULL,
		value INTEGER NOT NULL,
		PRIMARY KEY (user_id, post_id),
		FOREIGN KEY (user_id) REFERENCES users(id),
		FOREIGN KEY (post_id) REFERENCES posts(id)
	);`

	// ---------------- COMMUNITY MEMBERS ----------------
	memberTable := `
	CREATE TABLE IF NOT EXISTS community_members (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		community_id INTEGER NOT NULL,
		joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (user_id) REFERENCES users(id),
		FOREIGN KEY (community_id) REFERENCES communities(id),
		UNIQUE(user_id, community_id)
	);`

	// Run all queries
	queries := []string{
		userTable,
		communityTable,
		postTable,
		commentTable,
		voteTable,
		memberTable,
	}

	for _, q := range queries {
		_, err := db.Exec(q)
		if err != nil {
			log.Fatalf("Could not create table: %v\nQuery: %s", err, q)
		}
	}

	log.Println("Database initialized and all tables verified.")
}
