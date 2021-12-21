const express = require('express')
const UserController = require('../controllers/user')
const validSignUp = require('../middlewares/validSignUp')
const router = express.Router()

router.route('/register-user')
    .post(async (req, res, next) => {
        try {
            UserController.userRegister(req.body, 'user', res)
        } catch (error) {
            next(error)
        }
    })
router.route('/register-admin')
    .post(async (req, res, next) => {
        try {
            UserController.userRegister(req.body, 'admin', res)
        } catch (error) {
            next(error)
        }
    })
router.route('/login-user')
    .post(async (req, res, next) => {
        try {
            UserController.userLogin(req.body, 'user', res)
        } catch (error) {
            next(error)
        }
    })
router.route('/login-admin')
    .post(async (req, res, next) => {
        try {
            UserController.userLogin(req.body, 'admin', res)
        } catch (error) {
            next(error)
        }
    })

router.route('/profile')
    .get(UserController.userAuth, async (req, res) => {
        return res.status(200).json(UserController.userProfile(req.user))
    })
module.exports = router