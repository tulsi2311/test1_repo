var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");

const query = util.promisify(conn.query).bind(conn)
const tweet = asyncHandler(async (req, res) => {
    var cook = req.cookies.authcookie;
    console.log("cookie: ", cook);
    if (!cook) {
       var str = "";
       c=0;
       res.render('login.ejs', { str,c});
       
    }else{
     res.render('tweet_add.ejs');
    }

})

module.exports={tweet}