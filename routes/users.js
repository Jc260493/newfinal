
var express = require('express');
var nodemailer = require('nodemailer');
var mongo = require('mongodb');

var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var sess;
var router = express.Router();




var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "thepizzakingis@gmail.com",
        pass: "ChristianThorpe"
    }
});







router.post('/emailpassword', function(req, res) {
    var post = req.body;


    var mailOptions = {
        from: 'thepizzakingis@gmail.com', 
        to: post.email, 
        subject: 'New Password',
        text: 'New Password: ' + post.password 
    };

    smtpTransport.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent to ' + post.email);
        };
    });


});


router.post('/emailcharge', function(req, res) {
    var post = req.body;


    var mailOptions = {
        from: 'thepizzakingis@gmail.com', 
        to: post.empID, 
        subject: 'Union Charge Information',
        text: 'An admin has paid a union charge for your account to the value of $' + post.amount + ' to ' + post.unionID + ' on ' + post.date 
    };

    smtpTransport.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent to ' + post.empID);
        };
    });


});

router.post('/emailpaycard', function(req, res) {
    var post = req.body;


    var mailOptions = {
        from: 'thepizzakingis@gmail.com', 
        to: post.email, 
        subject: post.datepaid + ' Pay Card',
        text: 'You were paid $' + post.amount + ' on ' + post.datepaid  
    };

    smtpTransport.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent to ' + post.email);
        };
    });


});



















var MongoClient = require('mongodb').MongoClient;
var db;
var coll;


MongoClient.connect('mongodb://newuser:password@ds041561.mongolab.com:41561/heroku_sv0l3dlp', function (err, database) {
    if (err) {
        throw err;
    } else {
        console.log("successfully connected to the database for real");
        db = database;

    }
});










router.post('/login',function(req,res){
    sess=req.session;
    sess.email=req.body.email;
    sess.paytype = req.body.paytype;
    sess.weeklypay = req.body.weeklypay;
    sess.yearlypay = req.body.yearlypay;
    sess.commision = req.body.commision;
    sess.targethours = req.body.targethours;



    var d = new Date;
    sess.currentdate =  d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    res.end('done');

});




router.post("/admin2", function(req, res) {
    var collection = db.collection('employeecollection');
    collection.find({}).toArray(function(err, docs){
        res.json(docs);
    });
});






/*
 * GET userlist.
 */

router.get('/getcurrent', function(req, res) {  
  sess = req.session;
  if(sess.email != undefined){
      var collection = db.collection('employeecollection');
      collection.find({'email' : sess.email}).toArray(function(e,docs){
          res.json(docs);
      });
  }
});


 router.get('/loginlist', function(req, res) {
    var collection = db.collection('employeecollection');
    collection.find({}).toArray(function(e,docs){
        res.json(docs);
    });
});

router.get('/userlist', function(req, res) {
    var collection = db.collection('employeecollection');
    collection.find({admin: '0'}).toArray(function(e,docs){
        res.json(docs);
    });

});

router.get('/unionlist', function(req, res) {
    var collection = db.collection('unioncollection');
    collection.find({}).toArray(function(e,docs){
        res.json(docs);
    });

});

router.get('/userlisttest', function(req, res) {
    var collection = db.collection('employeecollection');
    collection.find({'admin' : '0'}).toArray(function(e,docs){
        res.json(docs);
    });

});

router.get('/paycardlist', function(req, res) {
    sess = req.session;
    var collection = db.collection('paycardcollection');
    collection.find({'empID' : sess.email}).toArray(function(e,docs){
        res.json(docs);
    });
});

router.get('/userlistw', function(req, res) {
    var collection = db.collection('employeecollection');
    collection.find({'paytype' : 'W'}).toArray(function(e,docs){
        res.json(docs);
    });
});

router.get('/userlistc', function(req, res) {
    var collection = db.collection('employeecollection');
    collection.find({'paytype' : 'C'}).toArray(function(e,docs){
        res.json(docs);
    });
});

router.get('/userlists', function(req, res) {
    var collection = db.collection('employeecollection');
    collection.find({'paytype' : 'S'}).toArray(function(e,docs){
        res.json(docs);
    });
});

router.get('/chargelist', function(req, res) {

    var collection = db.collection('chargecollection');
    collection.find({}).toArray(function(e,docs){
        res.json(docs);
    });

});


router.get('/unionmembershiplist', function(req, res) {

    var collection = db.collection('unionmembershipcollection');
    collection.find({}).toArray(function(e,docs){
        res.json(docs);
    });

});







