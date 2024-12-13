const mongoose = require("mongoose");

const loginAdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
const loginAdminModel = new mongoose.model("loginAdmin", loginAdminSchema);
module.exports = loginAdminModel;