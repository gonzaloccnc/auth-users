import { Router } from 'express'
import { getUsers } from '../../controllers/UserController'

const userRouter = Router()

userRouter.get('/users', getUsers)

export default userRouter
