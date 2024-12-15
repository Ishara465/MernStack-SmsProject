const mongoose = require("mongoose");

const attendanceMg = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  attendanceDate: {
    type: Date,
    required: true,
  },
  attendanceTime: {
    type: String,
    required: true,
  },
  classId: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const attendanceModel = mongoose.model("attendanceMg", attendanceMg);
module.exports = attendanceModel;
