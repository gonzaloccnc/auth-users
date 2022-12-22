import { Schema, model } from 'mongoose'
import INote from './INote.js'

const noteSchemma = new Schema<INote>({
  description: { type: String, trim: true, required: true }
})

noteSchemma.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = model<INote>('Note', noteSchemma)

export default Note
