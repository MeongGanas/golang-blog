package utils

import (
	"gihtub.com/MeongGanas/golang-blog/database"
	"gihtub.com/MeongGanas/golang-blog/models"
	"github.com/dgrijalva/jwt-go/v4"
	"github.com/gofiber/fiber/v2"
)

const SecretKey = "secret"

func GetCurrentUser(c *fiber.Ctx) (*models.User, error) {
	cookie := c.Cookies("jwt")

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		return nil, err
	}

	claims := token.Claims.(*jwt.StandardClaims)

	var user models.User
	result := database.DB.Where("id = ?", claims.Issuer).First(&user)

	if result.Error != nil {
		return nil, result.Error
	}

	return &user, nil
}
