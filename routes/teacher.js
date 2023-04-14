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
  console.log(r.tec[0]);
  if(r.status===true)
  {
      console.log("SUCCESS");
   
      res.render('teacher.hbs',{d:r.tec[0]})
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
router.get('/attendance-form/:id', function(req, res, next) {
  console.log(req.params.id);

   teacher.getClass(req.params.id).then((data)=>{
    console.log(data);
    res.render('attendance-form.hbs',{d:data})

   })

    
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
