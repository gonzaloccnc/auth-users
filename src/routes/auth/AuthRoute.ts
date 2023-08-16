import { Router } from 'express'
import { authUserCredentials } from '../../controllers/AuthController'
import { createUser } from '../../controllers/UserController'

const authRouter = Router()

authRouter.post('/auth/login', authUserCredentials)

authRouter.post('/auth/register', createUser)

export default authRouter
