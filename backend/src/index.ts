import express,{ Request ,Response } from 'express';
import connectDB from './db/config';
import { userModel } from './model';
import { Keypair } from '@solana/web3.js';
import { Jwt } from 'jsonwebtoken';

const app=express();
app.use(express.json());

connectDB();
const JWT='Secre5'

app.post('/api/v1/signup',async (req:Request,res:Response)=>{
    const username=req.body.username;
    const password=req.body.password;
    if(!username || !password){
        return 
    }
     
    const keypair= new Keypair()
    const user=await userModel.create({
        username,
        password,
        publickey:keypair.publicKey.toString(),
        privatekey:keypair.secretKey.toString()

    })
  
   res.json({
    message:keypair.publicKey.toString()
   }) 
})
 

app.post('/api/v1/signin',async (req:Request,res:Response)=>{
    const username=req.body.username;
    const password=req.body.password;
    if(!username || !password){
        return 
    }
    const user=await userModel.findOne({
        username:username,
        password:password
    })
    if(user){
        const token=jwt.sign({
            id:user
        })
    }
    res.json({
     message:"signin"
    })
 })



app.post('/api/v1/txn',async (req:Request,res:Response)=>{
    res.json({
     message:"signup"
    })
 })


app.post('/api/v1/txn/sign',async (req:Request,res:Response)=>{
    res.json({
     message:"signup"
    })
 })



 app.listen(3000,()=>{
    console.log("Server is running")
 })