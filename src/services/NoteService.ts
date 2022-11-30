import INote from '../models/notes/INote'
import Note from '../models/notes/NoteModel'

export const findAllNotes = async (): Promise<INote[]> => await Note.find({})

export const createNote = async (note: { description: string }): Promise<INote> => {
  const newNote = new Note({
    description: note.description
  })

  const noteSaved = await newNote.save()
  return noteSaved
}
