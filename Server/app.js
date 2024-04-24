//Import Library
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const publisherRoute = require("./routes/publisher");
const userRoute = require("./routes/user");
const orderRoute = require("./routes/order");
const storeRoute = require("./routes/store");

const ApiError = require("./routes/api-error");
require("dotenv").config();

const app = express();

//Connect to the database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Kết nối Database MongoDB thành công !");
  })
  .catch((err) => {
    console.log(err);
  });

//Middleware
app.use(cors());
app.use(express.json());

//Router
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/publisher", publisherRoute);
app.use("/api/user", userRoute);
app.use("/api/order", orderRoute);
app.use("/api/store", storeRoute)

//handle 404 response
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});

//Run Server
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});
