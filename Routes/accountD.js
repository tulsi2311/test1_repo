const express = require("express")
const app = express();
const router = express.Router()

const { deleteA } = require('../Controller/deleteAController')

router.route('/delete').get(deleteA)

module.exports = router