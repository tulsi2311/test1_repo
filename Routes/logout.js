const express = require("express")
const app = express();
const router = express.Router()

const {logout } = require('../Controller/logoutController')

router.route('/logout').get(logout)


module.exports = router