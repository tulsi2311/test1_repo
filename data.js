var express = require('express')
var mysql2 = require("mysql2")
var body = require("body-parser")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const cookieParse = require("cookie-parser")
const multer = require("multer");
const upload = multer({ dest: "public/files" });

var app = express()
var util = require('util');
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.use(body.urlencoded({ extended: false }))

app.listen(8011);

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',

    database: 'authentication_demo'
});
const query = util.promisify(connection.query).bind(connection)
app.get("/",(req,res)=>{
    res.render("demo")
})

app.post("/upload", upload.single("img"), async(req, res) => {
    // Stuff to be added later
    console.log(req.file);
    if (!req.file) {
        console.log("No file upload");
    } else {
        //console.log(req.file)
        var imgsrc = 'http://127.0.0.1:8011/public/files/' + req.file.filename
        var insertData = "INSERT INTO image_upload(image_path)VALUES(?)"
        connection.query(insertData, [imgsrc], (err, result) => {
            if (err) throw err
            console.log("file uploaded")
        })
        
    }
  });


app.get("/show",async(req,res)=>{
    var image=await query(`select image_path from image_upload where id=11`)
    var s=image[0].image_path.slice(28)
    res.render("demo2",{data:s})
})
