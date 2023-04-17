const { response } = require('express');
var express = require('express');
var router = express.Router();
var teacher=require('../helpers/teacher-helpers')
var principal=require('../helpers/principal-helpers');
const { log } = require('handlebars');
var message=require('../helpers/message')


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
      res.render('teacher.hbs',{d:r.tec[0],notification:message.MESSAGE})
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
    let obj={}
     console.log(req.session.teacherId);
     console.log(req.body.year.length);
    let l=req.body.year.length
    console.log(req.body.year[l-1]);
    let sec=req.body.year[l-1]
    let newStr = req.body.year.replace(sec,'')
    console.log(parseInt(newStr));
    let year=parseInt(newStr)
    teacher.selectSubject(year,sec,req.session.teacherId).then((d)=>{
     obj={
      subjectName:d[0].name,
      subjectId:d[0]._id,
      c:d[0].year+d[0].section
     }

      console.log("CLASS ID #######");
      console.log(d[0].classID);
      teacher.selectClass(d[0].classID).then((f)=>{
        console.log(f);
        teacher.nameAndRegTaker(f).then((sheet)=>{
          req.session.AttentanceSubject=obj.subjectId
          req.session.ClassId=d[0].classID
          
          res.render('attendance-sheet.hbs',{d:obj,students:sheet})

        })
      })
 })
});


router.post('/submit-attendance', function(req, res, next) 
{  
  let ab
  let absent=[]
   console.log(req.session.AttentanceSubject,req.session.ClassId);
   console.log( typeof req.body.value);
   if(typeof req.body.value === "string")
   {
     ab=parseInt(req.body.value)
     absent.push(ab)
   }
   else
   {
    for (let i = 0; i < req.body.value.length; i++) 
    {
      absent.push(req.body.value[i])
     
    }
    console.log("ABSENT");
 
   
   }

   console.log(absent);
   teacher.selectClass(req.session.ClassId).then((regno)=>{
    teacher.attendance(absent,req.session.ClassId,req.session.AttentanceSubject,regno).then((r)=>{
      console.log(r.status);
    })
   })

});
router.get('/upload-marks-form', function(req, res, next) 
{
  
  console.log(req.params.id);
  console.log("####");
  console.log(req.session.teacherId);

   teacher.getClass(req.session.teacherId).then((data)=>{
    console.log(data);
    res.render('mark-form.hbs',{d:data})

   })

    
  });
  router.post('/data-for-marks', function(req, res, next) {
    let obj={}
     console.log(req.session.teacherId);
     console.log(req.body.year.length);
    let l=req.body.year.length
    console.log(req.body.year[l-1]);
    let sec=req.body.year[l-1]
    let newStr = req.body.year.replace(sec,'')
    console.log(parseInt(newStr));
    let year=parseInt(newStr)
    teacher.selectSubject(year,sec,req.session.teacherId).then((d)=>{
     obj={
      subjectName:d[0].name,
      subjectId:d[0]._id,
      c:d[0].year+d[0].section
     }

      console.log("CLASS ID #######");
      console.log(d[0].classID);
      teacher.selectClass(d[0].classID).then((f)=>{
        console.log(f);
        teacher.nameAndRegTaker(f).then((sheet)=>{
          req.session.MarkSubject=obj.subjectId
          req.session.ClassId=d[0].classID
          
          res.render('marks-sheet.hbs',{d:obj,students:sheet})

        })
      })
 })
});
router.post('/submit-marks', function(req, res, next) 
{
  console.log(req.body);
 
    // 'Exam Name': 'cia3',
    // reg: [ '3651', '8417', '5554' ],
    // nam: [ 'new1', 'new2', 'new3' ],
    // marks: [ '2', '43', '32' ]

  let  marks=[]
  let reg=[]
  for (let i = 0; i < req.body.reg.length; i++) 
  {
   marks.push(parseInt(req.body.marks[i]))
   reg.push(parseInt(req.body.reg[i]))
    
  }
  console.log(marks);
  console.log(reg);
  console.log(req.session.MarkSubject);
  console.log(req.session.ClassId);
  teacher.uploadMarks(reg,marks,req.body.ExamName,req.session.MarkSubject,req.session.ClassId).then((r)=>{
    console.log(r.status);
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
