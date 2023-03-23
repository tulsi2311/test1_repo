var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");


const query = util.promisify(conn.query).bind(conn)

const likes2 = asyncHandler(async (req, res) => {
    var id = req.cookies.home;
    var token_id = jwt.verify(id, 'id');

    var like_id = req.query.tweet_id;
    var flag = req.query.like_flag;
    console.log("flag",flag);


    if(flag == 1)
    {
        var like_query = await query(`INSERT INTO tweet_like ( use_id,twet_id,is_delete) VALUES ('${token_id}','${like_id}','0');`)
        console.log(like_query);
        var like_count = await query(`select count(*) as x from tweet_like where twet_id = ${like_id};`);

        res.send({countLike:like_count[0].x});

    }
    else
    {
        var like_delete = await query(`delete  from 2023_Elite.tweet_like where use_id = ${token_id} and twet_id = ${like_id};`)
        var like_count = await query(`select count(*) as x from tweet_like where twet_id = ${like_id};`);
  
        res.send({countLike:like_count[0].x});
  
    }

    
})

module.exports={likes2}