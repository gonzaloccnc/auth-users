import { Request, Response, response } from 'express'
import { createNote, findAllNotes } from '../services/NoteService.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await findAllNotes()
    res.json(notes)
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message })
  }
}

export const createNewNote = async (req: Request, res: Response) => {
  const { description } = req.body

  try {
    const authorization = req.get('authorization')
    let token: string | null = null
    let decodedToken: any | null = null

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7)
      decodedToken = jwt.verify(token, process.env.SECRET_WORD as string)
    } else {
      throw Error('authorization is required')
    }

    if (!token || !decodedToken?.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const newNote = await createNote({ description })
    res.json(newNote)
  } catch (err) {
    if (err instanceof Error) res.status(401).json({ message: err.message })
  }
}
