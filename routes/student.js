
var express = require('express');
const { faqLoader } = require('../helpers/principal-helpers');
const student=require('../helpers/student-helpers')
var router = express.Router();
var message=require('../helpers/message')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('student-login.hbs')
});
router.post('/login', function(req, res, next) {
  console.log(req.body);
  student.doLogin(req.body).then((r)=>{
console.log(r);
console.log(r.tec[0]);
if(r.status===true)
{
    console.log("SUCCESS");
    req.session.studentId=r.tec[0].regNo
    res.render('student.hbs',{notification:message.MESSAGE})
}else
{
    console.log("LOGIN FAILED");

}


})


});
router.get('/time-table', function(req, res, next) {
    res.render('time-table.hbs')
  });
  router.get('/attendance', function(req, res, next) {
    console.log(req.session.studentId);
    student.getMyAttendance(req.session.studentId).then((data)=>{
      console.log(data);
      res.render('view-attendance.hbs',{d:data})
    })

  });
  router.get('/marksheet', function(req, res, next) {
    console.log(req.session.studentId);
    student.getMyMarks(req.session.studentId).then((data)=>{
      console.log(data);
      res.render('marksheet.hbs',{d:data})
    })

  });


module.exports = router;
