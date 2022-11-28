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
const UserModel_1 = require("../models/UserModel");
const router = express_1.default.Router();
exports.UserRouter = router;
router.get('/viewall', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserModel_1.UserModel.find();
    res.status(200).json(users);
}));
router.post('/add', (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new UserModel_1.UserModel({
        username,
        email,
        password,
        balance: 0
    });
    newUser.save();
    res.status(201).json(newUser);
});
