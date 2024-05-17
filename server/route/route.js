const express = require("express");
const authController = require("../controller/authController");
const AuthMiddleware = require("../middleware/authMiddleware");
const userController = require("../controller/userController");
route = express.Router();

route.post("/auth/login", authController.loginUser);
route.post("/auth/register", authController.registerUser);

/**
 *
 *
 * PROTECTED ROUTES
 */

route.get("/profile", AuthMiddleware.verifyToken, userController.getUser);

module.exports = route;
