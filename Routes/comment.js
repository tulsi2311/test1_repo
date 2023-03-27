const express = require("express")
const app = express();
const router = express.Router()

const { newc,pComment } = require('../Controller/commentController')

router.route('/newc').get(newc)
router.route('/postComment').get(pComment)

module.exports = router