const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const useragent = require('express-useragent');
const ejs = require('ejs');
const mysql = require('mysql2') //npm install mysql2
var cors = require('cors');
const { exit } = require('process');

app.engine("html", ejs.renderFile);
app.use(useragent.express());
app.use(cors());
app.use(bodyParser.json());
app.listen(5000, () => console.log(`Listening on port... ${5000}`));

const connection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
})

//http://localhost:5000/list_users
app.get('/list_users',(require,response)=>{
    let sql = `SELECT id, user_code, name, balance FROM member WHERE status='Y' ORDER BY user_code ASC`;
    connection.query(sql,(error,results) =>{
        if(error){ console.log(error); }
        response.send({
            data: results
        });

        return response;
    });
});

app.get('/list_users/:id',(req,res)=>{
    let qrId = req.params.id;
    //let qr = `SELECT * FROM admindata where id = ${qrId}`;
    let sql = `SELECT id, user_code, name FROM member WHERE id = ${qrId} ORDER BY user_code ASC`;
    connection.query(sql,(err,results) =>{
        if (err){
            console.log(err)
        }
        if (results.length>0){
            res.send({
                message: 'Get Data By Id',
                data:results
            });
        }else{
            res.send({
                message:"Data not found dear"
            })
        }
    });
});

app.get('/user_play/user/:user_id',(require,response)=>{
    let user_id = require.params.user_id;
    let sql = `SELECT member.id AS member_id, member.user_code AS user_code, member.name AS name, member.balance AS balance, 
    user_play.bet AS bet, user_play.win AS win, user_play.tiles AS tiles, winline AS winline FROM user_play, member 
    WHERE user_play.member_id=member.id AND member.id='${user_id}' AND member.status='Y' ORDER BY member.created_at DESC`;
    connection.query(sql,(error,results)=>{
        if(error){ console.log(error) }
        response.send({
            data: results
        });
    });
});

app.post('/user_play/add/:user_id',(require,response)=>{
    let user_id = require.params.user_id;
    let bet = require.body.bet;
    let tiles = require.body.tiles;
    let winline = require.body.winline;
    let sql = `INSERT INTO user_play (member_id, bet, win, tiles, winline, created_at) value ('${user_id}','${bet}','${tiles}','${winline}', now())`;
    connection.query(sql,(error,results)=>{
        if(error){ console.log(error) }
        response.send({
            message: "Data created Success",
            data: results
        });
    });
});