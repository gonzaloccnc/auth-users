import { Router } from 'express'
import { getNotes, createNewNote } from '../../controllers/NoteControlles.js'

const noteRouter = Router()

noteRouter.get('/notes', getNotes)

noteRouter.post('/notes', createNewNote)

export default noteRouter
