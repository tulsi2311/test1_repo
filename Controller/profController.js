var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn=require('../connection/connection')
const asyncHandler = require("express-async-handler");



const prof_new = asyncHandler( async(req, res) => {

   
    res.render('prof');
})

module.exports = { prof_new }