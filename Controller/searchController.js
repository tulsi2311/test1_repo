var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");

const query = util.promisify(conn.query).bind(conn)
const home = asyncHandler(async (req, res) => {

  var cook_id = req.cookies.home;
  var token = jwt.verify(cook_id, 'id');
  // console.log("token verify::::  ", token);



  var fname = req.query.var;
  var search_query = await query(`select * from Elite_User where name like '${fname}%' and id <> ${token}`)
  var search_following = await query(`SELECT following_id from user_following where user_i = ${token};`)
  res.send({listUser:search_query,following:search_following})
  

})

const follower = asyncHandler(async (req, res) => {
  var cook_id = req.cookies.home;
  var token = jwt.verify(cook_id, 'id');
  var follower_id = token;
  console.log("req.body",req.query);
  console.log("follower_id:::::::  ", follower_id)

  var id = req.query.follower_id;
  console.log("user_id:::: ", id);



  var follow_flag = req.query.flag;
  console.log("flag = ", follow_flag);

  if (follow_flag == 1) {

    var follower_insert = `INSERT INTO user_follower (user_id_id, follower_id, is_delete) VALUES ('${id}','${follower_id}', '0');`

    conn.query(follower_insert, (err, data) => {
      if (err) throw err
      console.log("succedd");

      var following_insert = `INSERT INTO user_following (user_i, following_id, is_delete) VALUES ('${follower_id}','${id}', '0');`
      conn.query(following_insert, (err, data) => {
        if (err) throw err;
        console.log("thai gyu");
      })
    })
  }
  else{


      var follower_delete = `delete  from user_follower where follower_id = '${follower_id}'`;
      conn.query(follower_delete, (err, data) => {
        if (err) throw err;
        console.log("thai gyu");

        var following_delete = `delete  from user_following where following_id = '${id}'`;
        conn.query(following_delete, (err, data) => {
          if (err) throw err;
          console.log("thai gyu");
        })

      })
   
  }
  


})



module.exports = { home, follower }