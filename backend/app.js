const express = require("express");
const userRouter = require("./routes/userRouter");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const errHandler = require("./middlewares/errorHandler");
const categoryRouter = require("./routes/categoryRouter");
const transactionController = require("./controllers/transactionCtrl");
const transactionRouter = require("./routes/transactionRouter");
const cors = require("cors");
require("dotenv").config();

const app = express();

// !connect to DB

connectDB().then(() => {
  console.log("DB connected");
});

// ! cors config
const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));

//   !Middlewares
app.use(express.json()); //? pass incoming json data

// !Routes
app.use("/api/v1/users", userRouter);

app.use("/api/v1/categories", categoryRouter);

app.use("/api/v1/transactions", transactionRouter);

app.use(errHandler);

// !start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// okzlOgfbPbNGcHvw
