const express = require("express")
const app = express();
const router = express.Router()

const {likes2} = require('../Controller/likeController')

router.route('/likes2').get(likes2)


module.exports = router