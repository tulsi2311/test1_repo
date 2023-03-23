const express = require("express")
const app = express();
const router = express.Router()

const {prof_new,edit_prof,update_prof} = require('../Controller/profController')

router.route('/prof').get(prof_new)
router.route('/profedit').get(edit_prof)
router.route('/updateprof').post(update_prof)


module.exports = router