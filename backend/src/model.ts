import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    privateKey:String,
    publicKey:String
})

export const userModel =mongoose.model("users",UserSchema);