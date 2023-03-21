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

    var id = req.cookies.home
    var token_id = jwt.verify(id, 'id');
    console.log('Bharti')



    upload(req, res, function (err) {
    //     index1
        if (err) {
            console.log(err)
        } else {
            var FileName = req.file.filename;
            console.log(FileName);

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

            var cook = req.cookies.authcookie;
            var token = jwt.verify(cook, 'prachi');
            console.log("token verify", token);
            var id = req.cookies.home;
            var token_id = jwt.verify(id, 'id');
            var set = query( `update Elite_User set number='${req.body.contact}', date_of_birth='${req.body.dob}', bio='${req.body.bio}', user_image = '${compree_image}' where id='${token_id}'`)
            var sql = query(`select heading,description,media_url from user_tweets where u_id='${token_id}'`)
            if (sql) {
               res.render('home.ejs', { data: sql, data2: token });
            } else {
               console.log("else")
               res.render('home.ejs', { data2: token });
            }
        }
    })

})

module.exports = { user_info }