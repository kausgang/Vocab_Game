var express = require("express");
var router = express.Router();

var fs = require("fs");
var path = require("path");
var shuffle = require("shuffle-array");
// const { copy } = require('../app');

/* GET users listing. */
router.get("/", function (req, res, next) {
  var file = req.query.list;

  var filename1 = path.join("./public/REPORT/game_1.json");
  var content1 = fs.readFileSync(filename1);
  var data1 = JSON.parse(content1);

  var filename2 = path.join("./public/REPORT/game_2.json");
  var content2 = fs.readFileSync(filename2);
  var data2 = JSON.parse(content2);

  // // data now contains the definition and meaning of words from the list

  // // seggregate words meaning and example array
  // var words = data.words
  // var meaning_1 = data.meaning;
  // var example = data.example

  // var word_count = words.length;
  // var meaning = [];

  // for(i=0;i<word_count;i++){

  //     // remove comma from game meaning or it will split the text in array
  //   meaning.push(meaning_1[i].replace(/,/g,''))
  // }

  var game_1_data = [["date", "game_1"]];
  var game_2_data = [["date", "game_2"]];

  var game_1_count = data1.wrong_answer.length;
  var game_2_count = data2.wrong_answer.length;

  // collect game1 report in required format
  for (i = 0; i < game_1_count; i++) {
    game_1_data.push([data1.game_date[i], data1.wrong_answer[i]]);
  }

  // collect game2 report in required format
  for (i = 0; i < game_2_count; i++) {
    game_2_data.push([data2.game_date[i], data2.wrong_answer[i]]);
  }

  // console.log(game_1_data)

  res.render("report", {
    game_1_data: game_1_data,
    game_2_data: game_2_data,
  });
});

module.exports = router;
