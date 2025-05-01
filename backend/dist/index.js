"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173'], // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
const JWT = 'Secre5';
const connection = new web3_js_1.Connection('https://api.devnet.solana.com', "confirmed");
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
app.post('/api/v1/txn/sign', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, pub } = req.body;
    const tx = web3_js_1.Transaction.from(Buffer.from(message.data, 'base64'));
    const signer = web3_js_1.Keypair.fromSecretKey(bs58_1.default.decode(process.env.PRI));
    tx.sign(signer);
    const signature = yield connection.sendTransaction(tx, [signer]);
    res.json({
        message: signature
    });
}));
app.post('/api/v1/txn', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const txn = req.body.message;
    console.log(txn);
    res.json({
        message: txn
    });
}));
app.listen(3000, () => {
    console.log("Server is running");
});
