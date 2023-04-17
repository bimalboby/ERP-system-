var db =require('../config/connection')
var collection=require('../config/collections')

const bcrypt=require('bcrypt')
const { ObjectId } = require('mongodb')
const { rawListeners } = require('../app')

module.exports={
    doLogin:(userData)=>{
      
       
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.STUDENT_DATA).find({email:userData.email,pass:parseInt(userData.password)}).toArray().then((tec)=>
            {
                
                
                if(tec.length>0)
                {
                    resolve({tec,status:true})
                }
              

            })
            resolve({status:false})


            })



        
           
          
        },

        getMyMarks:(regNo)=>{
            return new Promise(async(resolve,reject)=>{
                regNo=3651
                let MarkDetails=[]
                await db.get().collection(collection.MARKS_DATA).find({reg:regNo}).toArray().then(async(marks)=>
                {
                    
                    console.log("MARKS");
                 console.log(marks);
                 
                 for (let i = 0; i < marks.length; i++)
                 {
                     await db.get().collection(collection.SUBJECTS).findOne({_id:ObjectId(marks[i].subjectId)}).then((a)=>
                     {
     
                       let obj={
                         reg:marks[i].reg,
                         subName:a.name,
                         mark:marks[i].MarkSheet
                       }
                       MarkDetails.push(obj)
 
     
                      
     
                     })
                 
                }
                resolve(MarkDetails)

                })
                
    
    
                })
    

        },
        getMyAttendance:(regNo)=>{
            return new Promise(async(resolve,reject)=>{
                regNo=5554
                let AttendanceDetails=[]
                await db.get().collection(collection.ATTENDANCE_DATA).find({reg:regNo}).toArray().then(async(att)=>
                {

                 console.log(att);
               for (let i = 0; i < att.length; i++)
                {
                    await db.get().collection(collection.SUBJECTS).findOne({_id:ObjectId(att[i].subjectId)}).then((a)=>
                    {
    
                      let obj={
                        subName:a.name,
                        attendance:att[i].attendance
                      }
                      AttendanceDetails.push(obj)

    
                     
    
                    })
                
               }
               resolve(AttendanceDetails)

                 

                })
                
    
    
                })
    

        }
   

}