var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");



const static1 = asyncHandler(async (req, res) => {
    var token_id = req.session.token_id;
    // console.log("count:::::::::", token_id)
    var select_user = await query(`select name,user_image,user_name from Elite_User where id='${token_id}'`)
    // console.log("name image:::::::::::", select_user)
    res.render('staticpart1',{user:select_user});
})

const static2 = asyncHandler(async (req, res) => {
   

    res.render('staticpart2');
})
const home1 = asyncHandler(async (req, res) => {


    res.render('homedemo');
})
const prof1 = asyncHandler(async (req, res) => {


    res.render('profdemo');
})
const editprof = asyncHandler(async (req, res) => {


    res.render('editprofile');
})
module.exports = { static1, static2, home1, prof1, editprof }