import IUser from '../models/users/IUser'
import User from '../models/users/User'

const authUser = async (email: String): Promise<IUser | null> => {
  return await User.findOne({ email })
}

export { authUser }
