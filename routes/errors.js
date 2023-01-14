var express = require('express');
var router = express.Router();
var connection  = require('../public/javascripts/database.js');
 
 
/* GET home page. */
router.get('/', function(req, res) {
    res.render('dberror',{page_title:"ERROR"});
});
 
 
module.exports = router;