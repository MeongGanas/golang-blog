package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	Id        uuid.UUID `json:"id"`
	Name      string    `json:"name"`
	Username  string    `json:"username" gorm:"unique"`
	Email     string    `json:"email" gorm:"unique"`
	Password  []byte    `json:"-"`
	CreatedAt time.Time `json:"created_at" gorm:"default:CURRENT_TIMESTAMP()"`
}
