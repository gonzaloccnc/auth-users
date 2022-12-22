import { Router } from 'express'
import { getUsers, createUser } from '../../controllers/UserController'

const userRouter = Router()

userRouter.get('/users', getUsers)

userRouter.post('/users', createUser)

export default userRouter
