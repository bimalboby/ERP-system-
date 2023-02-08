
var express = require('express');
const { response } = require('../app');
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
    principal.addpeople(obj,"student")
   });
   router.get('/add-teacher', function(req, res, next) {
    let obj={
        subjects:[],
        email:"userData.email",
        ph:"userData.ph",
        address:"userData.address",


    }
    principal.addpeople(obj,"teacher")
   });

   router.get('/data-to-create-class', async(req,res)=> {
    let students=await principal.getAllStudentsWithoutClass(2)
    let teachers=await principal.getAllTeachersWithoutClass()
    console.log(students);
    console.log(teachers);
    
   });
   router.get('/create-class', (req,res)=> {
   principal.createClass(obj).then(async(response)=>{
    await principal.updateStudentClass()
    await principal.updateTeacherClass()
   })
    
   });



module.exports = router;
