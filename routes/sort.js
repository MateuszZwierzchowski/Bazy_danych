var express = require('express');
var router = express.Router();
 
 
router.post('/', function(req, res, next) {
    data = JSON.parse(JSON.stringify(req.body));
    key = Object.keys(data)[0]; 
    console.log(data);

    switch(key)
    {
        case 'zawartosc_zamowienia':
            req.flash('order', "ORDER BY PRODUKT_PRODUKT_ID");
            res.redirect('/ordersContents');
            break
        default:
            res.redirect('/');
            break;
    }

});

module.exports = router;