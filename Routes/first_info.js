const express = require("express")
const app = express();
const router = express.Router()

const {user_info} = require('../Controller/first_infoController')


router.route('/pro_info').post(user_info)

module.exports = router