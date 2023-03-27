
const express = require("express")
const app = express();
const router = express.Router()

const {register,kaka,email,username,first } = require('../Controller/registerController')

router.route('/register').get(register)
router.route('/register/email').get(email)
router.route('/register/login_first').get(first)
router.route('/register/username').get(username)
router.route('/register').post(kaka)

module.exports = router