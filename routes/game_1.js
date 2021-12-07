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

  // // find word_count number of random numbers between 0 and list_length
  // var random_numbers = []
  // for(i=0;i<word_count;i++){
  //   random_numbers.push(getRandomInt(list_length))
  // }

  // find word_count number of random numbers between 0 and list_length - non repeating
  var random_numbers = [];

  if (word_count <= list_length) {
    do {
      let num = Math.floor(Math.random() * list_length + 1);
      random_numbers.push(num);
      random_numbers = random_numbers.filter((item, index) => {
        return random_numbers.indexOf(item) === index;
      });
    } while (random_numbers.length < word_count);
  } //if list length is less than word count - there will be repeatation
  else {
    for (i = 0; i < word_count; i++) {
      random_numbers.push(getRandomInt(list_length));
    }
  }

  // console.log(random_numbers);
  // console.log(meaning);

  // create game arrays
  var game_words = [],
    game_meaning = [],
    game_example = [];
  var puzzle = [];
  for (i = 0; i < word_count; i++) {
    var j = random_numbers[i];

    // console.log("j is", j);

    var test = {};
    if (j === list_length) j = j - 1; //take care of the array index (starting with 0) problem
    test.word = words[j];
    test.puzzle = meaning[j].replace(/,/g, "");
    puzzle[i] = test;

    game_words[i] = words[j];
  }

  var puzzle_shuffle = shuffle(puzzle, { copy: true });
  var puzzle_word = [],
    puzzle_meaning = [];
  puzzle_shuffle.forEach((element) => {
    puzzle_word.push(element.word);
    puzzle_meaning.push(element.puzzle);
  });

  res.render("game_1", {
    word_count: word_count,
    game_words: game_words,
    puzzle_word: puzzle_word,
    puzzle_meaning: puzzle_meaning,
  });
});

module.exports = router;
