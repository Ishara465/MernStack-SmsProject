const mongoose = require("mongoose");


const classMGSchema = new mongoose.Schema({

    _id:{
        type: Number,
        required: true,
    },
    cId:{
        type: Number,
        required: true,
    },
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
        type:Date,
        required:true
    },
    endTime:{
        type:Date,
        required:true,
    },
    classRoom:{
        type:String,
        required:true,
    }
})

classMGSchema.pre("validate",async function(next){
    if(this.isNew){
        try{
            const lastClasses = await mongoose
                .model("classMg")
                .findOne({})
                .sort({_id:-1})

            const nextId =lastClasses ? lastClasses._id +1:1;
            this._id = nextId;
            this.cId = nextId;
        }catch(err){
            return next(err)
        }
    }
    next();
})


const classMGModel = mongoose.model("classMg",classMGSchema);
module.exports = classMGModel;