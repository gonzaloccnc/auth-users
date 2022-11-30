"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const User_1 = __importDefault(require("../models/users/User"));
const authUser = async (email) => {
    return await User_1.default.findOne({ email });
};
exports.authUser = authUser;
