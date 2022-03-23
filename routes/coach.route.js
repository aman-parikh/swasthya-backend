const coachController = require('../controllers/coach.controller')
const router = require('express').Router()

router.route('/').post(coachController.createCoach).get(coachController.getCoachById).patch(coachController.editCoachById)
router.route('/query').get(coachController.queryCoaches)

module.exports = router