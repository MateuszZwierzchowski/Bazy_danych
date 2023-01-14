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

      sqlString = `UPDATE mydb.MAGAZYN SET ${Object.keys(cellToUpdate[1])[0]} = ${data[key][1]["val"]} WHERE ${Object.keys(cellToUpdate[0])[0]} = ${data[key][0]["val"]}`;

      connection.query(sqlString, function(err, rows){
        if(err){
            return res.render('../views/dberror',{page_title:"ERROR"});
            console.log("ERROR: CANNOT UPDATE MAGAZYN!");
        }else{   
          console.log("SUCCESS: MAGAZYN UPDATED!");
        }
      });

      var chk = 0;
      sqlString = "UPDATE mydb.PRODUKT SET ";
      console.log(data)
      for(var i=3; i<cellToUpdate.length; i++)
      {
        chk++;
        if (data[key][i]["val"] == '') continue;
        if (cellToUpdate[i][Object.keys(cellToUpdate[i])[0]] == true) sqlString += `${Object.keys(cellToUpdate[i])[0]} = ${data[key][i]["val"]}, `;
        else sqlString += `${Object.keys(cellToUpdate[i])[0]} = '${data[key][i]["val"]}', `;
      }

      if (chk != 0)
      {
        sqlString = sqlString.substring(0,sqlString.length-2);
        sqlString += ` WHERE PRODUKT_ID = ${data[key][0]["val"]}`;
      }

      console.log(sqlString)

      connection.query(sqlString, function(err, rows){
        if(err){
            console.log(err);
        }else{   
          console.log("SUCCESS: PRODUKT UPDATED!");
        }
      });
      break
    default:
      console.log("ERROR: wrong key!");
  }

});
 
 
module.exports = router;