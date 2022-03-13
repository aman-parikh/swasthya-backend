const User = require('../models/user.model')

const getUserByEmail = async (email) => {
  try {
    return await User.findOne({ email: email })
  }
  catch (err) {
    console.error(err)
    return { "error": err }
  }
}

const createUser = async (userBody) => {
  try {
    return await User.create(userBody)
  }
  catch (err) {
    console.error(err)
    return { "error": err }
  }
}


const getUserById = async (userId) => {
  try {
    return await User.findOne({ _id: userId })
  }
  catch (err) {
    console.error(err)
    return { "error": err }
  }
}

const getUsers = async (filter, options) => {
  try {
    return await User.find(filter)
  }
  catch (err) {
    console.error(err)
    return [{ "error": err }]
  }
}

const editUserById = async (userId, userBody) => {
  try {
    return User.findOneAndUpdate({ _id: userId }, userBody, { new: true })
  }
  catch (err) {
    console.error(err)
    return null
  }
}

module.exports = {
  createUser, editUserById, getUsers, getUserById, getUserByEmail
}