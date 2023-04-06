var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");

const query = util.promisify(conn.query).bind(conn)
const follower = asyncHandler(async (req, res) => {
    var cook = req.session.token;
    // console.log("cookie: ", cook);
    if (!cook || (cook == '')) {
        res.redirect('/login/login')
    } else {
        var id = req.session.token_id;
        var token_id = req.session.token_id;
        var followers_name = await query(`SELECT Elite_User.name, user_follower.follower_id,user_follower.user_id_id
    ,Elite_User.email FROM Elite_User
    INNER JOIN user_follower ON user_follower.follower_id = Elite_User.id where user_id_id='${token_id}';`);
        // console.log(followers_name);
        const name = []

        for (i = 0; i < followers_name.length; i++) {

            name.push(followers_name[i]);
        }



        res.render('follow_list.ejs', { data: name })
    }

})

const following = asyncHandler(async (req, res) => {
    var cook = req.session.token;
    // console.log("cookie: ", cook);
    if (!cook || (cook == '')) {
        res.redirect('/login/login')
    } else {
        var id = req.session.token_id;
        var token_id = req.session.token_id;
        var sql = `SELECT Elite_User.name, user_following.following_id,user_following.user_i
    ,Elite_User.email FROM Elite_User
    INNER JOIN user_following ON user_following.following_id = Elite_User.id where user_i='${token_id}'`
        // console.log(sql);
        var following_name = await query(sql);
        // console.log(following_name);
        const name1 = [];
        for (i = 0; i < following_name.length; i++) {
            var name2 = following_name[i].name;

            name1.push(following_name[i]);

            // console.log(name1);

        }


        res.render("following_list.ejs", { data: name1 })
    }

})



const user = asyncHandler(async (req, res) => {
    // console.log("id::::::::",req.query.id)
    var token_id = req.session.token_id;
    // console.log("count:::::::::", token_id)
    //for sidebar
    var select_user = await query(`select name,user_image,user_name from Elite_User where id='${token_id}'`)
    // console.log("name image:::::::::::", select_user)
    
    //selected user
    var userdata=await query(`select * from Elite_User where id='${req.query.id}'`)
    // console.log("userdata ::::::::",userdata)

    //tweetcount
    var tweetcount = await query(`select count(*) as t from user_tweets where u_id=${req.query.id}`);
    
    //followers and following count
    var followingcount = await query(`select count(*) as count from user_following where user_i='${req.query.id}'`);
    var follower = await query(`select count(*) as c from user_follower where user_id_id='${req.query.id}'`);
    
    
    res.render("newProf",{userdata,user:select_user,tweetcount,followingcount,follower})
})



module.exports = { follower, following,user }