var express = require('express');
var router = express.Router();
var connection  = require('../public/javascripts/database.js');
 
 
router.post('/', function(req, res, next) {
    data = JSON.parse(JSON.stringify(req.body));
    key = Object.keys(data)[0]; 

    switch(key)
    {
        case 'magazyn':
            var sqlString = `DELETE FROM MAGAZYN WHERE PRODUKT_PRODUKT_ID = ${data[key]}`;
            connection.query(sqlString, function(err, rows){
                if(err){
                  req.flash('message', err.message);
                  res.redirect('/');
                }else{   
                  console.log("SUCCESS"); 
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
                    console.log("SUCCESS"); 
                    res.redirect('/products');
                }
                });
            break;
        case 'kategoria':
            var sqlString = `DELETE FROM KATEGORIE WHERE KATEGORIA_ID = ${data[key]}`;
            connection.query(sqlString, function(err, rows){
                if(err){
                    req.flash('message', err.message);
                    res.redirect('/categories');
                }else{   
                    console.log("SUCCESS"); 
                    res.redirect('/categories');
                }
                });
            break;
        default:
            req.flash('message', 'WRONG DEL KEY!');
            res.redirect('/categories');
            break;
    }

});

module.exports = router;