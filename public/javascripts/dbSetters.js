var connection = require('./database');


function getReturns(res, req, next) {
    let sql = `SELECT Z.ZAMÓWIENIA_ZAMÓWIENIE_ID, S.NAZWA_STANU 
    FROM ZWROTY Z
    LEFT OUTER JOIN STANY S ON Z.STANY_STAN_ID=S.STAN_ID`;

    connection.query(sql, function(err, rows){
        if(err){
            req.flash('error', err); 
            res.render('returns', {page_title:"error", warehouse: ''});   
            return;
        } else {
            const mess = req.flash('message');
            if (mess.length == 0) res.render('returns', {page_title:"succes", warehouse: rows, message: ""});
            else res.render('returns', {page_title:"succes", warehouse: rows, message: mess[0]});
        }
    });
}


function getComplaints(res, req, next) {
    let sql = `SELECT KATEGORIA FROM mydb.KATEGORIE`;

    connection.query(sql, function(err, rows){
        if(err){
            req.flash('error', err); 
            res.render('complaints', {page_title:"error", warehouse: ''});   
            return;
        } else {
            const mess = req.flash('message');
            if (mess.length == 0) res.render('complaints', {page_title:"succes", warehouse: rows, message: ""});
            else res.render('complaints', {page_title:"succes", warehouse: rows, message: mess[0]});
        }
    });
}


function getOrdersContents(res, req, next) {
    let sql = `SELECT KATEGORIA FROM mydb.KATEGORIE`;

    connection.query(sql, function(err, rows){
        if(err){
            req.flash('error', err); 
            res.render('ordersContents', {page_title:"error", warehouse: ''});   
            return;
        } else {
            const mess = req.flash('message');
            if (mess.length == 0) res.render('ordersContents', {page_title:"succes", warehouse: rows, message: ""});
            else res.render('ordersContents', {page_title:"succes", warehouse: rows, message: mess[0]});
        }
    });
}



function getOrders(res, req, next) {
    let sql = `SELECT Z.ZAMÓWIENIE_ID, Z.DATA_ZAMÓWIENIA, S.NAZWA_STANU, P.NAZWA_PRZEWOŹNIKA, K.IMIĘ, K.NAZWISKO
    FROM ZAMÓWIENIA Z 
    LEFT OUTER JOIN STANY S ON Z.STANY_STAN_ID=S.STAN_ID
    LEFT OUTER JOIN PRZEWOŹNIK P ON Z.PRZEWOŹNIK_PRZEWOŹNIK_ID=P.PRZEWOŹNIK_ID
    LEFT OUTER JOIN KLIENT K ON Z.KLIENT_KLIENT_ID=K.KLIENT_ID`;

    connection.query(sql, function(err, rows){
        if(err){
            req.flash('error', err); 
            res.render('orders', {page_title:"error", warehouse: ''});   
            return;
        } else {
            const mess = req.flash('message');
            if (mess.length == 0) res.render('orders', {page_title:"succes", warehouse: rows, message: ""});
            else res.render('orders', {page_title:"succes", warehouse: rows, message: mess[0]});
        }
    });
}



function getCategories(res, req, next) {
    let sql = `SELECT KATEGORIA FROM mydb.KATEGORIE`;

    connection.query(sql, function(err, rows){
        if(err){
            req.flash('error', err); 
            res.render('categories', {page_title:"error", warehouse: ''});   
            return;
        } else {
            const mess = req.flash('message');
            if (mess.length == 0) res.render('categories', {page_title:"succes", warehouse: rows, message: ""});
            else res.render('categories', {page_title:"succes", warehouse: rows, message: mess[0]});
        }
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
    let sql = `SELECT P.PRODUKT_ID, M.ILOŚĆ, K.KATEGORIA, P.MARKA, P.MODEL, P.CENA, P.WAGA
    FROM mydb.magazyn M JOIN mydb.PRODUKT P ON P.PRODUKT_ID = M.PRODUKT_PRODUKT_ID
    LEFT OUTER JOIN mydb.KATEGORIE K ON P.KATEGORIE_KATEGORIA_ID = K.KATEGORIA_ID`;

    connection.query(sql, function(err, rows){
        if(err){
            req.flash('error', err); 
            res.render('warehouse', {page_title:"error", warehouse: ''});   
            return;
        } else {
            const mess = req.flash('message');
            if (mess.length == 0) res.render('warehouse', {page_title:"succes", warehouse: rows, message: ""});
            else res.render('warehouse', {page_title:"succes", warehouse: rows, message: mess[0]});
        }
    });
}

module.exports = {getWarehouse, getProducts, getCategories, getOrders, getOrdersContents, getComplaints, getReturns}