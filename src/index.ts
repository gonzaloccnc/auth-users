import 'dotenv/config'
import express from 'express'
import cnx from './config/mongoose'
import userRouter from './routes/user/User'
import cors from 'cors'
import noteRouter from './routes/note/NoteRoute'
import authRouter from './routes/auth/AuthRoute'
import { authMiddleware } from './middlewares/validateAccess'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/images', express.static('src/images'))

/* public routes */

app.use('/api', authRouter)

/* private routes */
app.use(authMiddleware)

app.use('/api', userRouter)
app.use('/api', noteRouter)

const server = app.listen(PORT, async () => {
  try {
    await cnx()
    console.log('Database connected successful')
    console.log(`Server running on port ${PORT}`)
  } catch (err) {
    if (err instanceof Error) console.error(err.message)
    else console.error({ message: 'Unknown error' })
    server.close()
  }
})
