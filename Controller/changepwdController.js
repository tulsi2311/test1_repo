var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");

const query = util.promisify(conn.query).bind(conn)

const changepwd1 = asyncHandler( async(req, res) => {

  res.render('changepassword');
})


const changepwd2 = asyncHandler(async (req, res) => {

// post("/editreg", async (req, res) => {
  const { password_old,password_new } = req.body;
  var id = req.cookies.home;
      var token_id = jwt.verify(id, 'id');
      console.log(token_id)
 
  console.log("old",password_old);
  console.log("new",password_new);


  var sql = `SELECT * FROM 2023_Elite.Elite_User where id = ${token_id};`
  const result = await query(sql);;
  var oldPass = result[0].password;
  console.log("old p " + oldPass);
  var hashp = await bcrypt.hash(password_new, 10);
  var match = await bcrypt.compare(password_old, oldPass);
  console.log(match);
  if (match) {
    var sql1 = `update 2023_Elite.Elite_User set  password="${hashp}" where id= ${token_id};`
    var update = await query(sql1);
    console.log("edited");
    // res.redirect('/home');
    // res.redirect('/prof/prof')
   res.json("yes")
  } else {
    console.log("juh8yhuyhuyuy8 gjhvghuyvg");
  //  res.json("no")
    res.redirect('/changepwd/changepassword')
    // res.redirect('/editreg');

    // console.log("old password not mathed");
  }
})

// const changep3=asyncHandler(async (req, res) => {
//   const { password_old,password_new } = req.body;
//   var id = req.cookies.home;
//       var token_id = jwt.verify(id, 'id');
//       console.log(token_id)
 
//   console.log("old",password_old);
//   console.log("new",password_new);


//   var sql = `SELECT * FROM 2023_Elite.Elite_User where id = ${token_id};`
//   const result = await query(sql);;
//   var oldPass = result[0].password;
//   console.log("old p " + oldPass);
//   var hashp = await bcrypt.hash(password_new, 10);
//   var match = await bcrypt.compare(password_old, oldPass);
//   console.log(match);
//   if (match) {
//     var sql1 = `update 2023_Elite.Elite_User set  password="${hashp}" where id= ${token_id};`
//     var update = await query(sql1);
//     console.log("edited");
//     // res.redirect('/home');
//     // res.redirect('/prof/prof')
//    res.json("yes")
//   } else {
//     console.log("juh8yhuyhuyuy8 gjhvghuyvg");
//    res.json("no")
//     // res.redirect('/changepwd/changepassword')
//     // res.redirect('/editreg');

//     // console.log("old password not mathed");
//   }
// })


module.exports={changepwd1 ,changepwd2}






