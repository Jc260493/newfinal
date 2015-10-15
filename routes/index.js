var express = require('express');
var router = express.Router();

/* GET home page. */






router.get('/',function(req,res){
    sess=req.session;
        if(sess.email == 'admin'){
            res.render('adminHomePage');
        } else if(sess.paytype == 'W'){
            res.render('userHomePage');
        } else if(sess.paytype == 'C'){
            res.render('userHomePageC');
        } else if(sess.paytype == 'S'){
            res.render('userHomePageS');
        } else{
            res.render('login');
        }

       
});




router.get('/logout',function(req,res){
    var user = req.session.email;

    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    });

});







router.get('/admin', function(req, res, next) {
    sess=req.session;
    if(sess.email == 'admin'){
        res.render('adminHomePage');
    } else{
        res.redirect('/');
    }
});

router.get('/user', function(req, res, next) {
    sess=req.session;
    if(sess.paytype == 'W'){
        res.render('userHomePage');
    } else{
        res.redirect('/');
    }
});

router.get('/user1', function(req, res, next) {
    sess=req.session;
    if(sess.paytype == 'C'){
        res.render('userHomePageC');
    } else{
        res.redirect('/');
    }
});

router.get('/resetPassword', function(req, res, next) {
    sess=req.session;
    if(sess.paytype){
        res.redirect('/');
    } else{
        res.render('resetPassword');
    }
});

router.get('/user2', function(req, res, next) {
    sess=req.session;
    if(sess.paytype == 'S'){
        res.render('userHomePageS');
    } else{
        res.redirect('/');
    }
});

router.get('/addUser', function(req, res) {
    sess=req.session;
    if(sess.email == 'admin'){
        res.render('addUser');
    } else{
        res.redirect('/');
    }
});

router.get('/removeUser', function(req, res) {
    sess=req.session;
    if(sess.email == 'admin'){
        res.render('removeUser');
    } else{
        res.redirect('/');
    }
});

router.get('/viewUsers', function(req, res) {
    sess=req.session;
    if(sess.email == 'admin'){
        res.render('viewUsers');
    } else{
        res.redirect('/');
    }
});

router.get('/viewPayCards', function(req, res) {
    sess=req.session;
    if(sess.email){
        res.render('viewPayCards');
    } else{
        res.redirect('/');
    }
});

router.get('/viewCharges', function(req, res) {
    sess=req.session;
    if(sess.email == 'admin'){
        res.render('viewCharges');
    } else{
        res.redirect('/');
    }
});

router.get('/payEmployees', function(req, res) {
    sess=req.session;
    if(sess.email == 'admin'){
        res.render('payEmployees');
    } else{
        res.redirect('/');
    }
});


router.get('/updateUser', function(req, res) {
    sess=req.session;
    if(sess.email){
        res.render('updateUser');
    } else{
        res.redirect('/');
    } 
});

router.get('/login', function(req, res) {
    res.redirect('/');
});

router.get('/postCharge', function(req, res) {
    sess=req.session;
    if(sess.email){
        res.render('postCharge');
    } else{
        res.redirect('/');
    }
});



router.get('/changePassword', function(req, res) {
    sess=req.session;
    if(sess.email){
        res.render('changePassword');
    } else{
        res.redirect('/');
    }
});

router.get('/postReceipt', function(req, res) {
    sess=req.session;
    if(sess.paytype == 'C'){
        res.render('postReceipt');
    } else{
        res.redirect('/');
    }
});

router.get('/updatePayType', function(req, res) {
    sess=req.session;
    if(sess.email == 'admin'){
        res.render('updatePayType');
    } else{
        res.redirect('/');
    } 
});

router.get('/addToUnion', function(req, res) {
    sess=req.session;
    if(sess.email == 'admin'){
        res.render('addToUnion');
    } else{
        res.redirect('/');
    } 
});

router.get('/postTimeCard', function(req, res) {
    sess=req.session;
    if(sess.email){
        res.render('postTimeCard');
    } else{
        res.redirect('/');
    }
});

router.get('/viewTimeCards', function(req, res) {
    sess=req.session;
    if(sess.email == 'admin'){
        res.render('viewTimeCards');
    } else{
        res.redirect('/');
    } 
});




module.exports = router;
