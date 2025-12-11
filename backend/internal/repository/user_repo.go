package repository

import (
	"database/sql"
	"time"

	"github.com/shiverin/gotalk/backend/internal/models"
)

type UserRepo struct {
	DB *sql.DB
}

func NewUserRepo(db *sql.DB) *UserRepo {
	return &UserRepo{DB: db}
}

// Create user
func (r *UserRepo) CreateUser(req models.CreateUserRequest) (models.User, error) {
	user := models.User{
		Username:  req.Username,
		Email:     req.Email,
		CreatedAt: time.Now(),
	}

	query := `
	INSERT INTO users (username, email, created_at)
	VALUES (?, ?, ?)
	`
	res, err := r.DB.Exec(query, user.Username, user.Email, user.CreatedAt)
	if err != nil {
		return user, err
	}

	id, err := res.LastInsertId()
	if err != nil {
		return user, err
	}
	user.ID = int(id)

	return user, nil
}

// Fetch user by ID
func (r *UserRepo) GetUserByID(id int) (models.User, error) {
	var user models.User

	query := `
	SELECT id, username, email, created_at
	FROM users
	WHERE id = ?
	`

	row := r.DB.QueryRow(query, id)
	err := row.Scan(&user.ID, &user.Username, &user.Email, &user.CreatedAt)

	return user, err
}
