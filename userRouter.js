const express = require("express");
const userRouter = express.Router();
const {Usermodel} = require("./model")
const jwt = require("jsonwebtoken")
require("dotenv").config()




userRouter.post("/signup",async (req,res)=>{

   try {  
    const {name,email,password,confirmPassword} = req.body;
    if(password!==confirmPassword) {
        res.send("Both the passwords are not matching")
    }else {
        const user = new Usermodel({
                name,email,password,confirmPassword,
            })
            await user.save();
            res.send(`Hii ${name} Your Signup is Successfull ! Now Please Login`);
    }
    
   } catch (error) {
    console.log(error)
    res.send('Something Went Wrong !')
   }

})

userRouter.post("/login",async (req,res) => {
    const {email, password} = req.body;
    const user = await Usermodel.findOne({email,password})
    if(!user){
        res.send({"message" : "login failed, invalid credentials"})
    }
    else{
        const token = jwt.sign({userId:user._id},process.env.SECRET_KEY);
        res.send({"message" : "Login successfull", "token" : token})
    }
})

module.exports = {userRouter};