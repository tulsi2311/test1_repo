var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn=require('../connection/connection')
const asyncHandler = require("express-async-handler");



const static1 = asyncHandler( async(req, res) => {

   
    res.render('staticpart1');
})

const static2 = asyncHandler( async(req, res) => {

   
    res.render('staticpart2');
})
const home1 = asyncHandler( async(req, res) => {

   
    res.render('homedemo');
})
const prof1 = asyncHandler( async(req, res) => {

   
    res.render('profdemo');
})

module.exports = { static1,static2 ,home1,prof1}