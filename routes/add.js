var express = require('express');
var router = express.Router();
var connection  = require('../public/javascripts/database.js');
 
 
router.post('/', function(req, res, next) {
    console.log(req.body);
    data = JSON.parse(JSON.stringify(req.body));
    key = Object.keys(data)[0]; 

    switch(key)
    {
        case 'magazyn':
            var cellsToAdd = [
                {"KATRGORIA": false},
                {"MARKA": false},
                {"MODEL": false},
                {"CENA": true},
                {"WAGA": true},
                {"PROCESOR": false},
                {"MOC": true},
                {"PRZEKĄTNA_EKRANU": true},
                {"ROZDZIELCZOŚĆ": false}
              ];

            var sql = `INSERT INTO PRODUKT VALUES(`;
            for (var i=1; i<cellsToAdd.length; i++)
            {
                
            }
            break;
        default:
            break;
    }
    

    /*connection.query(sql, function(err, results){
        if (err) throw err;
        console.log("1 record inserted");
    });*/

    res.redirect('/');
});

module.exports = router;