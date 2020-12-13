var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var usersRouter = require("./routes/users");
var questionRouter = require("./routes/questions");
let { authorize } = require("./utils/auth");
const { v4: uuidv4 } = require('uuid');

var app = express();


console.log(uuidv4());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", usersRouter);

app.use("/api/questions", authorize, questionRouter);


module.exports = app;
