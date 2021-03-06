const express = require('express');
const userController = require('../controllers/userController.js')

// /api/users
var userRoutes = express.Router();
userRoutes.post("/create", userController.create);
userRoutes.put("/:_id", userController.updateUser);
userRoutes.delete("/:_id", userController.deleteUser);
userRoutes.get("/getAll", userController.getAll);
userRoutes.get("/:_id", userController.getUser);

module.exports = userRoutes;