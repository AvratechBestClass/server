const express = require('express');

// /api/users
var userRoutes = express.Router();
userRoutes.post("/create", function(req, res) {});
userRoutes.put("/:_id", function(req, res) {});
userRoutes.delete("/:_id", function(req, res) {});
userRoutes.get("/:_id", function(req, res) {});

module.exports = userRoutes;