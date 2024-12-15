const mongoose = require("mongoose");

const classFeeSchema = new mongoose.Schema({
    studentID: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true
    },
    
    paymentMonth: {
        type: Date,
        required: true
    },
    classFee: {
        type: Number,
        required: true
    },
   
});
const ClassFeeModel = mongoose.model("ClassFee", classFeeSchema);
module.exports = ClassFeeModel;
