const coachService = require('../services/coach.service')
const pick = require('../utils/pick')
const { errorHandler } = require('../utils/error-handler')
const Error = require('../utils/error')
const { checkString } = require('../utils/checks')

const createCoach = errorHandler(async (req, res) => {
  if (req.body && req.body.email && req.body.firebaseUid && req.body.name) {
    let coach = await coachService.create(req.body)
    if (coach && coach["error"]) {
      throw new Error(coach["error"], 500, null)
    }
    else if (coach) {
      return res.status(200).json({ result: coach, error: null })
    }
    else throw new Error("Unknown Error", 500, null)
  }
  else throw new Error("Bad Request: Fill in the details properly", 400, null)
})

const editCoachById = errorHandler(async (req, res) => {
  if (req.query && checkString(req.query.coachId) && req.body){
    let coach = await coachService.editById(req.query.coachId, req.body.coachId)
    if (coach && coach["error"]) {
      throw new Error(coach["error"], 500, null)
    }
    else if (coach) {
      return res.status(200).json({ result: coach, error: null })
    }
    else throw new Error("Unknown Error", 500, null)
  }
  else throw new Error("Bad Request: Fill in the details properly", 400, null)
})

const queryCoaches = errorHandler(async(req, res)=>{
  let filter = pick(req.query, ["categories", "gender"])
  let coaches = await coachService.query(filter, null)
  if(coaches && coaches.length > 0) {
    if(coaches[0]["error"]){
      throw new Error(coaches[0]["error"], 500, null)
    }
    else return res.status(200).json({result: coaches})
  }
  else return res.status(200).json({result: []})
})

const getCoachById = errorHandler(async (req, res) => {
  let filter = pick(req.query, ["coachId", "firebaseUid"])
  if (filter.length > 0){
    if(filter["firebaseUid"]){
      let coach = await coachService.getByFirebase(filter["firebaseUid"])
      if (coach && coach["error"]) {
        throw new Error(coach["error"], 500, null)
      }
      else if (coach) {
        return res.status(200).json({ result: coach, error: null })
      }
      else throw new Error("Unknown Error", 500, null)
    }
    else if(filter["coachId"]){
      let coach = await coachService.getById(filter["coachId"])
      if (coach && coach["error"]) {
        throw new Error(coach["error"], 500, null)
      }
      else if (coach) {
        return res.status(200).json({ result: coach, error: null })
      }
      else throw new Error("Unknown Error", 500, null)
    }
    else throw new Error("Bad Request: Fill in the details properly", 400, null)
  }
  else throw new Error("Bad Request: Fill in the details properly", 400, null)
})

module.exports = { getCoachById, editCoachById, createCoach, queryCoaches}