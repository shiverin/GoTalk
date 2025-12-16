package database
// internal/database/setup.go  
import (
	"database/sql"
	"log"
)

// internal/database/setup.go  
func CreateTables(db *sql.DB) {  
	userTable := `  
	CREATE TABLE IF NOT EXISTS users (  
		id INTEGER PRIMARY KEY AUTOINCREMENT,  
		username TEXT UNIQUE NOT NULL,  
		email TEXT UNIQUE NOT NULL,  
		password TEXT NOT NULL,  
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP  
	);`  
  
	communityTable := `  
	CREATE TABLE IF NOT EXISTS communities (  
		id INTEGER PRIMARY KEY AUTOINCREMENT,  
		name TEXT UNIQUE NOT NULL,  
		icon TEXT,  
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP  
	);`  
  
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
		FOREIGN KEY (author_id) REFERENCES users (id),  
		FOREIGN KEY (community_id) REFERENCES communities (id)  
	);`  
  
	commentTable := `  
	CREATE TABLE IF NOT EXISTS comments (  
		id INTEGER PRIMARY KEY AUTOINCREMENT,  
		content TEXT NOT NULL,  
		author_id INTEGER NOT NULL,  
		post_id INTEGER NOT NULL,  
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,  
		FOREIGN KEY (author_id) REFERENCES users (id),  
		FOREIGN KEY (post_id) REFERENCES posts (id)  
	);`  
   
	voteTable := `  
	CREATE TABLE IF NOT EXISTS votes (  
		user_id INTEGER NOT NULL,  
		post_id INTEGER NOT NULL,  
		value INTEGER NOT NULL, -- 1 for upvote, -1 for downvote  
		PRIMARY KEY (user_id, post_id),  
		FOREIGN KEY (user_id) REFERENCES users (id),  
		FOREIGN KEY (post_id) REFERENCES posts (id)  
	);`  
    
	queries := []string{userTable, communityTable, postTable, commentTable, voteTable}  
	for _, query := range queries {  
		_, err := db.Exec(query)  
		if err != nil {  
			log.Fatalf("Could not create table: %v", err)  
		}  
	}  
	log.Println("Database tables already exist.")  
}