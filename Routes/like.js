const express = require("express")
const app = express();
const router = express.Router()

const {like,dislike } = require('../Controller/likeController')

router.route('/like').get(like)
router.route('/dislike').get(dislike)

module.exports = router