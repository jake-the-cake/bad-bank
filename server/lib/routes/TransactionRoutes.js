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
const UserModel_1 = require("../models/UserModel");
const router = express_1.default.Router();
exports.TransactionRouter = router;
router.get('/viewall', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserModel_1.UserModel.find();
    res.status(200).json(users);
}));
router.post('/deposit', (req, res) => {
    const { id } = req.body;
    const resObj = { statusCode: 500 };
    console.log(req.body);
    res.status(resObj.statusCode).json(resObj);
});
