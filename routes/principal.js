
var express = require('express');
const { response } = require('../app');
const principal = require('../helpers/principal-helpers');
const { helpers } = require('handlebars');
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
            principal.viewStudents().then((students)=>{
                principal.viewTeachers().then((teachers)=>{
                    principal.viewAllLeaves().then((l)=>{
        
                    
                    res.render('principal.hbs',{students:students.length,teachers:teachers.length,leaves:l})
                })

                })
              
                
            })
            console.log("SUCCESS");
       
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
    let rnumber=Math.floor(Math.random() * 9000)+1000;
    let obj={
        subject:req.body.subject,
        name:req.body.name,
        pass:rnumber,
        email:req.body.email,
        ph:req.body.ph,
        address:req.body.address,
        genter:req.body.genter


    }
    principal.addpeople(obj,"teacher").then(()=>{
        principal.sentEmail(obj.email,"Appointed as Teacher",`Password for the login ${obj.pass}`)
    })
   });
   router.get('/create-class-form', function(req, res, next) {

    res.render('create-class-form.hbs')
   });

   router.post('/data-to-create-class', async(req,res)=> {
    let s=await principal.getAllStudentsWithoutClass(req.body.year)
    let t=await principal.getAllTeachersWithoutClass()
    console.log(s);
    console.log(t);
 
    res.render('view-students-teachers.hbs',{students:s,teachers:t})
    
   });
   router.post('/create-class', (req,res)=> {
    console.log(req.body);
   principal.createClass(req.body).then(async(response)=>{
    await principal.updateStudentClass(req.body)
    await principal.updateTeacherClass(req.body)
   })
    
   });
   router.get('/accept-leave/:id', function(req, res, next) {

     console.log(req.params.id);
     principal.approveLeave(req.params.id)
  
     principal.sentEmail("bimal.boby@btech.christuniversity.in","Leave Status","Your leave request has been approved")
   });

   router.get('/decline-leave/:id', function(req, res, next) {

    console.log(req.params.id);
    principal.approveLeave(req.params.id)
 
    principal.sentEmail("bimal.boby@btech.christuniversity.in","Leave Status","Sorry..Your leave request has been Rejected")
  });

  router.get('/add-subject-form', function(req, res, next) {
   

        res.render('add-subject.hbs')

  

   });

   router.post('/add-subject', function(req, res, next) {
  console.log(req.body);
  principal.adddSubject(req.body)
   res.render('add-subject.hbs')
  });

  




module.exports = router;
