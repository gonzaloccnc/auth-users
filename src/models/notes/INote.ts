import { Document } from 'mongoose'

interface INote extends Document {
  description: string,
}

export default INote
