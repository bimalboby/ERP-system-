
var express = require('express');
const principal = require('../helpers/principal-helpers');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
 console.log("principal");
});

router.get('/login', function(req, res, next) {
   
    let loginStatus=principal.doLogin({email:"principal007@gmail.com",password:"12345"})
        if(loginStatus==true)
        {
            console.log("SUCCESS");
        }else
        {
            console.log("FAIL");
        }

   });
   router.get('/add-student', function(req, res, next) {
    let obj={
        regNo:"rnumber",
        email:"email",
        ph:"ph",
        year:2,
        parentph:"parentph",
        fatherName:"fatherName",
        motherName:"motherName",
        address:"address",


    }
    principal.addStudent(obj,"student")
   });

module.exports = router;
