const express = require("express");
const authController = require("../controller/authController");
route = express.Router();

route.post("/auth/login", authController.loginUser);
route.post("/auth/register", authController.registerUser);

module.exports = route;
