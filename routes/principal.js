
var express = require('express');
const { response } = require('../app');
const principal = require('../helpers/principal-helpers');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
 console.log("principal");
 res.render('login.hbs')
});

router.post('/login', function(req, res, next) {
         console.log(req.body);
    let loginStatus=principal.doLogin(req.body)
        if(loginStatus==true)
        {
            console.log("SUCCESS");
            res.render('index.hbs')
        }else
        {
            console.log("LOGIN FAILED");
        }


   });
   router.get('/add-student', function(req, res, next) {
    console.log("principal");
    res.render('add-student.hbs')
   });
   router.post('/add-student', function(req, res, next) {
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
