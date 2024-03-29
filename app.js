var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// const bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var get_words = require("./routes/get_words");
var create_list = require("./routes/create_list");
var edit_list = require("./routes/edit_list");
var update_list = require("./routes/update_list");
var game_1 = require("./routes/game_1");
var game_2 = require("./routes/game_2");
var game_2_extra = require("./routes/game_2_extra");
var study = require("./routes/study");
var save_result = require("./routes/save_result");
var report = require("./routes/report");
var archive_db = require("./routes/archive_db");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Here we are configuring express to use body-parser as middle-ware.
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/get_words", get_words);
app.use("/create_list", create_list);
app.use("/edit_list", edit_list);
app.use("/update_list", update_list);
app.use("/game_1", game_1);
app.use("/game_2", game_2);
app.use("/game_2_extra", game_2_extra);
app.use("/study", study);
app.use("/save_result", save_result);
app.use("/report", report);
app.use("/archive_db", archive_db);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
