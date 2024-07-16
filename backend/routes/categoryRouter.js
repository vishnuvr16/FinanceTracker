const express = require("express");

const categoryController = require("../controllers/categoryCtrl");
const authToken = require("../middlewares/authToken");

const categoryRouter = express.Router();

categoryRouter.post("/create", authToken, categoryController.create);

categoryRouter.get("/lists", authToken, categoryController.lists);

categoryRouter.put("/update/:categoryId", authToken, categoryController.update);

categoryRouter.delete("/delete/:id", authToken, categoryController.delete);

module.exports = categoryRouter;
