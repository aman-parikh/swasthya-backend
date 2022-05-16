const Class = require('../models/class.model')
const coachService = require('../services/coach.service')

const createClass = async (classBody) => {
  try {
    let coach = await coachService.getById(classBody.coachId)
    if (coach != null)
      return await Class.create(classBody)
    else return { "error": "No coach with this id exists" }
  }
  catch (e) {
    console.error(e)
    return { "error": e }
  }
}

const getClass = async (classId) => {
  try {
    return await Class.findOne({ "_id": classId }).populate("coachId")
  }
  catch (e) {
    console.error(e)
    return { "error": e }
  }
}

const editClass = async (classId, classBody) => {
  try {
    return await Class.findOneAndUpdate({ "_id": classId }, classBody, { "new": true })
  }
  catch (e) {
    console.error(e)
    return { "error": e }
  }
}

const deleteClass = async (classId) => {
  try {
    return await Class.findOneAndDelete({ "_id": classId })
  }
  catch (e) {
    console.error(e)
    return { "error": e }
  }
}

const queryClasses = async (filter, options) => {
  try {
    return await Class.find(filter).skip(options.pageNum - 1).limit(options.limit).sort(options.sortBy).populate("coachId")
  }
  catch (e) {
    console.error(e)
    return [{ "error": e }]
  }
}

module.exports = { createClass, editClass, queryClasses, getClass }
