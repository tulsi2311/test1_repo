require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const multer = require("multer");
const compress_images = require("compress-images")
var cookie = require('cookie-parser');
var session = require('express-session');
const conn =  require('./connection/connection')
const register =  require('./Routes/register')
const login = require('./Routes/login')
const logout = require('./Routes/logout')
const tweet = require('./Routes/tweet')
const prof = require('./Routes/prof')
const accountD = require('./Routes/accountD')
const search = require('./Routes/search')
const list=require('./Routes/list')
const info = require('./Routes/first_info')
const comment = require('./Routes/comment')
const likes=require('./Routes/likes')
const retweet=require('./Routes/retweet')

const chnagepassword = require('./Routes/changepassword')

var c;
app.use(express.static('public'));
app.set('view engine', "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookie());

const query = util.promisify(conn.query).bind(conn)

conn.connect((err) => {
   if (err) throw err;
   console.log("succedd");
})


app.use(session({
   secret: 'your-secret-key',
   resave: true,
   saveUninitialized: true,
   cookie: {
   maxAge: 24 * 60 * 60 * 1000
   }
}));


app.use('/registration',register)
app.use('/login',login)
app.use('/logout',logout)
app.use('/tweet',tweet)
app.use('/prof',prof)
app.use('/deleteAccount',accountD)
app.use('/search',search)
app.use('/list',list)
app.use('/info',info)
app.use('/comment',comment)
app.use('/changepassword',chnagepassword)
app.use('/likes',likes)
app.use('/retweet',retweet)



app.listen(process.env.PORT,(req,res)=>{
   console.log("app is reunning on port ",process.env.PORT)
});