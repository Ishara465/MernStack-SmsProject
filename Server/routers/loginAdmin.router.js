const express = require("express");
const loginAdmin = require("../models/loginAdmin.model");
const router = express.Router();
const bcrypt = require("bcrypt");

// ? signUp Routers 

router.get("/smsBK/signup",async (req, res) => {
    try{
        const{username,password} = req.body;

        if(!username || !password){
            return res.status(400).send("username and password is required")    
        }
        const existingUser = await loginAdmin.findOne({name:username});
        if(existingUser){
            return res.status(400).send("user already exists, Please choose deferent username");
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const userdata = await loginAdmin.create({name:username,password:hashedPassword});
        console.log(userdata);
        res.send("User registered successfully");

    }catch(err){
        console.error("Error during signup: ",err);
        res.status(400).send("An error occurred while signing up")

    }
})

// ? Login Routers
router.post("/smsBK/login", async(req,res) =>{
    try{
        const {username, password}=req.body;

        // TODO Check if the user exists
        const user = await loginAdmin.findOne({name:username});
        if(!user){
            return res.status(404).json({
                error:"Username not found"
            })
        }
        //TODO compare the password
        const isPasswordMatch = await bcrypt.compare(password,user.password)
        
        if(isPasswordMatch){
            return res.status(200).json({message:"Login successful",user: user.name});
        }else{
        return res.status(400).json({error:"Incorrect Password"})
        }

    }catch(err){
        console.error("Error during login: ",err)
        res.status(400).json({
            err:"Internal server Error"
        })
    }
})



module.exports =router;