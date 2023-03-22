var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");

const query = util.promisify(conn.query).bind(conn)
const re = asyncHandler(async (req, res) => {
  console.log("re",req.query.tid)
  console.log("re",req.query.u_id)
  var tweetdata=await query(`select * from user_tweets where id='${req.query.tid}'`)
  console.log(tweetdata)
//   var nameimage=await query(`select name,user_image from Elite_User where id='${req.query.u_id}'`)
//   console.log(nameimage)
   var comment=await query(`select * from re_tweet where tweet_id='${req.query.tid}'`)
   var arr=[]
   for(var j=0;j<comment.length;j++){
      arr.push(comment[j].uid)
   }
   console.log(arr)
   var nameImage ;
    var arr2=[];
   if(Array.isArray(arr)){
      for(var k=0;k<arr.length;k++){
         nameImage=await query(`select name,user_image from Elite_User where id='${arr[k]}'`)
         arr2.push(nameImage[0])
      }
   }
  res.render("retweet",{tweetdata,nameimage:arr2,c:comment})
})

const reC = asyncHandler(async (req, res) => {
    console.log(req.query.twid)
    console.log(req.query.comment)
    var id = req.cookies.home;
    var token_id = jwt.verify(id, 'id');
    var result=await query(`insert into re_tweet(uid,tweet_id,retweet_data) values('${token_id}','${req.query.twid}','${req.query.comment}')`)
    console.log(result)
    var lastid=result.insertId;
    var result2=await query(`select * from re_tweet where id=${lastid}`)
    var nameImage=await query(`select name,user_image from Elite_User where id='${result2[0].uid}'`)
    res.json({result2,nameImage})
})  

module.exports = { re,reC }