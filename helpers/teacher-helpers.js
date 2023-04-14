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

    }

}