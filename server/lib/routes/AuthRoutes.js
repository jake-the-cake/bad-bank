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
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserModel_1 = require("../models/UserModel");
const router = express_1.default.Router();
exports.AuthRouter = router;
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const resObj = { statusCode: 500 };
    const foundUser = yield UserModel_1.UserModel.findOne().where({ email });
    switch (!foundUser) {
        case false:
            if (password === foundUser.password) {
                resObj.statusCode = 201;
                resObj.data = foundUser;
            }
            else {
                resObj.statusCode = 401;
                resObj.error = {
                    type: 'AuthErr',
                    message: 'Invalid password entered.'
                };
            }
            break;
        default:
            resObj.statusCode = 403;
            resObj.error = {
                type: 'NotFound',
                message: 'User not found.'
            };
            break;
    }
    if (resObj.statusCode === 500)
        resObj.error = {
            type: 'SysErr',
            message: 'Server error occurred.'
        };
    res.status(resObj.statusCode).json(resObj);
}));
