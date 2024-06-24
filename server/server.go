package main

import (
	"log"
	"os"

	"gihtub.com/MeongGanas/golang-blog/database"
	"gihtub.com/MeongGanas/golang-blog/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	database.Connect()

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "4000"
	}

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000",
		AllowCredentials: true,
	}))

	routes.Setup(app)

	log.Fatal(app.Listen(":" + PORT))
}
