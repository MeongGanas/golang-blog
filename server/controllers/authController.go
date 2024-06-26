package controllers

import (
	"time"

	"gihtub.com/MeongGanas/golang-blog/database"
	"gihtub.com/MeongGanas/golang-blog/models"
	"gihtub.com/MeongGanas/golang-blog/utils"
	"github.com/dgrijalva/jwt-go/v4"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

const SecretKey = "secret"

func Register(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	if data["name"] == "" || data["password"] == "" || data["username"] == "" || data["email"] == "" {
		return c.Status(400).JSON(fiber.Map{"msg": "A field is missing!"})
	}

	var existingUser models.User

	result := database.DB.Where("email = ?", data["email"]).First(&existingUser)
	if result.RowsAffected > 0 {
		return c.Status(400).JSON(fiber.Map{"msg": "User already taken!"})
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	user := models.User{
		Id:       uuid.New(),
		Name:     data["name"],
		Username: data["username"],
		Email:    data["email"],
		Password: password,
	}

	if err := database.DB.Create(&user).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"msg": "Failed to create user", "error": err.Error()})
	}

	return c.Status(200).JSON(user)
}

func Login(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var user models.User

	database.DB.Where("email = ?", data["email"]).First(&user)

	result := database.DB.Where("email = ?", data["email"]).First(&user)
	if result.RowsAffected == 0 {
		return c.Status(400).JSON(fiber.Map{"msg": "User not found!"})
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		return c.Status(400).JSON(fiber.Map{"msg": "Incorrect email or password!"})
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    user.Id.String(),
		ExpiresAt: jwt.At(time.Now().Add(time.Hour * 24)),
	})

	token, err := claims.SignedString([]byte(SecretKey))

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"msg": "Could not login!"})
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.Status(200).JSON(fiber.Map{"msg": "Login success"})
}

func User(c *fiber.Ctx) error {
	user, err := utils.GetCurrentUser(c)

	if err != nil {
		return c.Status(404).JSON(fiber.Map{"msg": "Unauthorized!"})
	}

	return c.Status(200).JSON(user)
}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.Status(200).JSON(fiber.Map{"msg": "Logout success"})
}
