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


function getWarehouse(res, req, next) {
    let sql;

    sql = `SELECT P.PRODUKT_ID, M.ILOŚĆ, K.KATEGORIA, P.MARKA, P.MODEL, P.CENA, P.PROCESOR, P.MOC, P.WAGA, P.PRZEKĄTNA_EKRANU, P.ROZDZIELCZOŚĆ 
    FROM mydb.magazyn M JOIN mydb.PRODUKT P ON P.PRODUKT_ID = M.PRODUKT_PRODUKT_ID
    LEFT OUTER JOIN mydb.KATEGORIE K ON P.KATEGORIE_KATEGORIA_ID = K.KATEGORIA_ID`;

    connection.query(sql, function(err, rows){
        if(err){
            req.flash('error', err); 
            res.render('index', {page_title:"Index - Node.js", warehouse: ''});   
        }else{ 
            let mess = req.flash('message');
            if (mess.length == 0) res.render('index',{page_title:"Index - Node.js", warehouse: rows, message: ""});
            else {
                res.render('index',{page_title:"Index - Node.js", warehouse: rows, message: mess[0]});
            }
        }
    });

}

module.exports = {getWarehouse}