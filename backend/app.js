const express = require("express");
const app = express();
const morgan = require("morgan");
const connectDB = require('./config/db');
const expressValidator = require('express-validator');
var cookieParser = require("cookie-parser");

//body parser
app.use(express.json());

//get routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user")

//middleware
app.use(morgan("dev"));
app.use(expressValidator());
app.use(cookieParser());
app.use("/",postRoutes);
app.use("/",authRoutes);
app.use("/",userRoutes);

//express-jwt authorizer response
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error: "Unauthorized"});
    }
  });

//import mongoose
const db = connectDB();


const port = 8080;
app.listen( port, ()=> console.log(`Server running on port: ${port}`));