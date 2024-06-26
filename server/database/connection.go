package database

import (
	"gihtub.com/MeongGanas/golang-blog/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	connection, err := gorm.Open(mysql.Open("root:@/golang_discussion?parseTime=true"), &gorm.Config{})

	if err != nil {
		panic(err)
	}

	DB = connection

	connection.AutoMigrate(&models.User{}, &models.Discussion{})
}
