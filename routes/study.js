var express = require('express');
var router = express.Router();

var fs = require('fs')
var path = require('path')
var shuffle = require('shuffle-array');
const { copy } = require('../app');




/* GET users listing. */
router.get('/', function(req, res, next) {

  var file = req.query.list;
  

  var filename = path.join('./public/DATABASE/'+file+'.json');
  var content = fs.readFileSync(filename);
  var data = JSON.parse(content);
  // data now contains the definition and meaning of words from the list
  
  // seggregate words meaning and example array
  var words = data.words
  var meaning_1 = data.meaning;
  var example_1 = data.example

  var word_count = words.length;
  var meaning = [],example =[];

  for(i=0;i<word_count;i++){
    
      // remove comma from game meaning or it will split the text in array
    meaning.push(meaning_1[i].replace(/,/g,'')) 
    if(example_1[i]!=null)
      example.push(example_1[i].replace(/,/g,''))
    else  
      example.push(example_1[i])
  }

  
  // res.send('respond with a resource');
  res.render('study', { 
    word_count:word_count,
    words:words,
    meaning:meaning,
    example:example,
    
   });


});





  







module.exports = router;
