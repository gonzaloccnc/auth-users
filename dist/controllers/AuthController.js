"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUserCredentials = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const AuthService_1 = require("../services/AuthService");
dotenv_1.default.config();
const authUserCredentials = async (req, res) => {
    const { email, password } = req.query;
    try {
        const user = await (0, AuthService_1.authUser)(email);
        const passwordCorrect = user === null
            ? false
            : await bcrypt_1.default.compare(password, user.password);
        if (!(user && passwordCorrect)) {
            res.status(401).json({ error: 'invalid user or password' });
        }
        else {
            const userToken = {
                id: user.id,
                email: user.email,
                name: user.name,
                avatar: user.avatar || null
            };
            const token = jsonwebtoken_1.default.sign(userToken, process.env.SECRET_WORD);
            res.json({
                email: user.email,
                token
            });
        }
    }
    catch (err) {
        if (err instanceof Error)
            res.status(500).json({ message: err.message });
    }
};
exports.authUserCredentials = authUserCredentials;
