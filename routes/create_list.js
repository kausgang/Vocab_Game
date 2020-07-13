var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');

var fs = require('fs')
var Owlbot = require('owlbot-js')

var path = require('path');
const { setUncaughtExceptionCaptureCallback } = require('process');
var client = Owlbot('5a7eb608e2f77faca3115a96aaf7db1c5a0d50f4');

var words = [], meaning = [], example = [], sentence = [], sentence_word = []

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
      find_example(word)
        
    
      setTimeout(function () {
    
          // ...and continue emitting lines.
          lr.resume();

      }, 1000);
    });
    
    lr.on('end', function () {
      // All lines are read, file is closed now.
      if(words.length !=0)
        write_file(list_name,words,meaning,example)

      if(sentence_word.length !=0)
        write_file_sentence(list_name)

      

      // send response
      res.send("done")
    });


 

  // res.render('create_list', { title: 'Express' });


});



function find_meaning(word) {

  client.define(word).then( result => { 

      
      // console.log(result)
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



function find_example(word){

    var url = "https://sentence.yourdictionary.com/"+ word;

    request.get(url, function(err,responsecode,body) {
   
      console.log("finding sentences for "+ word)
     
      try{

        var $ = cheerio.load(body);
        var example = $('.sentence-list').html()
        var $ = cheerio.load(example);   
        var sentences = $("p").text().replace(/\([\s\S]*?\)/g, '').split('.')

        for(i=0;i<sentences.length;i++){
          if(sentences[i]!=""){
            sentence_word.push(word)
            sentence.push(sentences[i])
          }
          else return;    
        }
      }catch{
        console.log('Could not find sentences with the word -  ' + word)
        return;
      }
    })
}



function write_file(list_name,words,meaning,example){
  var obj = {}
  obj.words = words
  obj.meaning = meaning
  obj.example = example
  var filename = path.join(DESTINATION_FOLDER,list_name)+'.json'
  fs.writeFileSync(filename,JSON.stringify(obj,null,2));

  
}


function write_file_sentence(list_name){
  var obj = {}
  obj.words = sentence_word
  obj.sentence = sentence
  
  var filename = path.join(DESTINATION_FOLDER,list_name)+'_example.json'
  fs.writeFileSync(filename,JSON.stringify(obj,null,2));
  

  // delete the temp file
  fs.unlinkSync('./public/temp')

 
}

module.exports = router;
