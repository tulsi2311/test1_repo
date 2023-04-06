var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const express = require('express');
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");
const multer = require('multer')
const path = require('path')
const compress_images = require("compress-images")

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const query = util.promisify(conn.query).bind(conn)


var storageEngine = multer.diskStorage({
    destination: (req, file, callback) => {

        callback(null, './public/files');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

var upload = multer({ storage: storageEngine }).single('img');

const user_info = asyncHandler(async (req, res) => {

    var token_id = req.session.token_id;
    // console.log("main:::::::::::", token_id)
    // console.log('Bharti')

    // console.log("demo:::::::", req.session)

    upload(req, res, async function (err) {
        //     index1
        if (err) {
            console.log(err)
        } else {


            if (req.file) {


                var FileName = req.file.filename;
                // console.log(FileName);

                var imgsrc = '/files/' + req.file.originalname;
                var INPUT_path_to_your_images, OUTPUT_path;

                INPUT_path_to_your_images = 'public/files/' + req.file.originalname;
                OUTPUT_path = "public/compress/";

                compress_images(INPUT_path_to_your_images, OUTPUT_path, { compress_force: false, statistic: true, autoupdate: true }, false,
                    { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
                    { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
                    { svg: { engine: "svgo", command: "--multipass" } },
                    { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
                    function (error, completed, statistic) {
                        console.log("-------------");
                        console.log(error);
                        console.log(completed);
                        console.log(statistic);
                        console.log("-------------");
                    }
                )

                var compree_image = "/compress/" + req.file.originalname;

                var token = req.session.token;
                // console.log("token verify", token);
                var token_id = req.session.token_id;
                //var token_id = req.session.token_id;
                // console.log("count:::::::::welcome", token_id)
                var set = query(`update Elite_User set number='${req.body.contact}', date_of_birth='${req.body.dob}', bio='${req.body.bio}', user_image = '${compree_image}' where id='${token_id}'`)
                var sql = query(`select heading,description,media_url from user_tweets where u_id='${token_id}'`)
                var select_user = await query(`select name,user_image,user_name from Elite_User where id='${token_id}'`)
                // console.log("name image::::::::::welcome", select_user)
                if (sql) {
                    tweetfollowing = ""
                    followinguser=""
                    res.render('home.ejs', { data: sql, data2: token, tweetfollowing, user: select_user,followinguser });
                } else {
                    console.log("else")
                    res.render('home.ejs', { data2: token });
                }
            }else{
                var token_id = req.session.token_id;
                //var token_id = req.session.token_id;
                console.log("count:::::::::welcome", token_id)
                var set = query(`update Elite_User set number='${req.body.contact}', date_of_birth='${req.body.dob}', bio='${req.body.bio}' where id='${token_id}'`)
                var sql = query(`select heading,description,media_url from user_tweets where u_id='${token_id}'`)
                var select_user = await query(`select name,user_image,user_name from Elite_User where id='${token_id}'`)
                // console.log("name image::::::::::welcome", select_user)
                if (sql) {
                    tweetfollowing = ""
                    followinguser=""
                    res.render('home.ejs', { data: sql, data2: token, tweetfollowing, user: select_user ,followinguser});
                } else {
                    console.log("else")
                    res.render('home.ejs', { data2: token });
                }
            }
        }
    })

})

module.exports = { user_info }