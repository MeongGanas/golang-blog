package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	Id          uuid.UUID    `json:"id" gorm:"type:char(36);primaryKey"`
	Name        string       `json:"name"`
	Username    string       `json:"username" gorm:"unique"`
	Email       string       `json:"email" gorm:"unique"`
	Password    []byte       `json:"-"`
	CreatedAt   time.Time    `json:"created_at" gorm:"default:CURRENT_TIMESTAMP()"`
	Discussions []Discussion `json:"discussions" gorm:"foreignKey:UserId;references:Id"`
}
