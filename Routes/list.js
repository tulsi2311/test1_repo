const express = require("express")
const app = express();
const router = express.Router()

const {follower,following} = require('../Controller/followerController')

router.route('/follower').get(follower)
router.route('/following').get(following)

module.exports = router