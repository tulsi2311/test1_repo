const express = require("express")
const app = express();
const router = express.Router()

const { re,reC } = require('../Controller/retweetController')

router.route('/re').get(re)
router.route('/reC').get(reC)

module.exports = router