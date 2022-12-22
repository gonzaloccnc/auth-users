import { Router } from 'express'
import { authUserCredentials } from '../../controllers/AuthController'

const authRouter = Router()

authRouter.post('/auth', authUserCredentials)

export default authRouter