router.get('/singleuserinfo', function(req, res) {
    sess = req.session;
    var email = sess.email || 'admin';


    var collection = db.collection('employeecollection');
    collection.find({'email' : email}).toArray(function(e,docs){
        res.json(docs);
    });
});

router.get('/singleaccountinfo', function(req, res) {
    sess = req.session;
    var email = sess.email || 'admin';

    var collection = db.collection('accountcollection');
    collection.find({}).toArray(function(e,docs){
        res.json(docs);
    });

});

router.get('/singletopayinfo', function(req, res) {

    sess = req.session;
    var email = sess.email || 'admin';

    var collection = db.collection('topaycollection');
    collection.find({}).toArray(function(e,docs){
        res.json(docs);
    });
});


router.get('/topaylist', function(req, res) {


    var collection = db.collection('topaycollection');
    collection.find({}).toArray(function(e,docs){
        res.json(docs);
    });
});

router.get('/oldpaylist', function(req, res) {
    sess = req.session;
    var collection = db.collection('oldtimecards');
    collection.find({'email' : sess.email}).toArray(function(e,docs){
        res.json(docs);
    });
});

router.get('/oldtimecardlist', function(req, res) {
    sess = req.session;
    var collection = db.collection('oldtimecards');
    collection.find({'email' : sess.email}).toArray(function(e,docs){
        res.json(docs);
    });
});



router.get('/timecardlist', function(req, res) {
    sess = req.session;
    var collection = db.collection('dailyTimeCards');
    collection.find({'email' : sess.email}).toArray(function(e,docs){
        res.json(docs);
    });
});

router.get('/timecardlistfull', function(req, res) {
    sess = req.session;


    var collection = db.collection('dailyTimeCards');
    collection.find({}).toArray(function(e,docs){
        res.json(docs);
    });
});






router.get('/timecardlistaccepted', function(req, res) {
    var collection = db.collection('dailyTimeCards');
    collection.find({'rejected?' : 0}).toArray(function(e,docs){
        res.json(docs);
    });
});


router.get('/timecardlistpostponed', function(req, res) {
    var collection = db.collection('dailyTimeCards');
    collection.find({'rejected?' : 1}).toArray(function(e,docs){
        res.json(docs);
    });
});







router.post('/addunion', function(req, res) {
    var post = req.body;

    var collection = db.collection('unioncollection');
    collection.insert({'union' : post.union, 'descrition' : post.description, 'amount' : parseFloat(post.amount)}, function(err, records){
         res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });

});




/*
 * POST to adduser.
 */


 router.post('/addemptounion', function(req, res) {
    var post = req.body;

    var collection = db.collection('unionmembershipcollection');
    collection.insert(post, function(err, records){
         res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });

});


router.post('/adduser', function(req, res) {
    var post = req.body;
    dueDate = parseFloat(post.duedate);

    var collection1 = db.collection('accountcollection');
    collection1.insert({'empID' : post.email, 'amount' : parseFloat(post.accountbalance)}, function(err, records){
    });

    var collection2 = db.collection('topaycollection');
    collection2.insert({'empID' : post.email, 'amount' : 0, 'duedate' : dueDate, 'paytype' : post.paytype}, function(err, records){
    });

    var collection = db.collection('employeecollection');
    collection.insert({'email' : post.email, 'paytype' : post.paytype, 'firstname' : post.firstname, 'initial' : post.initial, 'lastname' : post.lastname, 'DOB' : post.DOB, 'streetnumber' : post.streetnumber, 'street' : post.street, 'suburb' : post.suburb, 'password' : post.password, 'gender' : post.gender, 'contact' : post.contact, 'weeklyrate' : post.weeklyrate, 'commisionrate' : post.commisionrate, 'annualrate' : post.annualrate, 'targethours' : post.targethours, 'admin' : post.admin}, function(err, records){
         res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });

});







router.post('/addpaycard', function(req, res) {
    var collection = db.collection('paycardcollection');
    collection.insert(req.body, function(err, records){
    });
});







































router.post('/updatetopay', function(req, res) {



    var collection = db.collection('topaycollection');
    var post = req.body;
    var newAmount = parseFloat(post.amount);


     collection.findAndModify(
          {"empID": post.empID}, 
          [['empID','asc']],  
          {$inc: { 'amount' : newAmount}}, 
          {}, 
          function(err, result) {
             res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
          });
});





