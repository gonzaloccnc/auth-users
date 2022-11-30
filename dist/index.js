"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("./config/mongoose"));
const User_1 = __importDefault(require("./routes/user/User"));
const cors_1 = __importDefault(require("cors"));
const NoteRoute_1 = __importDefault(require("./routes/note/NoteRoute"));
const AuthRoute_1 = __importDefault(require("./routes/auth/AuthRoute"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/images', express_1.default.static('src/images'));
app.use('/api', AuthRoute_1.default);
app.use('/api', User_1.default);
app.use('/api', NoteRoute_1.default);
app.listen(PORT, async () => {
    try {
        await (0, mongoose_1.default)();
        console.log('Database connected successful');
    }
    catch (err) {
        if (err instanceof Error)
            console.error(err.message);
        else
            console.error({ message: 'Unknown error' });
    }
    console.log(`Server running on port ${PORT}`);
});
