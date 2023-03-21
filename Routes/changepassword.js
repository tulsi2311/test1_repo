const express = require("express")
const app = express();
const router = express.Router()

// const { change,change2 } = require('../Controller/changeController')
const { change,change2 } = require('../Controller/changeController')

router.route('/chnage').get(change)
router.route('/change2').post(change2)

module.exports = router