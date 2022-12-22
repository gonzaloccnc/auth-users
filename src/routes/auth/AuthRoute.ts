import { Router } from 'express'
import { authUserCredentials } from '../../controllers/AuthController.js'

const authRouter = Router()

authRouter.post('/auth', authUserCredentials)

export default authRouter
