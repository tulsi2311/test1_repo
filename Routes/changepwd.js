const express = require("express")
const app = express();
const router = express.Router()

const {changepwd1,changepwd2} = require('../Controller/changepwdController')

router.route('/changepassword').get(changepwd1)

router.route('/changepassword').post(changepwd2)
// router.route('/changepassword11').get(changepwd3)


module.exports = router