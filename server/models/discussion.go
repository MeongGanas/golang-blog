package models

import (
	"time"

	"github.com/google/uuid"
)

type Discussion struct {
	Id        uint      `json:"id"`
	UserId    uuid.UUID `json:"userId" gorm:"type:char(36);not null"`
	User      User      `json:"user" gorm:"foreignKey:UserId;references:Id"`
	Title     string    `json:"title"`
	Body      string    `json:"body"`
	CreatedAt time.Time `json:"created_at" gorm:"default:CURRENT_TIMESTAMP()"`
	UpdatedAt time.Time `json:"updated_at"  gorm:"default:CURRENT_TIMESTAMP()"`
}
