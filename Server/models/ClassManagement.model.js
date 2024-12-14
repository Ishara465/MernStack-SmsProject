const mongoose = require("mongoose");


const classMGSchema = new mongoose.Schema({
    className:{
        type:String,
        required:true,
    },
    classType:{
        type:String,
        required:true,
    },
   
    subject:{
        type:String,
        required:true,
    },

    tutor:{
        type:String,
        required:true
    },
    grade:{
        type:Number,
        required:true,
    },
    batch:{
        type:String,
        required:true,
    },
    classFee:{
        type:Number,
        required:true,
    },
    day:{
        type:Date,
        required:true
    },
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true,
    },
    classRoom:{
        type:String,
        required:true,
    }
})




const classMGModel = mongoose.model("classMg",classMGSchema);
module.exports = classMGModel;