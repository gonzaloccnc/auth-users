import { Request, Response } from 'express'
import IUser from '../models/users/IUser.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { authUser } from '../services/AuthService.js'

dotenv.config()

export const authUserCredentials = async (req: Request, res: Response) => {
  const { email, password } = req.query

  try {
    const user: IUser | null = await authUser(email as string)
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password as string, user.password)

    if (!(user && passwordCorrect)) {
      res.status(401).json({ error: 'invalid user or password' })
    } else {
      const userToken = {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar || null
      }

      const token = jwt.sign(userToken, process.env.SECRET_WORD as string)

      res.json({
        email: user.email,
        token
      })
    }
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message })
  }
}
