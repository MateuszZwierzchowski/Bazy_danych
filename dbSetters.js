var connection = require('./database');


function setCategory(category) {

    let sql = `INSERT INTO KATEGORIE(KATEGORIA) VALUES(\'${category}\')`;

    connection.query(sql, function(err, results){
        if (err) throw err;
        console.log("1 record inserted");
    });

}

function setClient(name, surname, login, password) {

    let sql = `INSERT INTO KATEGORIE(IMIĘ, NAZWISKO, LOGIN, HASŁO) VALUES(\'${name}\',\'${surname}\',\'${login}\',\'${password}\')`;

    connection.query(sql, function(err, results){
        if (err) throw err;
        console.log("1 record inserted");
    });

}


function getCategory(category=null, res) {
    var sql;

    if (category == null) sql = `SELECT * FROM KATEGORIE`;
    else                  sql = `SELECT * FROM KATEGORIE WHERE KATEGORIA = \'${category}\'`;    
    sql = `SELECT * FROM KATEGORIE WHERE KATEGORIA = \'${category}\'`;
    return new Promise((resolve, reject) => {
        connection.query(sql, function(err, results){
            if (err) reject(err);
            resolve(results);
            res.render('list',{page_title:"view.js",data:results});
        });
    });
}

module.exports = {getCategory}