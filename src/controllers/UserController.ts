import { findAllUsers } from '../services/UserService'
import { Request, Response } from 'express'
import IUser from '../models/users/IUser'
import User from '../models/users/User'
import bcrypt from 'bcrypt'

/* bad returned users if only is for auth */
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await findAllUsers()
    res.json(users)
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message })
  }
}

export const createUser = async (req: Request, res: Response) => {
  const { password, email, avatar, name } = req.body
  try {
    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      email,
      password: passwordHash,
      name,
      avatar: avatar || null
    })

    const savedUser = await newUser.save()
    res.json(savedUser)
  } catch (err) {
    /* fix error type 500 */
    if (err instanceof Error) res.status(500).json({ message: err.message })
  }
}
