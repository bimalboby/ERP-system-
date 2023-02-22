
var express = require('express');
const { response } = require('../app');
const principal = require('../helpers/principal-helpers');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
 console.log("principal");
 res.render('principal-login.hbs')
});

router.post('/login', function(req, res, next) {
         console.log(req.body);
    let loginStatus=principal.doLogin(req.body)
        if(loginStatus==true)
        {
            console.log("SUCCESS");
            res.render('principal.hbs')
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
    console.log(req.body);

    principal.addpeople(req.body,"student")
    res.redirect('/')
   });
   router.get('/view-students', function(req, res, next) {
    principal.viewStudents().then((data)=>{
        console.log(data[0]);
        res.render('view-students.hbs',{students:data})
    })

   
   });
   router.get('/view-teachers', function(req, res, next) {
    principal.viewTeachers().then((data)=>{
        console.log(data[0]);
        res.render('view-teachers.hbs',{teachers:data})
    })

 
   });
   router.get('/add-teacher-form', function(req, res, next) {

    res.render('add-teacher.hbs')
   });
   router.post('/add-teacher', function(req, res, next) {
    console.log(req.body);
    let obj={
        subject:req.body.subject,
        name:req.body.name,
        email:req.body.email,
        ph:req.body.ph,
        address:req.body.address,
        genter:req.body.genter


    }
    principal.addpeople(obj,"teacher")
   });
   router.get('/create-class-form', function(req, res, next) {

    res.render('create-class-form.hbs')
   });

   router.post('/data-to-create-class', async(req,res)=> {
    let students=await principal.getAllStudentsWithoutClass(req.body.year)
    let teachers=await principal.getAllTeachersWithoutClass()
    console.log(students);
    console.log(teachers);
    let obj={
        students:students,
        teachers:teachers
    }
    res.render('view-students-teachers.hbs',students)
    
   });
   router.post('/create-class', (req,res)=> {
   principal.createClass(obj).then(async(response)=>{
    await principal.updateStudentClass()
    await principal.updateTeacherClass()
   })
    
   });



module.exports = router;
