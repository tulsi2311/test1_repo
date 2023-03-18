const express = require("express")
const app = express();
const router = express.Router()

const {prof_new} = require('../Controller/profController')

router.route('/prof').get(prof_new)


module.exports = router