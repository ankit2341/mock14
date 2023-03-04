const mongoose=require("mongoose");
require("dotenv").config();
const connection=mongoose.connect(process.env.mongourl);

const userSchema=mongoose.Schema({
    Email:String,
    Password:String
})

const UserModel=mongoose.model("users",userSchema);

module.exports={
    connection,UserModel
}
