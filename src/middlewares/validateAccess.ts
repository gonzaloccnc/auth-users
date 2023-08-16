import jwt from 'jsonwebtoken'
import { Handler } from '../utils/ServerPayloads'

export const authMiddleware: Handler<any, { error: string }> = (req, res, next) => {
  const authorization = req.get('Authorization')
  let token = ''

  if (authorization && authorization.startsWith('Bearer ')) {
    token = authorization.substring(7)
  }

  if (token === '') {
    return res.status(401).json({ error: 'token mising' })
  }

  let decodeToken = {}

  try {
    decodeToken = jwt.verify(token, process.env.SECRET_WORD)
    console.log('decode: ', decodeToken)
  } catch (ex) {
    let error = 'unknow error'
    if (ex instanceof (jwt.JsonWebTokenError || jwt.TokenExpiredError)) {
      error = ex.message
    }

    return res.status(401).json({ error })
  }

  next()
}
