const express = require("express")
const app = express();
const router = express.Router()

const {home,follower} = require('../Controller/searchController.js')
// const {follower} = require('../Controller/searchController.js')

router.route('/home').get(home)
router.route('/follower').get(follower)

module.exports = router