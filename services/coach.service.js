const Coach = require('../models/class.model')

const create = async (body) => {
  try {
    return await Coach.create(body)
  }
  catch (err) {
    console.error(err)
    return { "error": err.message || err }
  }
}

const editById = async (id, body) => {
  try {
    return await Coach.findOneAndUpdate({ "_id": id }, body, { new: true })
  }
  catch (err) {
    console.error(err)
    return { "error": err.message || err }
  }
}

const getById = async (id) => {
  try {
    return await Coach.findOne({ _id: id })
  }
  catch (err) {
    console.error(err)
    return { "error": err.message || err }
  }
}

const query = async (filter, options) => {
  try {
    return await Coach.find(filter)
  }
  catch (err) {
    console.error(err)
    return [{ "error": err.message || err }]
  }
}

const getByFirebase = async (id) => {
  try {
    return await Coach.findOne({ "firebaseUid": id })
  }
  catch (err) {
    console.error(err)
    return { "error": err.message || err }
  }
}

module.exports = { create, editById, getById, query, getByFirebase }