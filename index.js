const express = require("express");
require("dotenv").config()
const {userRouter} = require("./userRouter")
const {blogRouter} = require("./blogRouter")
const cors = require("cors")
const {auth} = require("./auth")

const connection = require("./db")

const app = express();
app.use(express.json())
app.use(cors()) ;
app.use("/user",userRouter)
app.use("/blog",auth,blogRouter)



app.listen(process.env.PORT,()=>{
    try {
        connection()
        console.log(`listening on ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
})