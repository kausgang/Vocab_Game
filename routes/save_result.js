var express = require('express');
var router = express.Router();

var fs = require('fs')
var Owlbot = require('owlbot-js')

var path = require('path');
var client = Owlbot('5a7eb608e2f77faca3115a96aaf7db1c5a0d50f4');

var words = [], meaning = [], example = [];

var DESTINATION_FOLDER = './public/REPORT'

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

      // create game1 and game2 stat page
      var obj = {}
      obj.game = "game_1"
      obj.game_date = []
      obj.wrong_answer = []
      fs.writeFileSync('./public/REPORT/game_1.json',JSON.stringify(obj,null,2));
      var obj = {}
      obj.game = "game_2"
      obj.game_date = []
      obj.wrong_answer = []
      fs.writeFileSync('./public/REPORT/game_2.json',JSON.stringify(obj,null,2));
  }

});


/* GET home page. */
router.get('/', function(req, res, next) {


  var game = req.query.game
  var wrong_answer = req.query.wrong_answer
  var game_date = req.query.game_date
  
  console.log(game_date)
  
  // read the game report file
  if(game == 'game_1')
    var filename = path.join('./public/REPORT/game_1.json');
  if(game == 'game_2')
    var filename = path.join('./public/REPORT/game_2.json');
  
  var content = fs.readFileSync(filename);
  var data = JSON.parse(content);

  // add the game result
  data.game_date.push(game_date)
  data.wrong_answer.push(wrong_answer)
    
  // save the data
  var obj = {}
  obj.game = data.game
  obj.game_date = data.game_date
  obj.wrong_answer = data.wrong_answer
  fs.writeFileSync(filename,JSON.stringify(obj,null,2));

 

  res.send("done")

});


module.exports = router;
