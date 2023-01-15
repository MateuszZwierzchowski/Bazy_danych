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


function getProducts(res, req, next) {
    let sql = `SELECT P.PRODUKT_ID, K.KATEGORIA, P.MARKA, P.MODEL, P.CENA, P.PROCESOR, P.MOC, P.WAGA, P.PRZEKĄTNA_EKRANU, P.ROZDZIELCZOŚĆ 
    FROM mydb.PRODUKT P LEFT OUTER JOIN mydb.KATEGORIE K ON P.KATEGORIE_KATEGORIA_ID = K.KATEGORIA_ID`;

    connection.query(sql, function(err1, mpRows){
        function getCategory(res, req, mpRows) {
            let sql = `SELECT KATEGORIA FROM KATEGORIE`;
            connection.query(sql, function(err2, kRows){
                if(err2) {
                    res.render('products', {page_title:"error2", warehouse: ''});
                }    
                else {
                    const mess = req.flash('message');
                    if (mess.length == 0) res.render('products', {page_title:"succes12", warehouse: mpRows, message: "", categories: kRows});
                    else res.render('products', {page_title:"succes12", warehouse: mpRows, message: mess[0], categories: kRows});
                }  
            });
        }
        if(err1){
            req.flash('error', err1); 
            res.render('products', {page_title:"error1", warehouse: ''});   
            return;
        }
        getCategory(res, req, mpRows);
    });
}



function getWarehouse(res, req, next) {
    let sql = `SELECT P.PRODUKT_ID, M.ILOŚĆ, K.KATEGORIA, P.MARKA, P.MODEL, P.CENA, P.PROCESOR, P.MOC, P.WAGA, P.PRZEKĄTNA_EKRANU, P.ROZDZIELCZOŚĆ 
    FROM mydb.magazyn M JOIN mydb.PRODUKT P ON P.PRODUKT_ID = M.PRODUKT_PRODUKT_ID
    LEFT OUTER JOIN mydb.KATEGORIE K ON P.KATEGORIE_KATEGORIA_ID = K.KATEGORIA_ID`;

    connection.query(sql, function(err1, mpRows){
        function getCategory(res, req, mpRows) {
            let sql = `SELECT KATEGORIA FROM KATEGORIE`;
            connection.query(sql, function(err2, kRows){
                if(err2) {
                    res.render('warehouse', {page_title:"error2", warehouse: ''});
                }    
                else {
                    const mess = req.flash('message');
                    if (mess.length == 0) res.render('warehouse', {page_title:"succes12", warehouse: mpRows, message: "", categories: kRows});
                    else res.render('warehouse', {page_title:"succes12", warehouse: mpRows, message: mess[0], categories: kRows});
                }  
            });
        }
        if(err1){
            req.flash('error', err1); 
            res.render('warehouse', {page_title:"error1", warehouse: ''});   
            return;
        }
        getCategory(res, req, mpRows);
    });
}

module.exports = {getWarehouse, getProducts}