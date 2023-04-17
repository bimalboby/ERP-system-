var db =require('../config/connection')
var collection=require('../config/collections')
const { ObjectId } = require('mongodb');

const { ObjectID } = require('bson')
const bcrypt=require('bcrypt');
const { logger } = require('handlebars');

module.exports={
    doLogin:(userData)=>{
      
       
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.TEACHER_DATA).find({email:userData.email,password:parseInt(userData.password)}).toArray().then((tec)=>
            {
                
                
                if(tec.length>0)
                {
                    resolve({tec,status:true})
                }
              

            })
            resolve({status:false})


            })



        
           
          
        },
    getStudensOfClass:()=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.CLASS).find({}).toArray().then((students)=>
            {

               
            resolve(students)
            })
        })

    },
    getClass:(id)=>{
        return new Promise(async(resolve,reject)=>{
            let classIds=[]
            await db.get().collection(collection.SUBJECTS).find({ "teacherId" : id}).toArray().then((c)=>
            {
             console.log(c);
             for (let i = 0; i < c.length; i++) {
                classIds.push(c[i].year + c[i].section)
                
             }
             console.log(classIds);
            resolve(classIds)
            })
        })
    },
    selectSubject:(y,sec,tId)=>{
        
        return new Promise(async(resolve,reject)=>{
           
            await db.get().collection(collection.SUBJECTS).find({ "teacherId" : tId, "section" :sec,"year":y}).toArray().then((c)=>
            {
             console.log(c);
             
            resolve(c)
            })
        })
    
    },

    selectClass:(cId)=>{
        return new Promise(async(resolve,reject)=>{
           
            await db.get().collection(collection.CLASS).find({ "classID" : cId}).toArray().then((c)=>
            {
             console.log(c[0].studentsID);
             
            resolve(c[0].studentsID)
            })
        })


    },

    nameAndRegTaker:(reg)=>{
        let sheet=[]
        return new Promise(async(resolve,reject)=>{
           
           for (let i = 0; i < reg.length; i++) 
           {
            await db.get().collection(collection.STUDENT_DATA).findOne({"regNo" : reg[i]}).then((c)=>
            {
            console.log("#############");
            console.log(c);
            let a={
                Name:c.name,
                Reg:c.regNo
            } 
            sheet.push(a)
            
            })
    
        
            
           }
           console.log(sheet);
           resolve(sheet)
        })


    },

    attendance:(data,c,subject,reg)=>{
        let classid=parseInt(c)
 
        // pop from reg::
        let status=false
         let absent=[]
        for (let i = 0; i < data.length; i++) 
       {
            absent.push(parseInt(data[i]))
            
        }
        console.log(reg);
        console.log(data);
          console.log("##########");
                 console.log("CLASSID ::" + classid);
                console.log("subjectID ::" + subject);
          console.log("Students ::" + reg);
          console.log("Absents :: "+ absent);
        //eligible students
        let eligibleForAttenfdance = reg.filter(element => !absent.includes(element));

         
        console.log(eligibleForAttenfdance);

       
        return new Promise(async(resolve,reject)=>{
           //updating total attendance

           await db.get().collection(collection.SUBJECTS).updateOne({_id:ObjectId(subject)}, 
           {
               $inc: {
                   "totalAttendance": 1
               }
           }
           ).then((r)=>
                {
                    console.log(r);
                  
                 
                })
         
        
            //finding eligible 
            let at =[]
            for (let k = 0; k < eligibleForAttenfdance.length; k++) 
            {
                let prt={
                    classId:classid,
                    reg:eligibleForAttenfdance[k],
                    subjectId:subject,
                    attendance:1
    
                }
                at.push(prt)
                
            }
            
       
            // present
            for (let l = 0; l < at.length; l++)
             {
                await db.get().collection(collection.ATTENDANCE_DATA).findOne({"classId" : classid,"reg":at[l].reg,"subjectId":subject}).then(async(stu)=>
                {
                    console.log(stu);
                    if(stu)
                    { 
                        console.log("Already there...increment");
                       await db.get().collection(collection.ATTENDANCE_DATA).updateOne({_id:ObjectId(stu._id)}, 
                        {
                            $inc: {
                                "attendance": 1
                            }
                        }
                        ).then((e)=>{
                            console.log(e);
                            status=true
                            return status
                            
                        })

                        
                    }
                   else
                    { 
                        console.log("not there ...create and give attendance");
                        await db.get().collection(collection.ATTENDANCE_DATA).insertOne(at[l]).then((r)=>{
                            console.log("=====student added and attendance given");
                        })
                        status=true
                     
    
                    }
                })
      
                
            }
            //absent 
            console.log("Absent...create and attendance 0"); 
            let nat =[]
            for (let k = 0; k < absent.length; k++) 
            {
                let abt={
                    classId:classid,
                    reg:absent[k],
                    subjectId:subject,
                    attendance:0
    
                }
                nat.push(abt)
                
            }
            console.log(nat);
            for (let l = 0; l < nat.length; l++)
            {
                await db.get().collection(collection.ATTENDANCE_DATA).findOne({"classId" : classid,"reg":nat[l].reg,"subjectId":subject}).then(async(stu)=>
                {
                    console.log(stu);
                    if(stu)
                    { 
                        console.log("Already there...no attendance");
                       status=true
                        
                        
                    }
                   else
                    { 
                              
                    await db.get().collection(collection.ATTENDANCE_DATA).insertOne(nat[l]).then((r)=>{
                                console.log("student added and attendance given");
                            })
                            status=true
                            
     
                    }
                })
      
         
            }

            resolve({status})
    })
    
},

 uploadMarks:(regNo,marks,examName,subjectID,classID)=>{
    let markObj=[]
    for (let i = 0; i < regNo.length; i++)
     {
       let obj={
        classId:classID,
        reg:regNo[i],
        subjectId:subjectID,
        MarkSheet:[
            {
                ExamName:examName,
                mark:marks[i]

            }
        ]
       }
       markObj.push(obj)
        
    }
    console.log(markObj);

    return new Promise(async(resolve,reject)=>
    {
        let status=false
           for (let i = 0; i < markObj.length; i++) 
           {
            await db.get().collection(collection.MARKS_DATA).findOne({ "classId" : classID,"subjectId":subjectID,"reg":markObj[i].reg}).then(async(c)=>
            {
              if(c)
              {
                //insert mark as onj to existing doc

                let obj={
                    ExamName:markObj[i].MarkSheet[0].ExamName,
                    mark:markObj[i].MarkSheet[0].mark
                }
              
                await db.get().collection(collection.MARKS_DATA).updateOne({ "classId" : classID,"subjectId":subjectID,"reg":markObj[i].reg},
                {
                    $push: { MarkSheet: obj }
                }).then((d)=>
                {
                  console.log("Marks Updated...");
                  status=true
              
                })


              }
              else
              {
                 // insert new doc
               
                await db.get().collection(collection.MARKS_DATA).insertOne(markObj[i]).then((d)=>
                  {
                    console.log("Marks Updated...");
                    status=true
                
                  })
              }
            })
            
           }
           resolve({status})
     
    })


}


    





}