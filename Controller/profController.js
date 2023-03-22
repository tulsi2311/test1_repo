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
    var like=await query(`select twet_id from tweet_like where use_id='${token}'`)
    var profdata = await query(`select * from Elite_User where id='${token}'`)
    var tweetcount = await query(`select count(*) as t from user_tweets where u_id=${token}`);
    var count = await query(`select count(*) as count from 2023_Elite.user_following where user_i='${token}'`);
    var follower = await query(`select count(*) as c from 2023_Elite.user_follower where user_id_id='${token}'`);
    console.log("count::::: ",count[0].count);
    console.log(like)
    console.log(profdata[0].id,"this is profile data");
    res.render('prof',{data:sql,likeid:like,count:count[0].count,f:follower[0].c,profile_data:profdata[0],tweet_count:tweetcount[0].t});
})

module.exports = { prof_new }