var db =require('../config/connection')
var collection=require('../config/collections')
const { ObjectId } = require('mongodb');
const bcrypt=require('bcrypt')
const { ObjectID } = require('bson')
var nodemailer = require('nodemailer');

module.exports={

    doLogin:(userData)=>{
      
    let status=false
        if(userData.email=="principal007@gmail.com"&&userData.password=="12345")
        {
            status=true
        }
        else{
            status=false

        }
        
        return status
      
    },

    addpeople:(userData,type)=>{
        return new  Promise(async(resolve,reject)=>{
            let rnumber=Math.floor(Math.random() * 9000)+1000;
            let dataLocation
            let obj
            if(type=="teacher")
            {
  
                dataLocation=collection.TEACHER_DATA
                obj={
                   
                    subjects:userData.subject,
                    name:userData.name,
                    regNo:rnumber,
                    email:userData.email,
                    ph:parseInt(userData.ph),
                    genter:userData.genter,
                    address:userData.address,
                    classTeacher:false,
                    password:userData.pass
                    /////q
    
     
                }
            }
            else if(type=="student")
            {
                dataLocation=collection.STUDENT_DATA
                 obj={
                    regNo:rnumber,
                    name:userData.name,
                    genter:userData.genter,
                    class:"nil",
                    year:parseInt(userData.year),
                    subject:{},
                    email:userData.email,
                    ph:parseInt(userData.ph),
                    parentph:parseInt(userData.parentph),
                    fatherName:userData.fatherName,
                    motherName:userData.motherName,
                    address:userData.address,
    
     
                }
            }
            else{
                console.log("ERROR : WRONG PARAMETER TO FUNCTION ADD PEOPLE [ACCEPTED TYPE: teacher/student]");
            }
           
            console.log(obj);
            db.get().collection(dataLocation).insertOne(obj).then((data)=>{

                console.log(type+'Added successflly');
                
                resolve(obj)
            })
         
         
         
        })
    },
    getAllStudentsWithoutClass:(years)=>{
        return new Promise(async(resolve,reject)=>{
          await db.get().collection(collection.STUDENT_DATA).find({ class : "nil",year:parseInt(years)}).toArray().then((students)=>
           {
         console.log(students);
            resolve(students)
           })
        })
        },
    getAllTeachersWithoutClass:()=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.TEACHER_DATA).find({ classTeacher : false}).toArray().then((teachers)=>
            {

            resolve(teachers)
            })
        })
        },

    updateStudentClass:(data)=>{
        return new Promise(async(resolve,reject)=>{

            for (let i = 0; i < data.students.length; i++) 
            {
                await db.get().collection(collection.STUDENT_DATA).updateOne({regNo:parseInt(data.students[i])}, {$set:{"class": data.section}}).then((response)=>
                {
                console.log(response);
                resolve(response)
                })
                
            }
          
        })
        },
        updateTeacherClass:(data)=>{
            return new Promise(async(resolve,reject)=>{
    
            await db.get().collection(collection.TEACHER_DATA).updateOne({regNo:data}, {$set:{classTeacher:true}}).then((response)=>
            {
            console.log(response);
            resolve(response)
            })
     
            })
            },
    createClass:(data)=>{
        let s=[]
        for (let i = 0; i < data.students.length; i++) {
            s.push(parseInt(data.students[i]))
            
        }
        return new Promise(async(resolve,reject)=>{
        let rnumber=Math.floor(Math.random() * 9000)+1000;
        let obj=
        {
            classID:rnumber,
            teacherID:parseInt(data.teacher),
            year:parseInt(data.year),
            section:data.section,
            studentsID:s
        }
        db.get().collection(collection.CLASS).insertOne(obj).then((data)=>{

            console.log("class created successfully");
            
            resolve(obj)
        })
    
        })
        },
        viewStudents:()=>{
            return new Promise(async(resolve,reject)=>{
                await db.get().collection(collection.STUDENT_DATA).find().toArray().then((students)=>
                {
    
                    // console.log(students);
                resolve(students)
                })
            })

        },
        viewTeachers:()=>{
            return new Promise(async(resolve,reject)=>{
                await db.get().collection(collection.TEACHER_DATA).find().toArray().then((teachers)=>
                {
    
                    // console.log(students);
                resolve(teachers)
                })
            })

        },

        applyLeave:(data)=>{
            return new Promise(async(resolve,reject)=>{
                    let obj={
                        from:data.from,
                        till:data.till,
                        reason:data.message,
                        approve:false
                    }
             
                    await db.get().collection(collection.LEAVE).insertOne(obj).then((response)=>
                    {
                    console.log(response);
                    resolve(response)
                    })
                    
               
              
            })
            },
            viewAllLeaves:()=>{
                return new Promise(async(resolve,reject)=>{
                    console.log("called");
                  await db.get().collection(collection.LEAVE).find({ approve : false}).toArray().then((leaves)=>
                   {
                 console.log(leaves);
                    resolve(leaves)
                   })
                })
                },
        approveLeave:(id)=>{
            return new Promise(async(resolve,reject)=>{
                console.log(id);
                
                
                await db.get().collection(collection.LEAVE).updateOne({_id:ObjectId(id)}, {
                    $set:{
                        "approve":true
                    }
                }).then((response)=>
                    {
                    console.log(response);
                    resolve(response)
                    })
                    
                
                
            })
            },
            rejectLeave:(id)=>{
                return new Promise(async(resolve,reject)=>{
                    console.log(id);
                    
                    
                    await db.get().collection(collection.LEAVE).updateOne({_id:ObjectId(id)}, {
                        $set:{
                            "approve":"rejected"
                        }
                    }).then((response)=>
                        {
                        console.log(response);
                        resolve(response)
                        })
                        
                    
                    
                })
                },
            sentEmail:(toMail,subject,body)=>{
                var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'bimalboby007@gmail.com',
                  pass: 'zgliqvavgdhnocdj'
                }
              });
              
              var mailOptions = {
                from: 'bimalboby007@gmail.com',
                to: toMail,
                subject: subject,
                text: body
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
                },

            adddSubject:(data)=>{

                return new Promise(async(resolve,reject)=>{
                    let classRooms=[]
                    let sections=[]
                    let dataObj=[]
                    let obj
                                  
                    await db.get().collection(collection.CLASS).find({ year : parseInt(data.year)}).toArray().then((classData)=>
                        {
                        console.log(classData);
                        for (let i = 0; i < classData.length; i++) {
                            classRooms.push(classData[i].classID)
                            sections.push(classData[i].section)
                            
                        }
                        for (let j = 0; j < classRooms.length; j++) {
                        
                            let d={
                                name:data.name,
                                year:parseInt(data.year),
                                classID :classRooms[j],
                                section:sections[j],
                                teacherId:false
                            }
                            dataObj.push(d)
                            
                            
                            
                        }
                    
                        })
                        await db.get().collection(collection.SUBJECTS).insertMany(dataObj).then((response)=>
                        {
                        console.log(response);
                        resolve(response)
                        })
                   
                
                })

            },

            getAssignTeacherData:()=>{
                return new Promise(async(resolve,reject)=>{
      
                    await db.get().collection(collection.SUBJECTS).find().toArray().then((response)=>
                        {
                        console.log(response);
                        resolve(response)
                        })
                        
                    
                    
                })


            },

            appointChangeTeacher:(subject,teacherId)=>{
                return new Promise(async(resolve,reject)=>{
      
                    await db.get().collection(collection.SUBJECTS).updateOne({_id:ObjectId(subject)}, {
                        $set:{
                            "teacherId":teacherId
                        }
                    }).
                    then((response)=>
                        {
                        console.log(response);
                        resolve(response)
                        })
                        
                    
                    
                })


            },
            
            

           


 
            










        }