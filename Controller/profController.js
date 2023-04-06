var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");
const multer = require("multer");
//const multer = require("multer");


const query = util.promisify(conn.query).bind(conn)

const prof_new = asyncHandler(async (req, res) => {
    var cook = req.session.token;
    // console.log("cookie: ", cook);
    if (!cook || (cook == '')) {
        res.redirect('/login/login')
    } else {
        var id = req.session.token_id;
        var token = req.session.token_id;


        var sql = await query(`select * from user_tweets where u_id='${token}' order by id desc`)
        var like = await query(`select twet_id from tweet_like where use_id='${token}'`)
        var profdata = await query(`select * from Elite_User where id='${token}'`)
        var tweetcount = await query(`select count(*) as t from user_tweets where u_id=${token}`);
        var count = await query(`select count(*) as count from user_following where user_i='${token}'`);
        var follower = await query(`select count(*) as c from user_follower where user_id_id='${token}'`);
        
        
       

        var arrid = [], count2, arr2count = []
        for (var z = 0; z < like.length; z++) {
           arrid.push(like[z].twet_id)
           count2 = await query(`select count(*) as count from tweet_like where twet_id='${like[z].twet_id}'`)
           arr2count.push(count2[0].count)
        }

        // console.log("::::::::::post ids::::::", arrid)
        // console.log(":::::::::number of like:::::::", arr2count)




        // console.log("sql:::  ", sql)
        const tweet = [];
        for (i = 0; i < sql.length; i++) {
            tweet.push(sql[i].id);

        }

        // console.log("arrr1:::::::: ", tweet);

        const arr2 = [];
        for (i = 0; i < tweet.length; i++) {
            var proflike = await query(`select count(*) as x from tweet_like where twet_id = ${tweet[i]}`)
            arr2.push(proflike[0].x);
        }


        // console.log("arrr2:::::::: ", arr2);
        var length = arr2.length;
        // console.log("::::::", length);

        const arr3 = [];
        for (i = 0; i < tweet.length; i++) {
            var profComment = await query(`select count(*) as x from tweet_comment where twt_id = ${tweet[i]}`)
            arr3.push(profComment[0].x);
        }
        var token_id = req.session.token_id;
        // console.log("count:::::::::", token_id)
        // console.log("comment:::::: ", arr3)
        var select_user = await query(`select name,user_image,user_name  from Elite_User where id='${token_id}'`)
        // console.log("name image:::::::welcome:::::::::", select_user)
        res.render('prof', {
            data: sql, likeid: like, count: count[0].count, user: select_user, f: follower[0].c, profile_data: profdata[0], tweet_count: tweetcount[0].t, arr2, length, arr3,tweetid:arrid,likecount:arr2count
        });
    }
})
const edit_prof = asyncHandler(async (req, res) => {
    var cook = req.session.token;
    // console.log("cookie: ", cook);
    if (!cook || (cook == '')) {
        res.redirect('/login/login')
    } else {
        var id = req.session.token_id;
        var token = req.session.token_id;

        var edit_query = await query(`select * from Elite_User where id='${token}'`);
        var sql = edit_query[0].date_of_birth;

        // console.log(":::::::", JSON.stringify(sql).slice(1, 5))
        // console.log(":::::::", JSON.stringify(sql).slice(6, 8))

        // console.log(":::::::", JSON.stringify(sql).slice(9, 11))

        var date = "";
        date += JSON.stringify(sql).slice(1, 5) + "-" + JSON.stringify(sql).slice(6, 8) + "-" + JSON.stringify(sql).slice(9, 11);
        // console.log(date)

        res.render('editprofile.ejs', { edit_query, date });
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

const update_prof = asyncHandler(async (req, res) => {
    var cook = req.session.token;
    // console.log("cookie: ", cook);
    if (!cook || (cook == '')) {
        res.redirect('/login/login')
    } else {
        var id = req.session.token_id;
        var token = req.session.token_id;
        upload(req, res, function (err) {
            console.log("Token: ", req.body)

            if (req.file) {
                // console.log(":::::::::", req.file)
                var FileName = req.file.filename;
                var imgsrc = '/files/' + req.file.filename;
                // console.log(imgsrc)
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
    }
})
module.exports = { prof_new, edit_prof, update_prof }