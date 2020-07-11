var express = require('express');
var router = express.Router();

var fs = require('fs')
var path = require('path')
var shuffle = require('shuffle-array');
const { copy } = require('../app');


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


/* GET users listing. */
router.get('/', function(req, res, next) {

  var file = req.query.list;
  var word_count = req.query.word_count

  var filename = path.join('./public/DATABASE/'+file+'.json');
  var content = fs.readFileSync(filename);
  var data = JSON.parse(content);
  // data now contains the definition and meaning of words from the list
  
  // seggregate words meaning and example array
  var words = data.words
  var meaning = data.meaning;
  var example = data.example

  // choose only those words where example is not null
  var filtered_words = [], filtered_meaning = [], filtered_example = []
  for(i=0;i<words.length;i++){
    if(example[i] != null){
          filtered_words.push(words[i])
          filtered_example.push(example[i].replace(/,/g,''))
          filtered_meaning.push(meaning[i].replace(/,/g,''))
        }
  }

  // find the length of the filtered words
  var list_length = filtered_words.length;

  // find word_count number of random numbers between 0 and list_length
  var random_numbers = []
  // for(i=0;i<word_count;i++){
  //   random_numbers.push(getRandomInt(list_length))
  // }

  if(word_count<=list_length)
   {
    do {
      let num = Math.floor(Math.random() * list_length + 1);
      random_numbers.push(num);
      random_numbers = random_numbers.filter((item, index) => {
        return random_numbers.indexOf(item) === index
      });
    } while (random_numbers.length < word_count);
   }
   else //if list length is less than word count - there will be repeatation
   {
     for(i=0;i<word_count;i++){
        random_numbers.push(getRandomInt(list_length))
      }
   }

  
  


  // create game arrays
  var game_words = [], game_meaning = [], game_example = []

  for(i=0;i<word_count;i++){
    var j = random_numbers[i]    
    // remove comma from game meaning and example if example is not null
      game_words[i] = filtered_words[j]
      game_example[i] = filtered_example[j]
      game_meaning[i] = filtered_meaning[j]
  }



  // hide the word from example to create puzzle
        var puzzle = []
        
        for(i=0;i<word_count;i++){

          var test = {}
          test.word = game_words[i]
          test.puzzle = game_example[i].replace(game_words[i], '____________')
          puzzle[i] = test
          
        }

     

  // shuffle the game_meaning/game_example array
  // var game_meaning_shuffle = shuffle(game_meaning,{'copy':true})
  var puzzle_shuffle = shuffle(puzzle,{'copy':true})

  var puzzle_word = [], puzzle_example = []
  puzzle_shuffle.forEach(element => {

    puzzle_word.push(element.word)
    puzzle_example.push(element.puzzle)
    
  });


  res.render('game_2', { 
    word_count:word_count,
    puzzle:puzzle,
    game_words:game_words,
    puzzle_word:puzzle_word,
    puzzle_example:puzzle_example
    // game_meaning:game_meaning,
    // game_example:game_example,
    // game_meaning_shuffle:game_meaning_shuffle,
    
   });


});





  







module.exports = router;
