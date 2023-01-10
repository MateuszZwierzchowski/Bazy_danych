var express = require('express');
var router = express.Router();
var connection  = require('../public/javascripts/database.js');
 
 
/* GET home page. */
router.post('/', function(req, res, next){
  data = JSON.parse(req.body['json']);
  key = Object.keys(data)[0];
  var sqlString = "";

  switch(key)
  {
    case 'magazyn':
      var cellToUpdate = [
        "PRODUKT_PRODUKT_ID",
        "ILOŚĆ",
        "KATRGORIA",
        "MARKA",
        "MODEL",
        "CENA",
        "MOC",
        "WAGA",
        "PROCESOR",
        "PRZEKĄTNA EKRANU",
        "ROZDZIELCZOŚĆ"
      ];

      sqlString = `UPDATE mydb.MAGAZYN SET ${cellToUpdate[1]} = ${data[key][1]["val"]} WHERE ${cellToUpdate[0]} = ${data[key][0]["val"]}`;

      connection.query(sqlString, function(err, rows){
        if(err){
            console.log("ERROR: CANNOT UPDATE!");
        }else{   
          console.log("SUCCESS: MAGAZYN UPDATED!");
        }
      });

      break
    default:
      console.log("ERROR: wrong key!");
  }

});
 
 
module.exports = router;