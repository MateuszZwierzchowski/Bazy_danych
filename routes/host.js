var express = require('express');
var router = express.Router();
var connection  = require('../public/javascripts/database.js');
 
 
/* GET home page. */
router.post('/', function(req, res, next){
  data = JSON.parse(req.body['json']);
  console.log(data);
  console.log(data["sql_data"]);
  console.log(data["sql_data"][0]["value1"]);
});
 
 
module.exports = router;