import IUser from '../models/users/IUser'
import User from '../models/users/User'

/**
 * @description returns array of users
 */
const findAllUsers = async (): Promise<IUser[]> => await User.find({})

/**
 * @param email
 * @param password
 * @returns one user finded or null
 */

export { findAllUsers }
