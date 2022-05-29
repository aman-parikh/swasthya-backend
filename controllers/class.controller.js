const coachService = require('../services/coach.service')
const pick = require('../utils/pick')
const { errorHandler } = require('../utils/error-handler')
const Error = require('../utils/error')
const { checkString } = require('../utils/checks')
const classService = require('../services/class.service')

const deleteClass = errorHandler(async (req, res) => {
  if (req.query && checkString(req.query.classId)) {
    let myClass = await classService.deleteClass(req.query.classId)
    if (myClass && myClass["error"]) {
      throw new Error(newClass["error"], 500, null)
    }
    else if (myClass)
      return res.status(200).json({ result: myClass })
    else
      throw new Error("Unknown Error", 500, null)
  }
  else throw new Error("Bad Request: Fill in the details properly", 400, null)
})

const createClass = errorHandler(async (req, res) => {
  if (req.body && checkString(req.body.coachId) && req.body.plan) {
    let newClass = await classService.createClass(req.body)
    if (newClass && newClass["error"]) {
      throw new Error(newClass["error"], 500, null)
    }
    else if (newClass) {
      const coachId = req.body.coachId

      const overlap = await coachService.checkAvailability(coachId, req.body.plan)

      if (overlap) {
        await classService.deleteClass(newClass["_id"])
        throw new Error('Class already exists on at least one of the chosen days', 500, null)
      }
      else if (overlap && overlap["error"]) {
        throw new Error(overlap["error"], 500, null)
      }

      for (const tuple of req.body.plan) {
        await coachService.addAClassInSchedule(coachId, newClass["_id"], tuple[0], tuple[1])
      }
      return res.status(200).json({ result: newClass })
    }
    else throw new Error("Unknown Error", 500, null)
  }
  else throw new Error("Bad Request: Fill in the details properly", 400, null)
})

const editClass = errorHandler(async (req, res) => {
  if (req.query && checkString(req.query.classId)) {
    let myClass = await classService.editClass(req.query.classId, req.body)
    if (myClass && myClass["error"]) {
      throw new Error(newClass["error"], 500, null)
    }
    else if (myClass)
      return res.status(200).json({ result: myClass })
    else
      throw new Error("Unknown Error", 500, null)
  }
  else throw new Error("Bad Request: Fill in the details properly", 400, null)
})

const getClass = errorHandler(async (req, res) => {
  if (req.query && checkString(req.query.classId)) {
    let myClass = await classService.getClass(req.query.classId)
    if (myClass && myClass["error"]) {
      throw new Error(myClass["error"], 500, null)
    }
    else if (myClass)
      return res.status(200).json({ result: myClass })
    else
      throw new Error("Unknown Error", 500, null)
  }
  else throw new Error("Bad Request: Fill in the details properly", 400, null)
})

const queryClasses = errorHandler(async (req, res) => {
  let options = pick(req.query, ["pageNum", "limit"])
  let filter = pick(req.query, ["coachId", "category", "equipmentRequired", "maxSize", "title"])
  if (!options["pageNum"]) {
    options["pageNum"] = 1
  }
  if (!options["limit"]) {
    options["limit"] = 6
  }
  let classes = await classService.queryClasses(filter, options)
  if (classes && classes.length > 0) {
    if (classes[0]["error"]) {
      throw new Error(classes[0]["error"], 500, null)
    }
    else res.status(200).json({ result: classes })
  }
  return res.json({ result: [] })
})

module.exports = {
  createClass, editClass, deleteClass, queryClasses, getClass
}