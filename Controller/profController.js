var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn=require('../connection/connection')
const asyncHandler = require("express-async-handler");


const query = util.promisify(conn.query).bind(conn)

const prof_new = asyncHandler( async(req, res) => {
    var id = req.cookies.home;
    var token = jwt.verify(id, 'id');
    var sql=await query(`select * from user_tweets where u_id='${token}'`)
    console.log(sql)
    var like=await query(`select twet_id from tweet_like where use_id='${token}'`)
    var count = await query(`select count(*) as count from 2023_Elite.user_following where user_i='${token}'`);
    var follower = await query(`select count(*) as c from 2023_Elite.user_follower where user_id_id='${token}'`);
    console.log("count::::: ",count[0].count);
    console.log(like)
    res.render('prof',{data:sql,likeid:like,count:count[0].count,f:follower[0].c});
})

module.exports = { prof_new }