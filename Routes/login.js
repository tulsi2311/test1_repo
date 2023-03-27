const express = require("express")
const app = express();
const router = express.Router()

const {login,kakaLogin,login2 } = require('../Controller/loginController')

router.route('/login').get(login)
router.route('/login/index5').get(login2)
router.route('/login').post(kakaLogin)

module.exports = router