var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
    res.render('reg.ejs')
})


const kaka = asyncHandler(async (req, res) => {

    var data1 = req.body;
    console.log(req.body);
    if (data1.Name == "" || data1.Email == "" || data1.Password == "") {
        res.redirect('/registration');
    }
    else {
        var hash = bcrypt.hashSync(req.body.password, 5);
        var sql = `insert into Elite_User(name,email,password,user_name,is_active,is_delete) values('${req.body.name}','${req.body.email}','${hash}','${req.body.username}',0,0)`;
        conn.query(sql, (err, data) => {
            console.log(data);
            if (err) throw err;

            res.render('active.ejs', { id: data.insertId, message: "You have successfully registered" })
        })
    }
})

const email = asyncHandler(async (req, res) => {
    var sql = `select * from Elite_User where email='${req.query.email}'`;
    conn.query(sql, (err, data) => {
        if (err) throw err;
        console.log(data);
        res.send({ data });

    })

})

const username = asyncHandler(async (req, res) => {
    var sql = `select * from Elite_User where user_name='${req.query.userName}'`;
    conn.query(sql, (err, data) => {
        if (err) throw err;
        console.log(data);
        res.send({ data });

    })

})

const first = asyncHandler(async (req, res) => {
    var id1 = req.query.id;
    var sql = `update Elite_User set is_active=1 where id=${id1}`;
    conn.query(sql, (err, data) => {
        if (err) throw err;
        res.redirect('/login/login');
    })

})


module.exports = { register, kaka, email, username, first }