package controllers

import (
	"time"

	"gihtub.com/MeongGanas/golang-blog/database"
	"gihtub.com/MeongGanas/golang-blog/models"
	"gihtub.com/MeongGanas/golang-blog/utils"
	"github.com/gofiber/fiber/v2"
)

func GetAllDisucssion(c *fiber.Ctx) error {
	var discussions []models.Discussion

	database.DB.Find(&discussions)

	return c.Status(200).JSON(discussions)
}

func CreateDiscussion(c *fiber.Ctx) error {
	discussion := new(models.Discussion)

	if err := c.BodyParser(&discussion); err != nil {
		return err
	}

	if discussion.Title == "" || discussion.Body == "" {
		return c.Status(400).JSON(fiber.Map{"msg": "All field is require"})
	}

	user, err := utils.GetCurrentUser(c)

	if err != nil {
		return c.Status(404).JSON(fiber.Map{"msg": "Unauthorized!"})
	}

	discussion.UserId = user.Id

	if err := database.DB.Create(&discussion).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"msg": "Failed to create discussion", "error": err.Error()})
	}

	return c.Status(200).JSON(discussion)
}

func EditDiscussion(c *fiber.Ctx) error {
	discussionId := c.Params("id")

	user, err := utils.GetCurrentUser(c)

	if err != nil {
		return c.Status(404).JSON(fiber.Map{"msg": "Unauthorized!"})
	}

	var existingDiscussion models.Discussion

	if err := database.DB.Where("id = ?", discussionId).Where("user_id = ?", user.Id).First(&existingDiscussion).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"msg": "Discussion not found"})
	}

	updatedDiscussion := new(models.Discussion)
	if err := c.BodyParser(&updatedDiscussion); err != nil {
		return c.Status(400).JSON(fiber.Map{"msg": "Failed to parse request body"})
	}

	if updatedDiscussion.Title == "" || updatedDiscussion.Body == "" {
		return c.Status(400).JSON(fiber.Map{"msg": "All fields are required"})
	}

	existingDiscussion.Title = updatedDiscussion.Title
	existingDiscussion.Body = updatedDiscussion.Body
	existingDiscussion.UpdatedAt = time.Now()

	if err := database.DB.Save(&existingDiscussion).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"msg": "Failed to update discussion"})
	}

	return c.Status(200).JSON(fiber.Map{"msg": "Edit discussion success!"})
}

func DeleteDiscussion(c *fiber.Ctx) error {
	discussionId := c.Params("id")

	user, err := utils.GetCurrentUser(c)

	if err != nil {
		return c.Status(404).JSON(fiber.Map{"msg": "Unauthorized!"})
	}

	var discussion models.Discussion

	if err := database.DB.Where("id = ?", discussionId).Where("user_id = ?", user.Id).First(&discussion).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"msg": "Discussion not found"})
	}

	if err := database.DB.Delete(&discussion).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"msg": "Failed to delete discussion", "error": err.Error()})
	}

	return c.Status(400).JSON(fiber.Map{"msg": "Delete discussion success!"})
}
