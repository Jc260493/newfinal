var express = require('express');
var router = express.Router();


router.get('/addUser', function(req, res) {
    res.render('addUser', { title: 'Express' });
});

module.exports = router;
