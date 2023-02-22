const { response } = require('express');
var express = require('express');
var router = express.Router();
var teacher=require('../helpers/teacher-helpers')



/*_________ROUTS_________*/
router.get('/', function(req, res, next) {
console.log("teacher");
res.render('teacher-login.hbs')
  
  });
  router.post('/login', function(req, res, next) {
    console.log(req.body);
let loginStatus=teacher.doLogin(req.body)
   if(loginStatus==true)
   {
       console.log("SUCCESS");
       res.render('teacher.hbs')
   }else
   {
       console.log("LOGIN FAILED");
   
   }


});
 
 
module.exports = router;
