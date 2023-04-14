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
      req.session.teacherId=r.tec[0]._id
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
  console.log("####");
  console.log(req.session.teacherId);

   teacher.getClass(req.session.teacherId).then((data)=>{
    console.log(data);
    res.render('attendance-form.hbs',{d:data})

   })

    
    });
    router.post('/data-for-attendance', function(req, res, next) {
     console.log(req.session.teacherId);
     console.log(req.body.year.length);
    let l=req.body.year.length
    console.log(req.body.year[l-1]);
    let sec=req.body.year[l-1]
    let newStr = req.body.year.replace(sec,'')
    console.log(parseInt(newStr));
    let year=parseInt(newStr)
    teacher.selectSubject(year,sec,req.session.teacherId).then((d)=>{
      console.log("CLASS ID #######");
      console.log(d[0].classID);
      teacher.selectClass(d[0].classID).then((f)=>{
        console.log(f);
        res.render('attendance-sheet.hbs')

      })


    })

        
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
