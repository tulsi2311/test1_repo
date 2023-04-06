var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
const multer = require("multer");
var util = require('util')
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");

const query = util.promisify(conn.query).bind(conn)
const tweet = asyncHandler(async (req, res) => {
    var cook = req.session.token;
    // console.log("cookie: ", cook);
    if (!cook) {
        var str = "";
        c = 0;
        res.render('login.ejs', { str, c });

    } else {
        s = ""
        res.render('tweet_add.ejs', { s });
    }

})

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/files');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

var upload = multer({ storage: storage }).single('img');

const upload2 = asyncHandler(async (req, res) => {
    var id = req.session.token_id;
    var token = req.session.token_id;
    // console.log(token)
    upload(req, res, function (err) {

        if (err) {
            console.log(err)
        } else {
            
            if (req.file) {

                var FileName = req.file.filename;
                // console.log(FileName);

                var imgsrc = '/files/' + req.file.filename;
                var insertData = `INSERT INTO user_tweets(u_id,description,media_url)VALUES('${token}','${req.body.desc}','${imgsrc}')`
                conn.query(insertData, (err, result) => {
                    if (err) throw err
                    res.redirect("/login/login")
                });
            } else {
                if (req.body.desc.trim() == "") {
                    s="you have enter at least one value"
                    res.render("tweet_add",{s})
                } else {
                    var insertData = `INSERT INTO user_tweets(u_id,description)VALUES('${token}','${req.body.desc}')`
                    conn.query(insertData, (err, result) => {
                        if (err) throw err
                        res.redirect("/login/login")
                    });
                }
            }
            //}
        }
    })

})

module.exports = { tweet, upload2 }