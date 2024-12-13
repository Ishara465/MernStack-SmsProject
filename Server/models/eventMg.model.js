const mongoose = require("mongoose");

const eventMgSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startDateTime: {
    type: Date,
    required: true,
  },
  endDateTime: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
const eventMgModel = mongoose.model("eventMg", eventMgSchema);
module.exports = eventMgModel;
