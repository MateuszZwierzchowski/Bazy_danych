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
    default:
      console.log("ERROR: wrong key!");
  }
});


 
 
module.exports = router;