router.post('/updateaccount', function(req, res) {
    var post = req.body;
    var newAmount = parseFloat(post.amount);
    console.log("here");


    var collection = db.collection('accountcollection');



    collection.findAndModify(
          {"empID": post.empID}, 
          [['empID','asc']],  
          {$inc: { 'amount' : newAmount}}, 
          {}, 
          function(err, result) {
          });
});



router.post('/resettopay', function(req, res) {
    var post = req.body;
    var newDueDate = post.duedate;



    var newone = parseFloat(post.duedate);
    


    var collection = db.collection('topaycollection');


    collection.findAndModify(
          {"empID": post.empID}, 
          [['empID','asc']],  
          {$set: { 'duedate' : newDueDate}}, 
          {}, 
          function(err, result) {
          });

    collection.findAndModify(
          {"empID": post.empID}, 
          [['empID','asc']],  
          {$set: { 'amount' : 0}}, 
          {}, 
          function(err, result) {
          });

});




router.post('/updatetopay2', function(req, res) {
    sess = req.session;
    var post = req.body;
    var newAmount = parseFloat(post.amount) * parseFloat(sess.commision) / 100;


    var collection = db.collection('topaycollection');


    collection.findAndModify(
          {"empID": sess.email}, 
          [['empID','asc']],  
          {$inc: { 'amount' : newAmount}}, 
          {}, 
          function(err, result) {
          });
});












router.post('/postCharge', function(req, res) {
    var post = req.body;


 var collection = db.collection('chargecollection');
    collection.insert(req.body, function(err, result){
    });

});



router.post('/updateCharge', function(req, res) {
    var post = req.body;
    var newAmount = parseFloat(post.amount) * -1;
    var addAmount = parseFloat(post.amount);


    var collection = db.collection('accountcollection');


    collection.findAndModify(
          {"empID": post.empID}, 
          [['empID','asc']],  
          {$inc: { 'amount' : newAmount}}, 
          {}, 
          function(err, result) {
          });

    var collection2 = db.collection('unioncollection');


    collection2.findAndModify(
          {"union": post.unionID}, 
          [['union','asc']],  
          {$inc: { 'amount' : addAmount}}, 
          {}, 
          function(err, result) {
          });
});













router.post('/postReceipt', function(req, res) {
    var post = req.body;


 var collection = db.collection('receiptcollection');
    collection.insert(req.body, function(err, result){
    });

});







function weekCount(year, month_number) {

    // month_number is in the range 1..12

    var firstOfMonth = new Date(year, month_number-1, 1);
    var lastOfMonth = new Date(year, month_number, 0);

    var used = firstOfMonth.getDay() + lastOfMonth.getDate();

    return Math.ceil( used / 7);
}


router.post('/addoldtimecard', function(req, res) {

    var collection = db.collection('oldtimecards');
    collection.insert(req.body, function(err, records){
    });
});




router.post('/postTimeCard', function(req, res) {

    var post = req.body;
    var amount = 0;

    sess = req.session;
    var collection = db.collection('dailyTimeCards');
    var collection2 = db.collection('oldtimecards');

    if(sess.paytype == 'W'){
        var hours = parseFloat(post.hours);

        if(hours > 8){
            amount =  hours * parseFloat(sess.weeklypay) * 1.5;
        }else{
            amount = hours * parseFloat(sess.weeklypay);
        }
            collection.insert(
                {'email' : sess.email,
                'amount' : amount,
                'datelogged' : post.datelogged,
                'duedate' : post.duedatew,
                'rejected?' : 0}, function(err, result){
                }
            );

            collection2.insert(
                {'email' : sess.email,
                'amount' : amount,
                'datelogged' : post.datelogged,
                'duedate' : post.duedatew,
                'rejected?' : 0}, function(err, result){
                }
            );
    }else if(sess.paytype == 'S'){
        amount = parseFloat(post.hours)  / parseFloat(sess.targethours) * parseFloat(sess.yearlypay) / weekCount((new Date().getYear() + 1900), (new Date().getMonth() + 1));

            collection.insert(
                {'email' : sess.email,
                'amount' : amount,
                'datelogged' : post.datelogged,
                'duedate' : post.duedates,
                'rejected?' : 0}, function(err, result){
                }
            );

            collection2.insert(
                {'email' : sess.email,
                'amount' : amount,
                'datelogged' : post.datelogged,
                'duedate' : post.duedates,
                'rejected?' : 0}, function(err, result){
                }
            );
        
    }else if(sess.paytype == 'C'){
        amount = parseFloat(post.hours)  / parseFloat(sess.targethours) * parseFloat(sess.yearlypay) / weekCount((new Date().getYear() + 1900), (new Date().getMonth() + 1));

            collection.insert(
                {'email' : sess.email,
                'amount' : amount,
                'datelogged' : post.datelogged,
                'duedate' : post.duedatec,
                'rejected?' : 0}, function(err, result){
                }
            );

            collection2.insert(
                {'email' : sess.email,
                'amount' : amount,
                'datelogged' : post.datelogged,
                'duedate' : post.duedatec,
                'rejected?' : 0}, function(err, result){
                }
            );
    }

});













