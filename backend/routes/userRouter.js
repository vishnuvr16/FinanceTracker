const express = require("express");
const authToken = require("../middlewares/authToken");
const usersController = require("../controllers/userCtrl");
const userRouter = express.Router();

userRouter.post("/register", usersController.register);

userRouter.post("/login", usersController.login);

userRouter.get("/profile", authToken, usersController.profile);

userRouter.put(
  "/update-password",
  authToken,
  usersController.changeUserPassword
);

userRouter.put("/update-profile", authToken, usersController.updateUserProfile);

module.exports = userRouter;
