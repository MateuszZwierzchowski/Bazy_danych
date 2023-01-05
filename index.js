var express = require("express");
require('express-async-errors');
var app = express();
var connection = require('./database');
var setters = require('./dbSetters');



app.get('/', function(req, res) {
    setters.getCategory("Smartfony", res);
    
});

app.listen(3000, function(){
    console.log('App Listening on port 3000');
    connection.connect(function(err){
        if(err) throw err;
        console.log('Database connected!');
    })
});