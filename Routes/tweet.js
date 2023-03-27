const express = require("express")
const multer = require("multer");
const app = express();
const router = express.Router()

const {tweet,upload2} = require('../Controller/tweetController')

router.route('/tweet_add').get(tweet)
router.route('/tweet_upload').post(upload2)


module.exports = router