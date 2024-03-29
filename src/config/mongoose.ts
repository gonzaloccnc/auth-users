import 'dotenv/config'
import { connect } from 'mongoose'

const cnx = async (): Promise<void> => {
  await connect(process.env.URI_MONGO)
}

export default cnx
