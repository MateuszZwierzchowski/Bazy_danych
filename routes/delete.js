var express = require('express');
var router = express.Router();
var connection  = require('../public/javascripts/database.js');
 
 
router.post('/', function(req, res, next) {
    data = JSON.parse(JSON.stringify(req.body));
    key = Object.keys(data)[0]; 
    console.log(data[key]);

    switch(key)
    {
        case 'magazyn':
            var sqlString = `DELETE FROM MAGAZYN WHERE PRODUKT_PRODUKT_ID = ${data[key]}`;
            connection.query(sqlString, function(err, rows){
                if(err){
                  req.flash('message', err.message);
                  res.redirect('/');
                }else{   
                  console.log("SUCCESS: PRODUKT DELETED!"); 
                  res.redirect('/');
                }
              });
            break;
        case 'produkt':
            var sqlString = `DELETE FROM PRODUKT WHERE PRODUKT_ID = ${data[key]}`;
            connection.query(sqlString, function(err, rows){
                if(err){
                    req.flash('message', err.message);
                    res.redirect('/products');
                }else{   
                    console.log("SUCCESS: PRODUKT DELETED!"); 
                    res.redirect('/products');
                }
                });
            break;
        default:
            break;
    }

});

module.exports = router;