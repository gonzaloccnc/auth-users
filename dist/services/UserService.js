"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllUsers = void 0;
const User_1 = __importDefault(require("../models/users/User"));
/**
 * @description returns array of users
 */
const findAllUsers = async () => await User_1.default.find({});
exports.findAllUsers = findAllUsers;
