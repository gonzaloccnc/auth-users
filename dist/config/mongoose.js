"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = require("mongoose");
const cnx = async () => {
    await (0, mongoose_1.connect)(process.env.URI_MONGO);
};
exports.default = cnx;