router.post('/changePassword', function(req, res) {
    var collection = db.collection('employeecollection');
    var post = req.body;
    sess = req.session;
    var email = sess.email || post.email;


     collection.findAndModify(
          {"email": email}, 
          [['email','asc']],  
          {$set: { 'password' : post.password}}, 
          {}, 
          function(err, result) {
             res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
          });
});


















router.put('/updateuser', function(req, res) {

    var userToUpdate = req.params.id;
    var collection = db.collection('employeecollection');
    var post = req.body;
    sess = req.session;



     collection.findAndModify(
          {"email": sess.email}, 
          [['email','asc']],  
          {$set: {'firstname' : post.firstname, 'initial' : post.initial, 'lastname' : post.lastname, 'street' : post.street, 'streetnumber' : post.streetnumber, 'suburb' : post.suburb, 'contact' : post.contact}}, 
          {}, 
          function(err, result) {
             res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
             console.log(result);
          });
});





router.put('/updateuserpayW/:id', function(req, res) {
    var userToUpdate = req.params.id;
    var collection = db.collection('employeecollection');
    var post = req.body;



     collection.findAndModify(
          {"email": userToUpdate}, 
          [['email','asc']],  
          {$set: {'paytype' : post.paytype, 'weeklyrate' : post.weeklyrate, 'commisionrate' : post.commisionrate, 'annualrate' : post.annualrate, 'targethours' : post.targethours}}, 
          {}, 
          function(err, result) {
             res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
          });

});


router.put('/updateuserpayC/:id', function(req, res) {
   
    var userToUpdate = req.params.id;
    var collection = db.collection('employeecollection');
    var post = req.body;



     collection.findAndModify(
          {"email": userToUpdate}, 
          [['email','asc']],  
          {$set: {'paytype' : post.paytype, 'weeklyrate' : post.weeklyrate, 'commisionrate' : post.commisionrate, 'annualrate' : post.annualrate, 'targethours' : post.targethours}}, 
          {}, 
          function(err, result) {
             res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
          });

});

router.put('/updateuserpayS/:id', function(req, res) {

    var userToUpdate = req.params.id;
    var collection = db.collection('employeecollection');
    var post = req.body;



     collection.findAndModify(
          {"email": userToUpdate}, 
          [['email','asc']],  
          {$set: {'paytype' : post.paytype, 'weeklyrate' : post.weeklyrate, 'commisionrate' : post.commisionrate, 'annualrate' : post.annualrate, 'targethours' : post.targethours}}, 
          {}, 
          function(err, result) {
             res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
          });


});




router.post('/updatetopay', function(req, res) {


    var userToUpdate = req.params.id;
    var collection = db.collection('topaycollection');
    var post = req.body;
    var newAmount = parseFloat(post.amount);



     collection.findAndModify(
          {"empID": post.empID}, 
          [['empID','asc']],  
          {$inc: {'amount' : newAmount}}, 
          {}, 
          function(err, result) {
             res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
          });

});











router.delete('/deleteuser/:id', function(req, res) {
    var userToDelete = req.params.id;

    var collection = db.collection('employeecollection');
    collection.remove({ 'email' : userToDelete });

    var collection2 = db.collection('accountcollection');
    collection2.remove({'empID' : userToDelete});

    var collection3 = db.collection('topaycollection');
    collection3.remove({'empID' : userToDelete});
});











router.delete('/accepttimecard/:id', function(req, res) {
    var collection = db.collection('dailyTimeCards');
    var userToDelete = req.params.id;
    collection.remove({ 'email' : userToDelete });
});





router.post('/postponetimecard', function(req, res) {


    var userToUpdate = req.params.id;
    var collection = db.collection('dailyTimeCards');
    var post = req.body;


     collection.findAndModify(
          {"email": post.email}, 
          [['email','asc']],  
          {$set: {'rejected' : 1}}, 
          {}, 
          function(err, result) {
             res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
          });
});












































module.exports = router;