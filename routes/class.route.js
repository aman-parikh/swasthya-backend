const classController = require('../controllers/class.controller')
const router = require('express').Router()

router.route('/').post(classController.createClass).get(classController.getClass).patch(classController.editClass)
router.route('/query').get(classController.queryClasses)

module.exports = router