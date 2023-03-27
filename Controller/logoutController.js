var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn=require('../connection/connection')
const asyncHandler = require("express-async-handler");



const logout =asyncHandler( async(req, res) => {

   
    req.session.destroy();
    //res.send({data:"hello"})
    res.send({data:"hello"})
    //res.redirect('/login/login');
})

module.exports = { logout }