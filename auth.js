const {UserModel} = require("./model")
require("dotenv").config()
const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const token = req.query.token
    // console.log(token)
    if(!token){
        res.send("please login first")
    }
    else{
        jwt.verify(token, process.env.SECRET_KEY, async function(err, decoded) {
            if(err){
                res.send("please login")
            }
            else{
                const userId = decoded.userId
                req.userId = userId
                next()
            }
          });
    }
}


module.exports = {auth}