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
                    regNo:rnumber,
                    class:"nil",
                    email:userData.email,
                    ph:userData.ph,
                    fatherName:userData.fatherName,
                    motherName:userData.motherName,
                    address:userData.address,
    
     
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
    
    
           

        }