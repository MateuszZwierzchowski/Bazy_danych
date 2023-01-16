var express = require('express');
var router = express.Router();
var connection  = require('../public/javascripts/database.js');

router.post('/', function(req, res, next){
  data = JSON.parse(JSON.stringify(req.body))['json'];
  data = JSON.parse(data);
  key = Object.keys(data)[0];

  console.log(data);

  switch(key)
  {
    case 'magazyn':
      var sqlString = `UPDATE MAGAZYN SET ILOŚĆ = ${data[key][1]["val"]} WHERE PRODUKT_PRODUKT_ID = ${data[key][0]["val"]}`;
      connection.query(sqlString, function(err, rows){
        if(err){;
          req.flash('message', err.message);
          res.redirect('/');
        }else{   
          console.log("SUCCESS: MAGAZYN UPDATED!"); 
          res.redirect('/');  
        }
      });
      break;
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
          {"ILOŚĆ_PAMIĘCI_RAM": true},
        ];
      
      var sqlString = `UPDATE PRODUKT SET `;
      for (var i=0; i<productFeatures.length; i++) 
      {
        if (data[key][i+2]['val'] === "") continue;
        if (productFeatures[i][Object.keys(productFeatures[i])[0]] == true) sqlString += `${Object.keys(productFeatures[i])[0]} = ${data[key][i+2]['val']},`;
        else sqlString += `${Object.keys(productFeatures[i])[0]} = '${data[key][i+2]['val']}',`;
      }
      sqlString += `KATEGORIE_KATEGORIA_ID = (SELECT KATEGORIA_ID FROM KATEGORIE WHERE KATEGORIA = '${data[key][1]['val']}') `;
      sqlString += ` WHERE PRODUKT_ID = ${data[key][0]['val']}`

      connection.query(sqlString, function(err, rows){
        if(err){
          req.flash('message', err.message);
          res.redirect('/products');
        }else{   
          console.log("SUCCESS: MAGAZYN UPDATED!"); 
          res.redirect('/products');
        }
      });
      break;
    case 'kategorie':
      var sqlString = `UPDATE KATEGORIE SET KATEGORIA = '${data[key][1]["val"]}' WHERE KATEGORIA_ID = ${data[key][0]["val"]}`;
      console.log(sqlString);
      connection.query(sqlString, function(err, rows){
        if(err){;
          req.flash('message', err.message);
          res.redirect('/categories');
        }else{   
          console.log("SUCCESS: KATEGORIA UPDATED!"); 
          res.redirect('/categories');  
        }
      });
      break; 
    default:
      req.flash('message', 'WRONG KEY!');
      res.redirect('/products');
  }
});


 
 
module.exports = router;