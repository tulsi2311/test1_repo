const express = require("express")
const app = express();
const router = express.Router()

const { re,reC,show } = require('../Controller/retweetcontroller')

router.route('/re').get(re)
router.route('/reC').get(reC)
router.route('/show').get(show)

module.exports = router
module.exports = router