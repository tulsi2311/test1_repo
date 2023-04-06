const express = require("express")
const app = express();
const router = express.Router()

const {follower,following,user} = require('../Controller/followerController')

router.route('/follower').get(follower)
router.route('/following').get(following)
router.route('/user').get(user)

module.exports = router