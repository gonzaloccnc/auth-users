import { Schema, model } from 'mongoose'
import IUser from './IUser.js'

const userSchemma = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  avatar: { type: String, trim: true }
})

userSchemma.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = model<IUser>('User', userSchemma)

export default User
