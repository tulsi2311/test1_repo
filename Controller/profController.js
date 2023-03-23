var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");
const multer = require("multer");


const query = util.promisify(conn.query).bind(conn)

const prof_new = asyncHandler(async (req, res) => {
    var id = req.cookies.home;
    var token = jwt.verify(id, 'id');
    var sql = await query(`select id,media_url from user_tweets where u_id='${token}'`)
    var like = await query(`select twet_id from tweet_like where use_id='${token}'`)
    var count = await query(`select count(*) as count from 2023_Elite.user_following where user_i='${token}'`);
    var follower = await query(`select count(*) as c from 2023_Elite.user_follower where user_id_id='${token}'`);
    console.log("count::::: ", count[0].count);
    console.log(like)
    res.render('prof', { data: sql, likeid: like, count: count[0].count, f: follower[0].c });
})

const edit_prof = asyncHandler(async (req, res) => {
    var id = req.cookies.home;
    var token = jwt.verify(id, 'id');

    var edit_query = await query(`select * from Elite_User where id='${token}'`);
    var sql = edit_query[0].date_of_birth;

    console.log(":::::::",JSON.stringify(sql).slice(1, 5) )
    console.log(":::::::",JSON.stringify(sql).slice(6,8) )

    console.log(":::::::",JSON.stringify(sql).slice(9,11) )

    var date = "";
    date += JSON.stringify(sql).slice(1, 5) + "-" + JSON.stringify(sql).slice(6, 8) + "-" + JSON.stringify(sql).slice(9, 11);
    console.log(date)

    res.render('editprofile.ejs', { edit_query, date });
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

const update_prof = asyncHandler(async (req, res) => {
    var id = req.cookies.home;
    var token = jwt.verify(id, 'id');
    upload(req, res, function (err) {
        console.log("Token: ", req.body)

        if (req.file) {
            console.log(":::::::::", req.file)
            var FileName = req.file.filename;
            var imgsrc = '/files/' + req.file.filename;
            console.log(imgsrc)
            var update_prof = `update Elite_User set name='${req.body.user_name}',bio='${req.body.user_bio}',user_image='${imgsrc}',date_of_birth='${req.body.dob}' where id='${token}'`;
            conn.query(update_prof, (err, result) => {
                if (err) throw err
                res.redirect('/prof/prof');
            })
        } else {
            var update_prof = `update Elite_User set name='${req.body.user_name}',bio='${req.body.user_bio}',date_of_birth='${req.body.dob}' where id='${token}'`;
            conn.query(update_prof, (err, result) => {
                if (err) throw err
                res.redirect('/prof/prof');
            })
        }
    })
})

module.exports = { prof_new, edit_prof, update_prof }