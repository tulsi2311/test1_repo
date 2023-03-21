const express = require("express")
const app = express();
const router = express.Router()

// const {satic1,satic2 } = require('../Controller/staticController')
const {static1,static2 ,home1,prof1} = require('../Controller/staticController')
 
router.route('/static1').get(static1)
router.route('/static2').get(static2)
router.route('/home1').get(home1)
router.route('/prof1').get(prof1)


module.exports = router