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
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const TransactionModel_1 = require("../models/TransactionModel");
const UserModel_1 = require("../models/UserModel");
const router = express_1.default.Router();
exports.UserRouter = router;
router.get('/viewall', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserModel_1.UserModel.find();
    res.status(200).json(users);
}));
router.delete('/deleteall', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accounts = Array.from(yield UserModel_1.UserModel.find());
    accounts.forEach(acct => acct.delete());
    res.send('gone?');
}));
router.post('/transactions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const transactions = yield TransactionModel_1.TransactionModel.find();
    const userTransactions = transactions.filter(t => t.to.id === id || t.from.id === id);
    res.status(200).json(userTransactions !== null && userTransactions !== void 0 ? userTransactions : null);
}));
router.post('/add', (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    const newUser = new UserModel_1.UserModel({
        username,
        email,
        password,
        balance: 0
    });
    newUser.save();
    res.status(201).json(newUser);
});
router.post('/one', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    const user = yield UserModel_1.UserModel.findOne({ _id });
    res.status(200).json(user);
}));
