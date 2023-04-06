var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");

const query = util.promisify(conn.query).bind(conn)
const change = asyncHandler(async (req, res) => {
    var cook = req.session.token;
    //console.log("cookie: ", cook);
    if (!cook ||(cook == '') ){
        res.redirect('/login/login')
    }else{
        res.render("changepassword")
    }
})

const change2 = asyncHandler(async (req, res) => {
    const { password_old, password_new } = req.body;
    var id = req.session.token_id;
    var token_id = req.session.token_id;
    //console.log(token_id)

    //console.log("old", password_old);
    //console.log("new", password_new);


    var sql = `SELECT * FROM Elite_User where id = ${token_id};`
    const result = await query(sql);;
    var oldPass = result[0].password;
    //console.log("old p " + oldPass);
    var hashp = await bcrypt.hash(password_new, 10);
    var match = await bcrypt.compare(password_old, oldPass);
    //console.log(match);
    if (match) {
        var sql1 = `update Elite_User set  password="${hashp}" where id= ${token_id};`
        var update = await query(sql1);
        //console.log("edited");
        res.redirect("/prof/prof")
    } else {
        //console.log("juh8yhuyhuyuy8 gjhvghuyvg");

        res.redirect("/changepassword/chnage")

    }
})


module.exports = { change, change2 }