var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");
var c;
const query = util.promisify(conn.query).bind(conn)
const login = asyncHandler(async (req, res) => {
   var cook = req.cookies.authcookie;
   console.log("cookie: ", cook);
   if ((!cook) || cook=='') {
      var str = "";
      c = 0;
      res.render('login.ejs', { str, c });

   }
   else {

      var token = jwt.verify(cook, 'prachi');
      console.log("token verify", token);
      // res.render('home.ejs', { data: token });
      var id = req.cookies.home;
      var token_id = jwt.verify(id, 'id');
      console.log(token)
      //var image = `select heading,description,media_url from user_tweets where u_id='${token}'`;
      var sql=await query(`select heading,description,media_url from user_tweets where u_id='${token_id}'`)
      if(sql){
         res.render('home.ejs', { data:sql,data2:token });
      }else{
         res.render('home.ejs', { data2: token });
      }


   }

})


const kakaLogin = asyncHandler(async (req, res) => {

   console.log(req.body);
   var sql = `select * from Elite_User where is_active=1 and is_delete=0 and email='${req.body.email}'`;
   conn.query(sql, (err, data) => {
      if (err) throw err;

      if (data == "") {

         var str = "incorrect email or password";
         c++;
         res.render('login.ejs', { str, c });
      }
      else {
         console.log("failed " + c)
         console.log(data);
         var hash2 = bcrypt.compareSync(req.body.password, data[0].password);
         console.log(hash2);
         if (hash2) {
            if (data[0].is_active) {
               
               const now = new Date();
               const value = date.format(now, 'YYYY/MM/DD HH:mm:ss');

               var login = query(`insert into login(user_id,login_time,failed_attempt) values('${data[0].id}','${value}','${c}')`)

               var token_id = jwt.sign(data[0].id, 'id')
               res.cookie('home', token_id)

               var token = jwt.sign(data[0].name, 'prachi');
               console.log(token);

               res.cookie('authcookie', token);
               res.redirect('/login/login/index5');
            } else {
               res.render('active.ejs', { id: data[0].id, message: "You have to first active your account" })
               // res.send(`You have to first active your account <a href="/login_first?id=${data[0].id}"> Click here to verify your account</a>`);
            }
         }
         else {

            var str = "incorrect email or password";
            c++;
            res.render('login.ejs', { str, c });
         }
      }
   })
})

const login2 = asyncHandler(async (req, res) => {

   var cook = req.cookies.authcookie;
   console.log("cookie: ", cook);
   if (!cook) {
      var str = "";
      c = 0;
      res.render('login.ejs', { str, c });
   }
   else {

      var token = jwt.verify(cook, 'prachi');
      console.log("token verify", token);
      //res.render('home.ejs', { data: token });
      var id = req.cookies.home;
      var token_id = jwt.verify(id, 'id');
      console.log(token)
      var sql2=await query(`select * from Elite_User where is_active=1 and is_delete=0`)
      if(sql2){
      //var image = `select heading,description,media_url from user_tweets where u_id='${token}'`;
      var sql=await query(`select heading,description,media_url from user_tweets where u_id='${token_id}'`)
      if(sql){
         res.render('home.ejs', { data:sql,data2:token });
      }else{
         console.log("else")
         res.render('home.ejs', { data2: token });
      }
   }
   }
})



module.exports = { login, kakaLogin, login2 }