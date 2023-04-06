var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");
var c;
const query = util.promisify(conn.query).bind(conn)
const login = asyncHandler(async (req, res) => {
   var cook = req.session.token;
   // console.log("cookie: ", cook);
   if ((!cook) || cook == '') {
      var str = "";
      c = 0;
      console.log("render1")
      res.render('login.ejs', { str, c });

   }
   else {
      var token = req.session.token;
      //console.log("token verify", token);
      // res.render('home.ejs', { data: token });
      var id = req.session.token_id;
      var token_id = req.session.token_id;
      //console.log(token)
      var select_user=await query(`select name,user_image,user_name from Elite_User where id='${token_id}'`)
      //console.log("name image",select_user)
      //var image = `select heading,description,media_url from user_tweets where u_id='${token}'`;
      var sql = await query(`select id,u_id,heading,description,media_url from user_tweets where u_id='${token_id}' order by id desc`)
      var followingid = await query(`select following_id from user_following where user_i='${token_id}'`)
      //console.log("error:::::::::", followingid)
      //console.log("following id:::::::",followingid[0].following_id)
      var tweet;

      var like = await query(`SELECT twet_id FROM tweet_like where use_id=${token_id} order by twet_id asc`)

      var arr = [], count, arr2 = []
      for (var z = 0; z < like.length; z++) {
         arr.push(like[z].twet_id)
         count = await query(`select count(*) as count from tweet_like where twet_id='${like[z].twet_id}'`)
         arr2.push(count[0].count)
      }
      var tweetfollowing=[] ,followinguser
      var followingu=[]
      //console.log("::::::::::post ids::::::", arr)
      //console.log(":::::::::number of like:::::::", arr2)


      //console.log("following id ::::::::",followingid)
      //console.log("following id ::::::::",followingid)

      //console.log(":::::",sql)

      if (followingid.length == 0) {
         if (sql) {
            tweetfollowing = ""
            followinguser=""
            console.log("render2")
            res.render('home.ejs', { data: sql,user:select_user, data2: token, tweetfollowing, tweetid: arr, likecount: arr2 ,followinguser});
         } else {
            // console.log("else")
            console.log("render3")
            res.render('home.ejs', { data2: token });
         }
      } else {
         if (followingid.length > 1) {
            for (var i = 0; i < followingid.length; i++) {
               tweet = await query(`select * from user_tweets where u_id='${followingid[i].following_id}' order by id desc`)
               tweetfollowing=tweetfollowing.concat(tweet)
               followinguser = await query(`select id,name,user_image from Elite_User where id='${followingid[i].following_id}'`)
               followingu=followingu.concat(followinguser)
            }
         }
         else {
            tweet = await query(`select * from user_tweets where u_id='${followingid[0].following_id}'`)
            tweetfollowing=tweetfollowing.concat(tweet)
            followinguser = await query(`select id,name,user_image from Elite_User where id='${followingid[0].following_id}' order by id desc`)
            followingu=followingu.concat(followinguser)
         }
         // console.log("name:::::::",tweetfollowing)
         // console.log("following user ::::::::",followingu)
         //console.log(tweet)
         if (sql) {
            console.log("render4")
            res.render('home.ejs', { data: sql,user:select_user, data2: token, tweetfollowing, tweetid: arr, likecount: arr2 ,followinguser:followingu});
         } else {
            console.log("render5")
            res.render('home.ejs', { data2: token });
         }
      }


   }

})


const kakaLogin = asyncHandler(async (req, res) => {
   req.session.demo="rajesh";
   //console.log(req.body);
   var sql = `select * from Elite_User where is_active=1 and is_delete=0 and email='${req.body.email}'`;
   c = req.body.database
   conn.query(sql, (err, data) => {
      if (err) throw err;

      if (data == "") {

         var str = "incorrect email or password";
         c++;
         console.log("render6")
         res.render('login.ejs', { str, c });
      }
      else {
         //console.log("failed " + c)
         //console.log(data);
         var hash2 = bcrypt.compareSync(req.body.password, data[0].password);
         //console.log(hash2);
         if (hash2) {
            if (data[0].is_active) {

               const now = new Date();
               const value = date.format(now, 'YYYY/MM/DD HH:mm:ss');

               var login = query(`insert into login(user_id,login_time,failed_attempt) values('${data[0].id}','${value}','${c}')`)

               // var token_id = jwt.sign(data[0].id, 'id')
               // res.cookie('home', token_id)

               // var token = jwt.sign(data[0].name, 'prachi');
               // console.log(token);
               req.session.token_id=data[0].id;
               var token_id=req.session.token_id
               //console.log("session",token_id)
               
               req.session.token=data[0].name
               var token=req.session.token;
               
               //res.cookie('authcookie', token);
               res.redirect('/login/login/index5');
            } else {
               console.log("render7")
               res.render('active.ejs', { id: data[0].id, message: "You have to first active your account" })
               // res.send(`You have to first active your account <a href="/login_first?id=${data[0].id}"> Click here to verify your account</a>`);
            }
         }
         else {

            var str = "incorrect email or password";
            c++;
            console.log("render8")
            res.render('login.ejs', { str, c });
         }
      }
   })
})

