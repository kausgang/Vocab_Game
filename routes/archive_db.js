var express = require("express");
var router = express.Router();

var fs = require("fs");
var path = require("path");

router.get("/", function (req, res, next) {
  const directoryPath = path.join("./public", "DATABASE");
  const archivePath = path.join("./public", "ARCHIVE");
  //   create archive path is it doesn't exist
  if (!fs.existsSync(archivePath)) {
    fs.mkdirSync(archivePath);
  }

  if (fs.existsSync(directoryPath)) {
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }

      //   datestamp = new Date().toJSON().slice(0, 10);
      files.forEach(function (file) {
        // move all database files in archive folder
        fs.rename(
          path.join(directoryPath, file),
          //   path.join(archivePath, file + "_" + datestamp),
          path.join(archivePath, file),
          function (err) {
            if (err) throw err;
            console.log("Successfully renamed - AKA moved!", file);
          }
        );
      });
    });
  }

  res.render("archive_db", { msg: "DATABASE ARCHIVED" });
});

module.exports = router;
