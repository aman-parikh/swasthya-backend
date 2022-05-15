const Coach = require('../models/coach.model')
const defaultWeeklySchedule = {
  "0": [null, null, null, null, null, null, null, null, null, null, null, null, null],
  "1": [null, null, null, null, null, null, null, null, null, null, null, null, null],
  "2": [null, null, null, null, null, null, null, null, null, null, null, null, null],
  "3": [null, null, null, null, null, null, null, null, null, null, null, null, null],
  "4": [null, null, null, null, null, null, null, null, null, null, null, null, null],
  "5": [null, null, null, null, null, null, null, null, null, null, null, null, null],
  "6": [null, null, null, null, null, null, null, null, null, null, null, null, null]
}

const create = async (body) => {
  try {
    body["weeklySchedule"] = defaultWeeklySchedule
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

const addAClassInSchedule = async (coachId, classId, day, index) => {
  try {
    let coachData = await Coach.getById(coachId)
    let { weeklySchedule } = coachData
    if(weeklySchedule[day][index])
      return {"error":"Class already exists"}
    weeklySchedule[day][index] = classId
    coachData[weeklySchedule] = weeklySchedule
    Object.assign(coachData.weeklySchedule[day], coachData.weeklySchedule[day][index])
    await coachData.save()
    return coachData
  }
  catch (e) {
    console.error(e)
    return { "error": e }
  }
}

const removeAClassFromSchedule = async (coachId, day, index) => {
  try {
    let coachData = await Coach.getById(coachId)
    let { weeklySchedule } = coachData
    weeklySchedule[day][index] = null
    coachData[weeklySchedule] = weeklySchedule
    Object.assign(coachData.weeklySchedule[day], coachData.weeklySchedule[day][index])
    await coachData.save()
    return coachData
  }
  catch (e) {
    console.error(e)
    return { "error": e }
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

module.exports = { create, editById, getById, query, getByFirebase, addAClassInSchedule, removeAClassFromSchedule }