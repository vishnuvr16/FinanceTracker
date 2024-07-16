const express = require("express");
const authToken = require("../middlewares/authToken");
const transactionController = require("../controllers/transactionCtrl");

const transactionRouter = express.Router();

transactionRouter.post("/create", authToken, transactionController.create);

transactionRouter.get(
  "/lists",
  authToken,
  transactionController.getFilteredTransactions
);

transactionRouter.put("/update/:id", authToken, transactionController.update);

transactionRouter.delete(
  "/delete/:id",
  authToken,
  transactionController.delete
);

module.exports = transactionRouter;
