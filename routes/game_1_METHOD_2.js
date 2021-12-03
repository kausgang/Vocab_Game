var express = require("express");
var router = express.Router();

var fs = require("fs");
var path = require("path");
var shuffle = require("shuffle-array");
// const { copy } = require('../app');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/* GET users listing. */
router.get("/", function (req, res, next) {
  var file = req.query.list;
  var word_count = req.query.word_count;

  var filename = path.join("./public/DATABASE/" + file + ".json");
  var content = fs.readFileSync(filename);
  var data = JSON.parse(content);
  // data now contains the definition and meaning of words from the list

  // seggregate words meaning and example array
  var words = data.words;
  var meaning = data.meaning;
  var example = data.example;

  // find the length of the list
  var list_length = words.length;

  // find word_count number of random numbers between 0 and list_length
  var random_numbers = [];
  for (i = 0; i < word_count; i++) {
    random_numbers.push(getRandomInt(list_length));
  }

  // create game arrays
  var game_words = [],
    game_meaning = [],
    game_example = [];
  for (i = 0; i < word_count; i++) {
    var j = random_numbers[i];
    game_words[i] = words[j];

    // remove comma from game meaning or it will split the text in array
    game_meaning[i] = meaning[j].replace(/,/g, "");
    game_example[i] = example[j];

    // create a checked array to verify answer
  }
  // game_words, game_meaning & game_example now contains randomized words picked form database

  // shuffle the game_meaning/game_example array
  var game_meaning_shuffle = shuffle(game_meaning, { copy: true });
  var game_example_shuffle = shuffle(game_example, { copy: true });

  // console.log(game_meaning)
  // console.log(game_meaning_shuffle)

  // res.send('respond with a resource');
  res.render("game_1", {
    word_count: word_count,
    game_words: game_words,
    game_meaning: game_meaning,
    game_example: game_example,
    game_meaning_shuffle: game_meaning_shuffle,
    game_example_shuffle: game_example_shuffle,
  });
});

module.exports = router;
