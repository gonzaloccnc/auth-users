"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewNote = exports.getNotes = void 0;
const express_1 = require("express");
const NoteService_1 = require("../services/NoteService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getNotes = async (req, res) => {
    try {
        const notes = await (0, NoteService_1.findAllNotes)();
        res.json(notes);
    }
    catch (err) {
        if (err instanceof Error)
            res.status(500).json({ message: err.message });
    }
};
exports.getNotes = getNotes;
const createNewNote = async (req, res) => {
    const { description } = req.body;
    try {
        const authorization = req.get('authorization');
        let token = null;
        let decodedToken = null;
        if (authorization && authorization.toLowerCase().startsWith('bearer')) {
            token = authorization.substring(7);
            decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_WORD);
        }
        else {
            throw Error('authorization is required');
        }
        if (!token || !decodedToken?.id) {
            return express_1.response.status(401).json({ error: 'token missing or invalid' });
        }
        const newNote = await (0, NoteService_1.createNote)({ description });
        res.json(newNote);
    }
    catch (err) {
        if (err instanceof Error)
            res.status(401).json({ message: err.message });
    }
};
exports.createNewNote = createNewNote;
