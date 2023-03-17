const express = require("express")
const multer = require("multer");
const app = express();
const router = express.Router()

const {tweet} = require('../Controller/tweetController')

router.route('/tweet_add').get(tweet)


module.exports = router