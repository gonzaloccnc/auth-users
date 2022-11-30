"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../../controllers/AuthController");
const authRouter = (0, express_1.Router)();
authRouter.post('/auth', AuthController_1.authUserCredentials);
exports.default = authRouter;
