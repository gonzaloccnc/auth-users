"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NoteControlles_1 = require("../../controllers/NoteControlles");
const noteRouter = (0, express_1.Router)();
noteRouter.get('/notes', NoteControlles_1.getNotes);
noteRouter.post('/notes', NoteControlles_1.createNewNote);
exports.default = noteRouter;
