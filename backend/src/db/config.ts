import mongoose from "mongoose";

export default async  function connectDB(){
   const connection= await mongoose.connect('mongodb://localhost:27017/cloudwallet')
   if(connection){
    console.log("MongoDB Connected")
   }
   else{
    console.log("MongoDb Connection Error ")
   }
}


