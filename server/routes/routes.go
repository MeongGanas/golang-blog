package routes

import (
	"gihtub.com/MeongGanas/golang-blog/controllers"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Get("/api/discussion", controllers.GetAllDisucssion)
	app.Get("/api/discussion/:id/detail", controllers.GetDiscussionById)
	app.Get("/api/discussion/:userId", controllers.GetDiscussionByUserId)
	app.Post("/api/discussion", controllers.CreateDiscussion)
	app.Patch("/api/discussion/:id", controllers.EditDiscussion)
	app.Delete("/api/discussion/:id", controllers.DeleteDiscussion)

	app.Get("/api/user/:userId", controllers.GetUserData)

	app.Post("/auth/register", controllers.Register)
	app.Post("/auth/login", controllers.Login)
	app.Get("/auth/user", controllers.User)
	app.Post("/auth/logout", controllers.Logout)
}
