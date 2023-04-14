var db =require('../config/connection')
var collection=require('../config/collections')

const bcrypt=require('bcrypt')

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
    


}