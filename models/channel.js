const mongoose=require("mongoose")
const channelSchema=new mongoose.Schema({
    first:{
        type:String,
        required:true
    },
    last:{
        type:String,
        required:true
    }
})
const ChannelModel=mongoose.model("Channel",channelSchema)
module.exports =ChannelModel