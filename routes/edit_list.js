var express = require("express");
var router = express.Router();

var fs = require("fs");
var path = require("path");
var shuffle = require("shuffle-array");
// const { copy } = require('../app');

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
  fs.unlinkSync(filename);

  res.render("edit_list", {
    word_count: word_count,
    words: unique_words,
    list_name: file,
  });
});

module.exports = router;
