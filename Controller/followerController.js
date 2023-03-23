var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const date = require('date-and-time')
var util = require('util')
const conn = require('../connection/connection')
const asyncHandler = require("express-async-handler");

const query = util.promisify(conn.query).bind(conn)
const follower = asyncHandler(async (req, res) => {
    var id = req.cookies.home;
    var token_id = jwt.verify(id, 'id');
    var followers_name = await query (`SELECT Elite_User.name, user_follower.follower_id,user_follower.user_id_id
    ,Elite_User.email FROM Elite_User
    INNER JOIN user_follower ON user_follower.follower_id = Elite_User.id where user_id_id='${token_id}';`);
    console.log(followers_name);
    const name=[]
    
       for( i=0;i<followers_name.length;i++){
   
         name.push(followers_name[i]);
       }
  
      

      res.render('follow_list.ejs',{data:name})
    

})

const following = asyncHandler(async (req, res) => {
    var id = req.cookies.home;
    var token_id = jwt.verify(id, 'id');
    var sql = `SELECT Elite_User.name, user_following.following_id,user_following.user_i
    ,Elite_User.email FROM Elite_User
    INNER JOIN user_following ON user_following.following_id = Elite_User.id where user_i='${token_id}'`
    console.log(sql);
    var following_name = await query (sql);
    console.log(following_name);
    const name1 = [];
    for(i=0;i<following_name.length;i++){
        var name2 = following_name[i].name;
      
        name1.push(following_name[i]);
       
        console.log(name1);
        
    }

    
    res.render("following_list.ejs",{data:name1})

})



module.exports={follower,following}