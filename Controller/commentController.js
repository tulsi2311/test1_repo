var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");

const query = util.promisify(conn.query).bind(conn)
const newc = asyncHandler(async (req, res) => {
   var cook = req.session.token;
   //console.log("cookie: ", cook);
   if (!cook || (cook == '')) {
      res.redirect('/login/login')
   } else {
      console.log(req.query.tid)
      console.log(req.query.u_id)
      //console.log(":::::::::::::::::::::::::::", req.query.u_id)
      var tweetdata = await query(`select * from user_tweets where id='${req.query.tid}'`)
      var comment = await query(`select * from tweet_comment where twt_id='${req.query.tid}' and us_id=${req.query.u_id}`)
      // console.log(tweetdata)
      // console.log(comment)
      var arr = []
      for (var j = 0; j < comment.length; j++) {
         arr.push(comment[j].us_id)
      }
      // console.log(arr)
      var nameImage;
      var arr2 = [];
      if (Array.isArray(arr)) {
         for (var k = 0; k < arr.length; k++) {
            nameImage = await query(`select name,user_image from Elite_User where id='${arr[k]}'`)
            arr2.push(nameImage[0])
         }
      }
      // console.log(arr2)
      // console.log("::::::::::::::::::::::::", arr2.length)

      var id = req.session.token_id;
      var token_id = req.session.token_id;
      // console.log("token::::::  ",token_id)
      var commentData = await query(`select name,user_image from Elite_User where id='${token_id}'`);
      // console.log("comment data:::::::::::: ",commentData);

      //var nameImage=await query(`select name,user_image from Elite_User where id='${req.query.u_id}'`)
      res.render('commentTweet', { data: tweetdata, c: comment, arr2, commentData })
      //res.send({tweetdata})
   }
})
const pComment = asyncHandler(async (req, res) => {
   // console.log(req.query.twid)
   // console.log(req.query.comment)
   var id = req.session.token_id;
   var token_id = req.session.token_id;
   if (req.query.comment.trim() == "") {
      s = "enter text"
      all=""
      nameImage=""
      res.json({ s,all,nameImage })
   } else {
      var sql = await query(`insert into tweet_comment(us_id,comment,twt_id) values('${token_id}','${req.query.comment}','${req.query.twid}')`)
      var lastid = sql.insertId;
      s=""
      var all = await query(`select * from tweet_comment where id=${lastid}`)
      var nameImage = await query(`select name,user_image from Elite_User where id='${all[0].us_id}'`)
      // console.log(nameImage)
      
      res.json({ s,all, nameImage });
   }
})

module.exports = { newc, pComment }