var express = require('express');
var router = express.Router();
var connection  = require('../public/javascripts/database.js');
 
 
/* GET home page. */
router.post('/', function(req, res, next){
    
  console.log(req.body.text);      
});
 
 
module.exports = router;