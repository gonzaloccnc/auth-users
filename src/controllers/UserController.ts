import { findAllUsers } from '../services/UserService'
import { Request, Response } from 'express'
import IUser from '../models/users/IUser'
import User from '../models/users/User'
import bcrypt from 'bcrypt'
import { IRequestPayload } from '../utils/ServerPayloads'
import mongo from 'mongoose'
import jwt from 'jsonwebtoken'

interface UserCreateReq {
  password: string,
  email: string,
  avatar: string | null,
  name: string
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await findAllUsers()
    res.json(users)
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message })
  }
}

export const createUser = async (req: IRequestPayload<UserCreateReq>, res: Response) => {
  const timeExp = 60 * 60 * 24 * 15

  const { password, email, avatar, name } = req.body

  if (password === '' || password == null) {
    return res.status(400).json({ message: 'missing password' })
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      email,
      password: passwordHash,
      name,
      avatar
    })

    const token = jwt.sign({
      sub: email,
      name,
      iat: new Date(Date.now()).getTime() / 1000,
      exp: (new Date(Date.now()).getTime() / 1000) + timeExp
    }, process.env.SECRET_WORD)

    const savedUser = await newUser.save()

    res.json({ token, ...savedUser.toJSON() })
  } catch (err) {
    if (err instanceof mongo.Error) {
      return res.status(400).json({ message: err.message })
    } else if (err instanceof mongo.mongo.MongoServerError) {
      return res.status(400).json({ message: err.message })
    }
    console.log(err)
    return res.status(500).json({ message: 'A error ocurred in the server' })
  }
}
