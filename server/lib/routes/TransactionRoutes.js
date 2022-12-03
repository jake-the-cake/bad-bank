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
exports.TransactionRouter = void 0;
const express_1 = __importDefault(require("express"));
const TransactionModel_1 = require("../models/TransactionModel");
const UserModel_1 = require("../models/UserModel");
const router = express_1.default.Router();
exports.TransactionRouter = router;
router.get('/viewall', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield TransactionModel_1.TransactionModel.find();
    res.status(200).json(transactions);
}));
router.delete('/deleteall', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accounts = Array.from(yield TransactionModel_1.TransactionModel.find());
    accounts.forEach(acct => acct.delete());
    res.send('gone?');
}));
router.post('/deposit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id, amount } = req.body;
    const resObj = { statusCode: 500 };
    try {
        const toAccount = yield UserModel_1.UserModel.findOne({ _id: id });
        const newTransaction = new TransactionModel_1.TransactionModel({
            from: {
                type: 'cash',
                id: 'cash',
                name: 'Internet Cash Account',
                balance: 1000000000
            },
            to: {
                "type": 'real',
                id,
                "name": (_a = toAccount === null || toAccount === void 0 ? void 0 : toAccount.username) !== null && _a !== void 0 ? _a : 'My B.A.D. Account',
                "balance": (_b = toAccount === null || toAccount === void 0 ? void 0 : toAccount.balance) !== null && _b !== void 0 ? _b : -1000000
            },
            amount,
            type: 'deposit'
        });
        resObj.data = newTransaction;
        toAccount === null || toAccount === void 0 ? void 0 : toAccount.transactions.unshift(resObj.data);
        newTransaction.save();
        toAccount === null || toAccount === void 0 ? void 0 : toAccount.update({
            balance: toAccount.balance += amount
        });
        toAccount === null || toAccount === void 0 ? void 0 : toAccount.save();
        resObj.statusCode = 201;
    }
    catch (err) {
        resObj.error = {
            type: 'SysErr',
            message: 'Server error occurred.'
        };
        console.error(err);
    }
    res.status(resObj.statusCode).json(resObj);
}));
router.post('/withdraw', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const { id, amount } = req.body;
    const resObj = { statusCode: 500 };
    try {
        const toAccount = yield UserModel_1.UserModel.findOne({ _id: id });
        const newTransaction = new TransactionModel_1.TransactionModel({
            from: {
                "type": 'real',
                id,
                "name": (_c = toAccount === null || toAccount === void 0 ? void 0 : toAccount.username) !== null && _c !== void 0 ? _c : 'My B.A.D. Account',
                "balance": (_d = toAccount === null || toAccount === void 0 ? void 0 : toAccount.balance) !== null && _d !== void 0 ? _d : -1000000
            },
            to: {
                type: 'cash',
                id: 'cash',
                name: 'Internet Cash Account',
                balance: 1000000000
            },
            amount,
            type: 'withdrawal'
        });
        resObj.data = newTransaction;
        toAccount === null || toAccount === void 0 ? void 0 : toAccount.transactions.unshift(resObj.data);
        newTransaction.save();
        toAccount === null || toAccount === void 0 ? void 0 : toAccount.update({
            balance: toAccount.balance -= amount
        });
        toAccount === null || toAccount === void 0 ? void 0 : toAccount.save();
        resObj.statusCode = 201;
    }
    catch (err) {
        resObj.error = {
            type: 'SysErr',
            message: 'Server error occurred.'
        };
        console.error(err);
    }
    res.status(resObj.statusCode).json(resObj);
}));
router.post('/transfer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g;
    const { idTo, idFrom, amount } = req.body;
    const resObj = { statusCode: 500 };
    try {
        const toAccount = yield UserModel_1.UserModel.findOne({ _id: idTo });
        const fromAccount = yield UserModel_1.UserModel.findOne({ _id: idFrom });
        const newTransaction = new TransactionModel_1.TransactionModel({
            from: {
                "type": 'real',
                "id": idFrom,
                "name": (_e = fromAccount === null || fromAccount === void 0 ? void 0 : fromAccount.username) !== null && _e !== void 0 ? _e : 'My B.A.D. Account',
                "balance": (_f = fromAccount === null || fromAccount === void 0 ? void 0 : fromAccount.balance) !== null && _f !== void 0 ? _f : -1000000
            },
            to: {
                type: 'real',
                id: idTo,
                name: toAccount === null || toAccount === void 0 ? void 0 : toAccount.username,
                balance: (_g = toAccount === null || toAccount === void 0 ? void 0 : toAccount.balance) !== null && _g !== void 0 ? _g : -1000000
            },
            amount,
            type: 'transfer'
        });
        resObj.data = newTransaction;
        toAccount === null || toAccount === void 0 ? void 0 : toAccount.transactions.unshift(resObj.data);
        fromAccount === null || fromAccount === void 0 ? void 0 : fromAccount.transactions.unshift(resObj.data);
        newTransaction.save();
        toAccount === null || toAccount === void 0 ? void 0 : toAccount.update({
            balance: toAccount.balance += amount
        });
        fromAccount === null || fromAccount === void 0 ? void 0 : fromAccount.update({
            balance: fromAccount.balance -= amount
        });
        toAccount === null || toAccount === void 0 ? void 0 : toAccount.save();
        fromAccount === null || fromAccount === void 0 ? void 0 : fromAccount.save();
        resObj.statusCode = 201;
    }
    catch (err) {
        resObj.error = {
            type: 'SysErr',
            message: 'Server error occurred.'
        };
        console.error(err);
    }
    res.status(resObj.statusCode).json(resObj);
}));
