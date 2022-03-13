const userService = require('../services/user.service')
const { errorHandler } = require('../utils/error-handler')
const Error = require('../utils/error')
const { pick } = require('../utils/pick')
const { checkString } = require('../utils/checks')

const createUser = errorHandler(async (req, res) => {
  if (req.body && req.body.email && req.body.name) {
    req.body["isActive"] = true
    let newUser = await userService.createUser(req.body)
    if (newUser && newUser["error"]) {
      throw new Error(newUser["error"], 500, null)
    }
    else if (newUser) {
      return res.status(200).json({ result: newUser })
    }
    else {
      throw new Error("New user could not be created", 500, null)
    }
  }
  else throw new Error("Bad Request: Fill in the details properly", 400, null)
})

const editUserById = errorHandler(async (req, res) => {
  if (req.query && checkString(req.query.userId)) {
    let user = await userService.editUserById(req.query.userId, req.body)
    if (user && user["error"]) {
      throw new Error(user["error"], 500, null)
    }
    else if (user) {
      return res.status(200).json({ result: user })
    }
    else {
      throw new Error("New user could not be created", 500, null)
    }
  }
  else throw new Error("Bad Request: Fill in the details properly", 400, null)
})

const getOneUser = errorHandler(async (req, res) => {
  if (req.query) {
    let filter = pick(req.query, ["email", "userId"])
    let user = null
    if (filter["userId"]) {
      user = await userService.getUserById(filter["userId"])
      if (user && user["error"]) {
        throw new Error(user["error"], 500, null)
      }
      else if (user) {
        return res.status(200).json({ result: user })
      }
      throw new Error("Bad Request: Fill in the details properly", 400, null)
    }
    else if (filter["email"]) {
      user = await userService.getUserByEmail(filter["email"])
      if (user && user["error"]) {
        throw new Error(user["error"], 500, null)
      }
      else if (user) {
        return res.status(200).json({ result: user })
      }
      throw new Error("Bad Request: Fill in the details properly", 400, null)
    }
    throw new Error("An unkown error occurred", 500, null)
  }
  throw new Error("Bad Request: Fill in the details properly",400, null)
})

module.exports = {
  createUser, editUserById, getOneUser
}