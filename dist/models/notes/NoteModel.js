"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const noteSchemma = new mongoose_1.Schema({
    description: { type: String, trim: true, required: true }
});
noteSchemma.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const Note = (0, mongoose_1.model)('Note', noteSchemma);
exports.default = Note;
