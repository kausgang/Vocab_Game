var express = require("express");
var router = express.Router();

var fs = require("fs");
var path = require("path");
var shuffle = require("shuffle-array");
// const { copy } = require('../app');

const directoryPath = path.join("./public", "DATABASE");
const archivePath = path.join("./public", "ARCHIVE");

/* GET users listing. */
router.get("/", function (req, res, next) {
  var file = req.query.list;

  var filename = path.join("./public/DATABASE/" + file + ".json");
  var content = fs.readFileSync(filename);
  var data = JSON.parse(content);
  // data now contains the definition and meaning of words from the list

  // seggregate words meaning and example array
  var words = data.words;
  // var meaning_1 = data.meaning;
  // var example = data.example

  var word_count = words.length;

  // remove duplicates
  unique_words = words.filter(function (elem, pos) {
    return words.indexOf(elem) == pos;
  });

  //delete the original list first
  // fs.unlinkSync(filename);

  // move the original list to archieve folder
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  let hh = today.getHours();
  let min = today.getMinutes();
  let ss = today.getSeconds();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  if (hh < 10) {
    hh = "0" + hh;
  }

  if (min < 10) {
    min = "0" + min;
  }
  if (ss < 10) {
    ss = "0" + ss;
  }
  today = dd + "-" + mm + "-" + yyyy + "-" + hh + "-" + min + "-" + ss;

  fs.rename(
    filename,
    path.join(archivePath, file + ".json_" + today),
    // path.join(archivePath, file),
    function (err) {
      if (err) throw err;
      console.log("Successfully renamed - AKA moved!", file);
    }
  );

  res.render("edit_list", {
    word_count: word_count,
    words: unique_words,
    list_name: file,
  });
});

module.exports = router;
