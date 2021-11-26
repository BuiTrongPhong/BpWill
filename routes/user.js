const express = require('express')
const UserController = require('../controllers/user')
const validSignUp = require('../middlewares/validSignUp')
const router = express.Router()

router.route('/register-user')
    .get(async (req, res) => {
        UserController.userRegister(req.body, 'user', res)
    })
router.route('/register-admin')
.get(async (req, res) => {
    UserController.userRegister(req.body, 'admin', res)
}) 
router.route('/login-user')
.get(async (req, res) => {
    UserController.userLogin(req.body, 'user', res)
}) 
router.route('/login-admin')
.get(async (req, res) => {
    UserController.userLogin(req.body, 'admin', res)
}) 
router.route('/profile')
.get(UserController.userAuth, async (req, res) => {
    return res.status(200).json(UserController.userProfile(req.user))
}) 
module.exports = router