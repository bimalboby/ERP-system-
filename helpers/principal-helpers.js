var db =require('../config/connection')
var collection=require('../config/collections')

const bcrypt=require('bcrypt')

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
                   
                    subjects:[],
                    regNo:rnumber,
                    email:userData.email,
                    ph:userData.ph,
                    address:userData.address,
                    classTeacher:false
    
     
                }
            }
            else if(type=="student")
            {
                dataLocation=collection.STUDENT_DATA
                 obj={
                    regNo:rnumber,
                    class:"nil",
                    year:userData.year,
                    subject:{},
                    email:userData.email,
                    ph:userData.ph,
                    parentph:userData.parentph,
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
          await db.get().collection(collection.STUDENT_DATA).find({ class : "nil",year:years}).toArray().then((students)=>
           {
       
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

            for (let i = 0; i < data.reg.length; i++) 
            {
                await db.get().collection(collection.STUDENT_DATA).updateMany({class: "nil",regNo:data.reg[i]}, {$set:{class: data.className}}).then((response)=>
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
        return new Promise(async(resolve,reject)=>{
        let rnumber=Math.floor(Math.random() * 9000)+1000;
        let obj=
        {
            classID:rnumber,
            teacherID:data.teacherID,
            year:data.year,
            section:data.section,
            studentsID:data.studentsID
        }
        db.get().collection(collection.CLASS).insertOne(obj).then((data)=>{

            console.log("class created successfully");
            
            resolve(obj)
        })
    
        })
        },

        applyLeave:(data)=>{
            return new Promise(async(resolve,reject)=>{
                    let obj={
                        from:data.from,
                        till:data.till,
                        reason:data.reason,
                        approve:false
                    }
             
                    await db.get().collection(collection.LEAVE).insertOne(obj).then((response)=>
                    {
                    console.log(response);
                    resolve(response)
                    })
                    
               
              
            })
            },
        approveOrRejectLeave:(data,approvel)=>{
            return new Promise(async(resolve,reject)=>{
                
                
                await db.get().collection(collection.LEAVE).updateOne({_id:objectId(id)}, {
                    $set:{
                        "approve":approvel
                    }
                }).then((response)=>
                    {
                    console.log(response);
                    resolve(response)
                    })
                    
                
                
            })
            },



            
    
    
           

        }