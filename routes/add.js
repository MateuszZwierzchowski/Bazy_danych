var express = require('express');
var router = express.Router();
var connection  = require('../public/javascripts/database.js');
 
 
router.post('/', function(req, res, next) {
    data = JSON.parse(JSON.stringify(req.body));
    key = Object.keys(data)[0]; 

    switch(key)
    {
        case 'produkt':
            var productFeatures = [
                {"MARKA": false},
                {"MODEL": false},
                {"CENA": true},
                {"WAGA": true},
                {"PROCESOR": false},
                {"MOC": true},
                {"PRZEKĄTNA_EKRANU": true},
                {"ROZDZIELCZOŚĆ": false},
                {"KARTA_GRAFICZNA": false},
                {"ILOŚĆ PAMIĘCI RAM": true},
                {"KATEGORIA_KATEGORIA_ID": false}
              ];
            
            var chk = false;
            var sqlString = `INSERT INTO PRODUKT(`;
            for (var i=0; i<productFeatures.length; i++) 
            {
                if (data[key][i] === "") continue;
                chk = true;
                sqlString += `${Object.keys(productFeatures[i])[0]},`;
            }
            if (chk == false) 
            {
                res.redirect('/');
                return;
            }
            sqlString = sqlString.substring(0,sqlString.length-1);
            sqlString += `) VALUES(`;
            for (var i=0; i<productFeatures.length; i++) 
            {
                if (data[key][i] === "") continue;
                if (productFeatures[i][Object.keys(productFeatures[i])[0]] == true) sqlString += `${data[key][i]},`;
                else sqlString += `'${data[key][i]}',`;
            }
            sqlString = sqlString.substring(0,sqlString.length-1);
            sqlString += `)`;
            break; 
        case 'magazyn':
            var sqlString = `INSERT INTO MAGAZYN(ILOŚĆ, PRODUKT_PRODUKT_ID) VALUES(${data[key][1]}, ${data[key][0]})`;
            connection.query(sqlString, function(err, rows){
                if(err){
                  req.flash('message', err.message);
                  res.redirect('/');
                }else{   
                  console.log("SUCCESS: MAGAZYN UPDATED!"); 
                  res.redirect('/');
                }
              });
            break;
        default:
            break;
    }

});

module.exports = router;