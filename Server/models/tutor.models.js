const mongoose = require("mongoose");

// Define the schema
const tutorSchema = new mongoose.Schema({
    tName: {
        type: String,
        required: true
    },
    tPhoneNumber: {
        type: String,
        required: true
    },
    tDob: {
        type: Date,
        required: true,
       
    },
    tAddress: {
        type: String,
        required: true
    },
    tNic: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    tSubject: {
        type: Number,
        required: true
    },
   
});

// Create the model
const tutor = mongoose.model("tutor", tutorSchema);

// Export the model
module.exports = tutor;
