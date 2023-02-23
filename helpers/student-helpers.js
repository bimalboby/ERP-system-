var db =require('../config/connection')
var collection=require('../config/collections')

const bcrypt=require('bcrypt')

module.exports={
    doLogin:(userData)=>{
      
        let status=false
            if(userData.email=="student007@gmail.com"&&userData.password=="12345")
            {
                status=true
            }
            else{
                status=false
    
            }
            
            return status
          
        },
   

}