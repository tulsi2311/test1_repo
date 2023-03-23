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




// app.get('/registration', (req, res) => {


//    var cook = req.cookies.authcookie;
//    console.log("cookie: ", cook);
//    if (!cook) {
//       res.render('reg.ejs');
//    }
//    else {

//       var token = jwt.verify(cook, 'prachi');
//       console.log("token verify", token);
//       res.render('home.ejs', { data: token });

//    }
// });










// app.get('/login', (req, res) => {
   
   
//    var cook = req.cookies.authcookie;
//    console.log("cookie: ", cook);
//    if (!cook) {
//       var str = "";
//       c=0;
//       res.render('login.ejs', { str,c});
      
//    }
//    else {

//       var token = jwt.verify(cook, 'prachi');
//       console.log("token verify", token);
//       res.render('home.ejs', { data: token });

//    }
// });
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

// app.get('/index5', (req, res) => {
//    var cook = req.cookies.authcookie;
//    console.log("cookie: ", cook);
//    if (!cook) {
//       var str = "";
//       c=0;
//       res.render('login.ejs', { str,c});
//    }
//    else {

//       var token = jwt.verify(cook, 'prachi');
//       console.log("token verify", token);
//       res.render('home.ejs', { data: token });

//    }
// })

// app.get('/logout', (req, res) => {
//    res.clearCookie("authcookie");
//    res.redirect('/login');
// })


// app.post('/index2', (req, res) => {

//    var data1 = req.body;
//    console.log(req.body);
//    if (data1.Name == "" || data1.Email == "" || data1.Password == "") {
//       res.redirect('/registration');
//    }
//    else {
//       var hash = bcrypt.hashSync(req.body.password, 5);
//       var sql = `insert into Elite_User(name,email,password,user_name,is_active,is_delete) values('${req.body.name}','${req.body.email}','${hash}','${req.body.username}',0,0)`;
//       conn.query(sql, (err, data) => {
//          console.log(data);
//          if (err) throw err;
        
//          res.render('active.ejs',{id:data.insertId,message:"You have successfully registered"})
//          // res.send(`You have successfully registered <a href="/login_first?id=${data.insertId}"> Click here to verify your account</a>`);
//       })
//    }

// })

// app.get('/login_first', (req, res) => {
//    var id1 = req.query.id;
//    var sql = `update Elite_User set is_active=1 where id=${id1}`;
//    conn.query(sql, (err, data) => {
//       if (err) throw err;
//       res.redirect('/login');
//    })
// })

// app.post('/index3', async(req, res) => {
//    console.log(req.body);
//    var sql = `select * from Elite_User where email='${req.body.email}'`;
//    conn.query(sql, (err, data) => {
//       if (err) throw err;

//       if (data == "") {

//          var str = "incorrect email or password";
//          c++;
//          res.render('login.ejs', { str,c });
//       }
//       else {
//          console.log("failed "+c)
//          console.log(data);
//          var hash2 = bcrypt.compareSync(req.body.password, data[0].password);
//          console.log(hash2);
//          if (hash2) {
//             if (data[0].is_active) {
             
//                const now  =  new Date();
//                const value = date.format(now,'YYYY/MM/DD HH:mm:ss');
               
//                var login=query(`insert into login(user_id,login_time,failed_attempt) values('${data[0].id}','${value}','${c}')`)
             
//                var token_id=jwt.sign(data[0].id,'id')
//                res.cookie('home',token_id)

//                var token = jwt.sign(data[0].name, 'prachi');
//                console.log(token);

//                res.cookie('authcookie', token);

//                res.redirect('/index5');
//             } else {
//                 res.render('active.ejs',{id:data[0].id,message:"You have to first active your account"})
//                // res.send(`You have to first active your account <a href="/login_first?id=${data[0].id}"> Click here to verify your account</a>`);
//             }
//          }
//          else {
 
//             var str = "incorrect email or password";
//             c++;
//             res.render('login.ejs', {str,c});
//          }
//       }

//    })

// })

// app.get('/emaill', (req, res) => {


//    var sql = `select * from Elite_User where email='${req.query.email}'`;
//    conn.query(sql, (err, data) => {
//       if (err) throw err;
//       console.log(data);
//       res.send({ data });

//    })
// })

// app.get('/username', (req, res) => {


//    var sql = `select * from Elite_User where user_name='${req.query.userName}'`;
//    conn.query(sql, (err, data) => {
//       if (err) throw err;
//       console.log(data);
//       res.send({ data });

//    })
// })


////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////
//tweet

// app.get('/index',(req,res) =>{
//    var cook = req.cookies.authcookie;
//    console.log("cookie: ", cook);
//    if (!cook) {
//       var str = "";
//       c=0;
//       res.render('login.ejs', { str,c});
      
//    }else{
//       var data="";
//       res.render('tweet.ejs',{data});
//    }
// })

// app.get('/index1',(req,res) =>
// {
//    var cook = req.cookies.authcookie;
//    console.log("cookie: ", cook);
//    if (!cook) {
//       var str = "";
//       c=0;
//       res.render('login.ejs', { str,c});
      
//    }else{
//     res.render('tweet_add.ejs');
//    }
// })

// var storage = multer.diskStorage({
//    destination: function (req, file, callback) {
//        callback(null, './public/files');
//    },
//    filename: function (req, file, callback) {
//        callback(null, file.originalname);
//    }
// });

// var upload = multer({ storage: storage }).single('img');

// app.post('/tweet_upload', async (req, res) => {
//    var id = req.cookies.home;
//    var token = jwt.verify(id, 'id');
//    console.log(token)
//    upload(req, res, function (err) {
      
//        if (err) {
//            console.log(err)
//        } else {
//            var FileName = req.file.filename;
//            console.log(FileName);

//            var imgsrc = '/files/' + req.file.filename;
//            var insertData = `INSERT INTO user_tweets(u_id,heading,description,media_url)VALUES('${token}','${req.body.heading}','${req.body.desc}','${imgsrc}')`
//                conn.query(insertData, (err, result) => {
//                if (err) throw err
//                   //res.send("file uploaded");
//                   res.redirect("/tweet_show")
         
//                });
           
//        }
//    })


// });


app.get('/tweet_show',(req,res) =>
{
   var cook = req.cookies.authcookie;
   console.log("cookie: ", cook);
   if (!cook) {
      var str = "";
      c=0;
      res.render('login.ejs', { str,c});
      
   }else{
      var id = req.cookies.home;
      var token = jwt.verify(id, 'id');
      console.log(token)
      var image = `select heading,description,media_url from user_tweets where u_id='${token}'`;
      conn.query(image,(err,data) =>{
      if(err) throw err;
      console.log(data);
      res.render('tweet.ejs',{data});
      })
   }
})

app.listen(2081);