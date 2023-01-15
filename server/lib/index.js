"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const UserRoutes_1 = require("./routes/UserRoutes");
const AuthRoutes_1 = require("./routes/AuthRoutes");
const TransactionRoutes_1 = require("./routes/TransactionRoutes");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// routes
app.use('/users', UserRoutes_1.UserRouter);
app.use('/auth', AuthRoutes_1.AuthRouter);
app.use('/transaction', TransactionRoutes_1.TransactionRouter);
// default page
app.get('/', (req, res) => {
    res.send('home');
});
mongoose_1.default
    .connect(process.env.MONGO)
    .then(() => {
    console.log('database connected');
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`server connected on ${port}`);
});
