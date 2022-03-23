const userController = require('../controllers/user.controller')
const router = require('express').Router()

router.route('/').post(userController.createUser).get(userController.getOneUser).patch(userController.editUserById)

router.route('/present').post(userController.checkUserPresent)

router.route('/logged').get(userController.checkLoggedIn)
router.route('/logout').get(userController.logOut)

module.exports = router