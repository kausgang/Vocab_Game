var express = require("express");
var router = express.Router();

var fs = require("fs");
const path = require("path");

const directoryPath = path.join("./public", "DATABASE");
var lists = [],
  list_example = [];

fs.exists(directoryPath, function (exists) {
  if (exists) {
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }
      files.forEach(function (file) {
        if (file.slice(file.length - 12, file.length - 5) != "example")
          // Extract only the file name
          lists.push(file.slice(0, -5));
        else list_example.push(file.slice(0, -5));
      });
    });
  } else {
    console.log("creating folder");
    fs.mkdir(directoryPath, function (err) {
      if (err) console.log(err);
    });
  }
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Express",
    lists: lists,
    list_example: list_example,
  });
});

module.exports = router;
