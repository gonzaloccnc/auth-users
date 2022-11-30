"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNote = exports.findAllNotes = void 0;
const NoteModel_1 = __importDefault(require("../models/notes/NoteModel"));
const findAllNotes = async () => await NoteModel_1.default.find({});
exports.findAllNotes = findAllNotes;
const createNote = async (note) => {
    const newNote = new NoteModel_1.default({
        description: note.description
    });
    const noteSaved = await newNote.save();
    return noteSaved;
};
exports.createNote = createNote;
