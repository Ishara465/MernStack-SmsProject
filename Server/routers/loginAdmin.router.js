const express = require("express");
const loginAdmin = require("../models/loginAdmin.model");
const router = express.Router();


router.post("/smsBK/register",(req,res)=>{
    console.log("Received Data: ",req.body)
   loginAdmin.create(req.body)
   .then(user =>req.json(user))
   .catch(err=>res.json(err))
})


router.post("/smsBK/login",(req,res) =>{
    const{email,password} = req.body;
    loginAdmin.findOne({email:email})
    .then(user =>{
        if(user){
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("No record exited")
        }
    })
})
module.exports =router;