const bodyParser = require("body-parser");//
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//create login function
const path = require("path")
const bcrypt = require("bcrypt")


const app = express();

//convert data into json format
app.use(express.json());

//url encoded method
app.use(express.urlencoded({extended:false}))

// use EJS as the view engine
app.set("View engine","ejs")

app.get("/",(req,res) =>{
  res.render("login")
})

//import routers
const tutor = require('./routers/tutor.routers')
const studentMg = require('./routers/student.router')
const classMg = require('./routers/classManagement.router')
const eventMg = require('./routers/eventMg.router')
const login = require('./routers/loginAdmin.router');
const classFee = require('./routers/classFee.router')
//app middleware
app.use(bodyParser.json());
app.use(cors());

//use routes
app.use(tutor)
app.use(studentMg)
app.use(classMg);
app.use(eventMg)
app.use(login)
app.use(classFee)



//connect DB port and link
const PORT = 8000;
const DB_URL = "mongodb://127.0.0.1:27017/MernStDb";

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("smsDB is connected");
  })
  .catch((err) => console.log("smsDB connection Error", err));

app.listen(PORT, () => {
  console.log(`smsApp is running on ${PORT}`);
});