const login2 = asyncHandler(async (req, res) => {
   var tweetfollowing=[],followingu=[]
   var cook = req.session.token;
   // console.log("cookie: ", cook);
   if (!cook) {
      var str = "";
      c = 0;
      console.log("render9")
      res.render('login.ejs', { str, c });
   }
   else {

      var token = req.session.token;
      // console.log("token verify", token);
      //res.render('home.ejs', { data: token });
      var id = req.session.token_id;
      var token_id = req.session.token_id;
      //console.log("count:::::::::", token_id)
      var select_user=await query(`select name,user_image,user_name from Elite_User where id='${token_id}'`)
      //console.log("name image",select_user)
      var count = await query(`select count(*) as count from login where user_id='${token_id}'`)
      //console.log(count[0].count)
      if (count[0].count > 1) {
         var token = req.session.token;
         //console.log("token verify", token);
         var sql2 = await query(`select * from Elite_User where is_active=1 and is_delete=0 and id='${token_id}'`)
         if (sql2) {
            //var image = `select heading,description,media_url from user_tweets where u_id='${token}'`;
            var sql = await query(`select id,u_id,heading,description,media_url from user_tweets where u_id='${token_id}' order by id desc`)
            var followingid = await query(`select following_id from user_following where user_i='${token_id}'`)
            //console.log("following",followingid)
            //console.log("following id:::::::",followingid[0].following_id)
            var tweet;

            var like = await query(`SELECT twet_id FROM tweet_like where use_id=${token_id} order by twet_id asc`)

            var arr = [], count, arr2 = []
            for (var z = 0; z < like.length; z++) {
               arr.push(like[z].twet_id)
               count = await query(`select count(*) as count from tweet_like where twet_id='${like[z].twet_id}'`)
               arr2.push(count[0].count)
            }

            //console.log("::::::::::post ids::::::", arr)
            //console.log(":::::::::number of like:::::::", arr2)

            var tweetid,followinguser
            if (followingid.length == 0) {
               //console.log("yessssssss folllowwiiingh");
               if (sql) {
                  tweetfollowing = ""
                  followinguser=""
                  // tweetid = ""
                  console.log("render10")
                  res.render('home.ejs', { data: sql, data2: token, user:select_user,tweetfollowing, followinguser,tweetid: arr, likecount: arr2  });
               } else {
                  console.log("else")
                  console.log("render11")
                  res.render('home.ejs', { data2: token });
               }
            } else {
               if (followingid.length > 1) {
                  for (var i = 0; i < followingid.length; i++) {
                     tweet = await query(`select * from user_tweets where u_id='${followingid[i].following_id}' order by id desc`)
                     tweetfollowing=tweetfollowing.concat(tweet)
                     followinguser = await query(`select id,name,user_image from Elite_User where id='${followingid[i].following_id}'`)
                     followingu=followingu.concat(followinguser)
                  }
               }
               else {
                  tweet = await query(`select * from user_tweets where u_id='${followingid[0].following_id}' order by id desc`)
                  tweetfollowing=tweetfollowing.concat(tweet)
                  followinguser = await query(`select id,name,user_image from Elite_User where id='${followingid[0].following_id}'`)
                  followingu=followingu.concat(followinguser)
               }
               // console.log("tweet::::::::",tweetfollowing)
               // console.log("name:::::::",followingu)
               if (sql) {
                  console.log("render12")
                  res.render('home.ejs', { data: sql, data2: token, user:select_user,tweetfollowing, tweetid: arr, likecount: arr2 ,followinguser:followingu});
               } else {
                  console.log("else")
                  console.log("render13")
                  res.render('home.ejs', { data2: token });
               }
            }
         }
         //res.render('home.ejs', { data: token });
      } else {
         console.log("render14")
         res.render('profile_info')
      }
   }
})



module.exports = { login, kakaLogin, login2 }