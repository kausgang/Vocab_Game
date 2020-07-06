var express = require('express');
var router = express.Router();

var fs = require('fs')
var Owlbot = require('owlbot-js')

var path = require('path');
var client = Owlbot('5a7eb608e2f77faca3115a96aaf7db1c5a0d50f4');

var words = [], meaning = [], example = [];

var DESTINATION_FOLDER = './public/DATABASE'

fs.exists(DESTINATION_FOLDER, function (exists) {

  if (exists) {
      // console.log(exists)
  }
  else {
      console.log("creating folder");
      fs.mkdir(DESTINATION_FOLDER,function(err){

          if(err)
              console.log(err);
      })
  }

});


/* GET home page. */
router.get('/', function(req, res, next) {

  // console.log()
  var list_name = req.query.list_name;
  var word_list = req.query.word_list;

  // create temp list first
  fs.writeFileSync('./public/temp',word_list);

  // read from the temp file and query in dictionary
  var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('./public/temp');
    lr.on('error', function (err) {
      // 'err' contains error object
    });
    
    lr.on('line', function (word) {
    
        
      // pause emitting of lines...
      lr.pause();
    
      // ...do your asynchronous line processing..
        find_meaning(word)
    
      setTimeout(function () {
    
          // ...and continue emitting lines.
          lr.resume();
      }, 300);
    });
    
    lr.on('end', function () {
      // All lines are read, file is closed now.
      write_file(list_name,words,meaning,example)

      // send response
      res.send("done")
    });


 

  // res.render('create_list', { title: 'Express' });


});



function find_meaning(word) {

  client.define(word).then( result => { 

      // pronunciation.push({"word": word, "pronunciation": result.pronunciation});
      console.log(result)
      var definitions = JSON.parse(JSON.stringify(result.definitions))
      definitions.forEach(element =>{
          words.push(word)
          meaning.push(element.definition)
          example.push(element.example)
      })
  })
  .catch(message =>{
      console.log(word + " was not found in dictionary")
      // console.log(message)
  })    
}


function write_file(list_name,words,meaning,example){
  var obj = {}
  obj.words = words
  obj.meaning = meaning
  obj.example = example
  var filename = path.join(DESTINATION_FOLDER,list_name)+'.json'
  fs.writeFileSync(filename,JSON.stringify(obj,null,2));

  // delete the temp file
  fs.unlinkSync('./public/temp')
}

module.exports = router;
