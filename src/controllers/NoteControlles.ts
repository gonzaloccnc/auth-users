import jwt from 'jsonwebtoken'
import { createNote, findAllNotes } from '../services/NoteService'
import 'dotenv/config'
import { Data, Handler, Pagination } from '../utils/ServerPayloads'
import INote from '../models/notes/INote'

interface Body {
  description: string
}

export const getNotes: Handler<any, Pagination<INote>> = async (_, res) => {
  try {
    const notes = await findAllNotes()
    res.json({
      data: notes,
      status: 200,
      page: 0,
      pageSize: 0,
      hints: notes.length,
      pages: 0,
      prev: null,
      next: null,
      error: null
    })
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        data: null,
        error: err.message,
        status: 200,
        page: 0,
        pageSize: 0,
        hints: 0,
        pages: 0,
        prev: null,
        next: null
      })
    }
  }
}

export const createNewNote: Handler<Body, Data<INote>> = async (req, res) => {
  const { description } = req.body

  try {
    const authorization = req.get('Authorization')
    let token: string | null = null
    let decodedToken: any | null = null

    if (authorization && authorization.startsWith('Bearer')) {
      token = authorization.substring(7)
      decodedToken = jwt.verify(token, process.env.SECRET_WORD)
    } else {
      throw Error('authorization is required')
    }

    if (!token || !decodedToken?.id) {
      return res.status(401).json({
        error: 'token missing or invalid',
        status: 401,
        data: null
      })
    }

    const newNote = await createNote({ description })
    res.json({ error: null, status: 200, data: newNote })
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({
        error: err.message,
        status: 401,
        data: null
      })
    }
  }
}
