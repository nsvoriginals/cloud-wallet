import express,{ Request ,Response } from 'express';
import connectDB from './db/config';
import { userModel } from './model';
import { Connection, Keypair, Transaction } from '@solana/web3.js';
import jwt from 'jsonwebtoken'
import bs58 from 'bs58'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

import { textSpanContainsTextSpan } from 'typescript';
const app=express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'], // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

const JWT='Secre5'

const connection=new Connection('https://api.devnet.solana.com',"confirmed")

// app.post('/api/v1/signup',async (req:Request,res:Response)=>{
//     const username=req.body.username;
//     const password=req.body.password;
//     if(!username || !password){
//         return 
//     }
     
//     const keypair= new Keypair()
//     const user=await userModel.create({
//         username,
//         password,
//         publickey:keypair.publicKey.toString(),
//         privatekey:keypair.secretKey.toString()

//     })
  
//    res.json({
//     message:keypair.publicKey.toString()
//    }) 
// })
 

// app.post('/api/v1/signin',async (req:Request,res:Response)=>{
//     const username=req.body.username;
//     const password=req.body.password;
//     if(!username || !password){
//         return 
//     }
//     const user=await userModel.findOne({
//         username:username,
//         password:password
//     })
//     if(user){
//         const token=jwt.sign({
//             id:user
//         },'secr35')
//     }
//     res.json({
//      message:"signin"
//     })const txn=serializedTxn.
//  })



app.post('/api/v1/txn/sign',async (req:Request,res:Response)=>{
        const { message, pub } = req.body;

    const tx = Transaction.from(Buffer.from(message.data, 'base64'));
    const signer=Keypair.fromSecretKey(bs58.decode(process.env.PRI!))
    tx.sign(signer)

   const signature= await connection.sendTransaction(tx,[signer])
    res.json({
     message: signature
    })
 })
   




app.post('/api/v1/txn',async (req:Request,res:Response)=>{
    const txn=req.body.message;
    console.log(txn)
    res.json({
     message:txn
    })
 })




 app.listen(3000,()=>{
    console.log("Server is running")
 })


//todos

// 1. Add Login/Register 
// 2.Improove UI design of the project