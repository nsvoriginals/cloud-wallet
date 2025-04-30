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
const config_1 = __importDefault(require("./db/config"));
const model_1 = require("./model");
const web3_js_1 = require("@solana/web3.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, config_1.default)();
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return;
    }
    const keypair = new web3_js_1.Keypair();
    const user = yield model_1.userModel.create({
        username,
        password,
        publickey: keypair.publicKey.toString(),
        privatekey: keypair.secretKey.toString()
    });
    res.json({
        message: keypair.publicKey.toString()
    });
}));
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: "signin"
    });
}));
app.post('/api/v1/txn', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: "signup"
    });
}));
app.post('/api/v1/txn/sign', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: "signup"
    });
}));
app.listen(3000, () => {
    console.log("Server is running");
});
