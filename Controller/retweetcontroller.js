var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");

const query = util.promisify(conn.query).bind(conn)
const re = asyncHandler(async (req, res) => {
   console.log("tokenId:::::", req.query.tid)
   console.log("re", req.query.u_id)
   var tweetdata = await query(`select * from user_tweets where id='${req.query.tid}'`)
   
  
   //   var nameimage=await query(`select name,user_image from Elite_User where id='${req.query.u_id}'`)
   //   console.log(nameimage)
   var comment = await query(`select * from re_tweet where tweet_id='${req.query.tid}'`)
   
   
   var arr = []
   for (var j = 0; j < comment.length; j++) {
      arr.push(comment[j].uid)
   }
   console.log(arr)
   var nameImage;
   var arr2 = [];
   if (Array.isArray(arr)) {
      for (var k = 0; k < arr.length; k++) {
         nameImage = await query(`select name,user_image from Elite_User where id='${arr[k]}'`)
         arr2.push(nameImage[0])
         console.log("token::::::  ", nameImage)
      }
   }
   var id = req.session.token_id;
   var token_id = req.session.token_id;
   // console.log("token::::::  ", token_id)


   var retweetData = await query(`select name,user_image from Elite_User where id='${token_id}'`);
   // console.log("retweet data:::::::::::: ", retweetData);

   res.render("retweet", { tweetdata, nameimage: arr2, c: comment, retweetData })
})

const reC = asyncHandler(async (req, res) => {
   console.log(req.query.twid)
   console.log(req.query.comment)
   var id = req.session.token_id;
   var token_id = req.session.token_id;
   if (req.query.comment.trim() == "") {
      s = "enter text"
      result2 = ""
      nameImage = ""
      res.json({ s, result2, nameImage })
   } else {
      s = ""
      var result = await query(`insert into re_tweet(uid,tweet_id,retweet_data) values('${token_id}','${req.query.twid}','${req.query.comment}')`)
      console.log(result)
      var lastid = result.insertId;
      var result2 = await query(`select * from re_tweet where id=${lastid}`)
      var nameImage = await query(`select name,user_image from Elite_User where id='${result2[0].uid}'`)
      res.json({ s,result2, nameImage })
      //res.redirect('/login/login');
   }

})
const show = asyncHandler(async (req, res) => {
   // console.log(req.query.tid)
   // console.log(req.query.u_id)
   var tweet;
   var retweet = await query(`select * from re_tweet where tweet_id='${req.query.tid}'`)
   // console.log(retweet)
   if (retweet == "") {
      res.send(`nothing retweet<a href="/login/login">Click Here</a>`)
   } else {
      tweet = await query(`select * from user_tweets where id='${req.query.tid}'`)
      var token_id = req.session.token_id;
      // console.log("token::::::  ", token_id)


      var retweetData = await query(`select name,user_image from Elite_User where id='${req.query.u_id}'`);
      // console.log(retweetData)
      res.render("retweetShow", { tweetdata: tweet, retweet, retweetData })
   }
})

module.exports = { re, reC, show }