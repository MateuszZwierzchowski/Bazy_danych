var express = require('express');
var router = express.Router();
var connection  = require('../public/javascripts/database.js');
 

router.post('/', function(req, res, next){
  data = JSON.parse(JSON.stringify(req.body))['json'];
  data = JSON.parse(data);
  key = Object.keys(data)[0];
  var sqlString = "";

  console.log('')
  switch(key)
  {
    case 'magazyn':
      var cellToUpdate = [
        {"PRODUKT_PRODUKT_ID": true},
        {"ILOŚĆ": true},
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

      function test() {
        var chk = 0;
        var sqlString = "UPDATE mydb.PRODUKT SET ";
        
        sqlString += `Kategorie_Kategoria_ID = (SELECT KATEGORIA_ID FROM KATEGORIE WHERE KATEGORIA = '${data[key][2]["val"]}'), `;
        
        for(var i=3; i<cellToUpdate.length; i++)
        {
          chk++;
          if (cellToUpdate[i][Object.keys(cellToUpdate[i])[0]] == true) sqlString += `${Object.keys(cellToUpdate[i])[0]} = ${data[key][i]["val"]}, `;
          else sqlString += `${Object.keys(cellToUpdate[i])[0]} = '${data[key][i]["val"]}', `;
        }
      
        if (chk != 0)
        {
          sqlString = sqlString.substring(0,sqlString.length-2);
          sqlString += ` WHERE PRODUKT_ID = ${data[key][0]["val"]}`;
        }
      
        connection.query(sqlString, function(err, rows){
          if(err){
            req.flash('message', err.message);
            res.redirect('/');
          }else{   
            console.log("SUCCESS: PRODUKT UPDATED!");
            res.redirect('/');
          }
        });
      }

      sqlString = `UPDATE mydb.MAGAZYN SET ${Object.keys(cellToUpdate[1])[0]} = ${data[key][1]["val"]} WHERE ${Object.keys(cellToUpdate[0])[0]} = ${data[key][0]["val"]}`;
      connection.query(sqlString, function(err, rows){
        if(err){;
          req.flash('message', err.message);
          test();
        }else{   
          console.log("SUCCESS: MAGAZYN UPDATED!");
          test();          
        }
      });
      break;
    default:
      console.log("ERROR: wrong key!");
  }
});


 
 
module.exports = router;