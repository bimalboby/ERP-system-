
var express = require('express');
const { faqLoader } = require('../helpers/principal-helpers');
const student=require('../helpers/student-helpers')
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('student-login.hbs')
});
router.post('/login', function(req, res, next) {
    console.log(req.body);
let loginStatus=student.doLogin(req.body)
   if(loginStatus==true)
   {
       console.log("SUCCESS");
    
       res.render('student.hbs')
   }else
   {
       console.log("LOGIN FAILED");
   
   }


});
router.get('/time-table', function(req, res, next) {
    res.render('time-table.hbs')
  });
  router.get('/marksheet', function(req, res, next) {
    res.render('marksheet.hbs')
  });


module.exports = router;
