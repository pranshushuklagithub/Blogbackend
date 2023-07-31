const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    confirmPassword:{type:String,required:true},
})

const blogSchema = mongoose.Schema({
    title:{type:String,required:true},
    category: {type:String,required:true , default:"Other"},
    author: {type:Number,required:true},
    content:{type:String,default:"See the Images carfully before buying"},
    image: {type:String,required:true},
    userId:{type:String}
})

const Usermodel = mongoose.model("user",userSchema)
const BlogModel = mongoose.model("blog",blogSchema)

module.exports={Usermodel,BlogModel};

