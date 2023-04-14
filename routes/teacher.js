const { response } = require('express');
var express = require('express');
var router = express.Router();
var teacher=require('../helpers/teacher-helpers')
var principal=require('../helpers/principal-helpers')



/*_________ROUTS_________*/
router.get('/', function(req, res, next) {
console.log("teacher");
res.render('teacher-login.hbs')
  
  });
  router.post('/login', function(req, res, next) {
    console.log(req.body);
teacher.doLogin(req.body).then((r)=>{
  console.log(r);
  if(r.status===true)
  {
      console.log("SUCCESS");
   
      res.render('teacher.hbs')
  }else
  {
      console.log("LOGIN FAILED");
  
  }


})
  

});
router.get('/view-students', function(req, res, next) {
  principal.viewStudents().then((students)=>{
    res.render('view-Students-in-teachers.hbs',{students})

  })

  
    
    });
router.get('/attendance-form', function(req, res, next) {

  res.render('attendance-form.hbs')
    
    });
    router.post('/data-for-attendance', function(req, res, next) {

      res.render('attendance-sheet.hbs')
        
        });


  router.get('/apply-leave-form', function(req, res, next) 
  {
    res.render('apply-leave-form.hbs')
      
      });
  router.post('/apply-leave', function(req, res, next) 
      {
        console.log(req.body);
        principal.applyLeave(req.body)
          
          });
    
     
 
 
module.exports = router;
