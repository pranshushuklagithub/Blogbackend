const express = require("express");
const blogRouter = express.Router();
const {BlogModel} = require("./model")


blogRouter.get("/",async (req,res)=>{
   // console.log(req.query.category)
   const {category} = req.query
   const {author} = req.query

   

    try {  
      if(category!==undefined&&author!==undefined) {
         const blog = await BlogModel.find({category,author})
         res.send(blog)
      }else if(author===undefined && category) {
      const blog = await BlogModel.find({category})
      res.send(blog);
     }else if(category===undefined && author) {
      const blog = await BlogModel.find({author})
      res.send(blog);
     }else {
      const blog = await BlogModel.find()
      res.send(blog);
     }
    // console.log(product)
    } catch (error) {
     res.send('Something Went Wrong !')
    }
 })
 blogRouter.get("/:userId",async (req,res)=>{
    const {userId} = req.params
   //  console.log(userId)
    try {  
     const blog = await BlogModel.find({userId:userId})
     res.send(blog);
    // console.log(userId)
    } catch (error) {
     res.send('Something Went Wrong !')
    }
 })

 blogRouter.put("/:id",async (req,res)=>{
    // console.log(req.params)
    
    try {  
     const {title,category,author,content,image,userId} = req.body;
     const blog = await BlogModel.findByIdAndUpdate(req.params.id,{title,category,author,content,image,userId})
     res.send("Updated");
    // console.log("product")
    } catch (error) {
     res.send('Something Went Wrong !')
    }
 })


 blogRouter.post("/",async (req,res)=>{

    try { 
      
     const {title,category,author,content,image,userId} = req.body;
     const blog = new BlogModel({
      title,category,author,content,image,userId
     })
     await blog.save();
     res.send(`Your Blog Added Successfully !`);
    // console.log(req.body)
    } catch (error) {
     res.send('Something Went Wrong !')
    }
 })

 blogRouter.delete("/:id",async (req,res)=>{
    // console.log(req.params.id)
    
    try {  
     
     const product = await BlogModel.findOneAndDelete(req.params.id)
     res.send("Deleted Successfully!");
    // console.log(product)
    } catch (error) {
     res.send('Something Went Wrong !')
    }
 })


 module.exports = {blogRouter}