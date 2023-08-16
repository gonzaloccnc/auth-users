import 'dotenv/config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { authUser } from '../services/AuthService'
import { Data, Handler } from '../utils/ServerPayloads'

interface Credentials {
  email: string
  password: string
}

interface AuthJson {
  email: string
  token: string
}

export const authUserCredentials: Handler<Credentials, Data<AuthJson>> = async (req, res) => {
  const timeExp = 60 * 60 * 24 * 15
  const { email, password } = req.body

  try {
    const user = await authUser(email as string)
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password as string, user.password)

    if (!(user && passwordCorrect)) {
      res.status(401).json({ data: null, error: 'invalid user or password', status: 401 })
    } else {
      const claims = {
        id: user.id,
        sub: user.email,
        name: user.name,
        iat: new Date(Date.now()).getTime() / 1000,
        exp: (new Date(Date.now()).getTime() / 1000) + timeExp,
        avatar: user.avatar
      }

      const token = jwt.sign(claims, process.env.SECRET_WORD)

      res.json({
        data: {
          email: user.email,
          token
        },
        error: null,
        status: 200
      })
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        error: err.message,
        data: null,
        status: 500
      })
    }
  }
}
