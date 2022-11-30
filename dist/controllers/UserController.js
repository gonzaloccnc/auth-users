"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = void 0;
const UserService_1 = require("../services/UserService");
const User_1 = __importDefault(require("../models/users/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
/* bad returned users if only is for auth */
const getUsers = async (req, res) => {
    try {
        const users = await (0, UserService_1.findAllUsers)();
        res.json(users);
    }
    catch (err) {
        if (err instanceof Error)
            res.status(500).json({ message: err.message });
    }
};
exports.getUsers = getUsers;
const createUser = async (req, res) => {
    const { password, email, avatar, name } = req.body;
    try {
        const passwordHash = await bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.default({
            email,
            password: passwordHash,
            name,
            avatar: avatar || null
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
    }
    catch (err) {
        /* fix error type 500 */
        if (err instanceof Error)
            res.status(500).json({ message: err.message });
    }
};
exports.createUser = createUser;
