const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const useragent = require('express-useragent');
const ejs = require('ejs');
const mysql = require('mysql2') //npm install mysql2
const axios = require('axios'); //npm install axios
var cors = require('cors');

require('dotenv').config()
app.engine("html", ejs.renderFile);
app.use(useragent.express());
app.use(cors());
app.use(bodyParser.json());
app.listen(5000, () => console.log(`Listening on port... ${5000}`));

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'db_gggame',
    port:3306
})

//http://localhost:5000/list_admins
app.get('/list_admins',(require,response)=>{
    let sql = `SELECT id, name, username, status FROM admin WHERE status_delete='N' ORDER BY username ASC`;
    connection.query(sql,(error,results) =>{
        if(error){ console.log(error); }
        response.send({
            message: 'admin all',
            data: results
        });

        return response;
    });
});

//http://localhost:5000/list_admin/1
app.get('/list_admin/:admin_id',(require,response)=>{
    let admin_id = require.params.admin_id;
    let sql = `SELECT id, name, username, status FROM admin WHERE id='${admin_id}' AND status_delete='N' ORDER BY username ASC`;
    connection.query(sql,(error,results)=>{
        if(error){ console.log(error) }
        response.send({
            message: "admin select",
            data: results
        });

        return response;
    });
});

//http://localhost:5000/list_agents
app.get('/list_agents',(require,response)=>{
    let sql = `SELECT id, agent_code, website_name, name, phone, email, username, status FROM agent WHERE status_delete='N' 
    ORDER BY username ASC`;
    connection.query(sql,(error,results) =>{
        if(error){ console.log(error); }
        response.send({
            message: 'agent all',
            data: results
        });

        return response;
    });
});

//http://localhost:5000/list_agent/1
app.get('/list_agent/:agent_id',(require,response)=>{
    let agent_id = require.params.agent_id;
    let sql = `SELECT id, agent_code, website_name, name, phone, email, username, status FROM agent WHERE id='${agent_id}' AND status_delete='N' 
    ORDER BY username ASC`;
    connection.query(sql,(error,results)=>{
        if(error){ console.log(error) }
        response.send({
            message: "agent select",
            data: results
        });

        return response;
    });
});

//http://localhost:5000/list_users/agent/1
app.get('/list_users/agent/:agent_id',(require,response)=>{
    let agent_id = require.params.agent_id;
    let sql = `SELECT id, member_code, name, username, balance, status FROM member WHERE agent_id='${agent_id}' AND status_delete='N' 
    ORDER BY member_code ASC`;
    connection.query(sql,(error,results) =>{
        if(error){ console.log(error); }
        response.send({
            message: 'agent member all',
            data: results
        });

        return response;
    });
});

//http://localhost:5000/list_users
app.get('/list_users',(require,response)=>{
    let sql = `SELECT id, member_code, name, username, balance, status FROM member WHERE status_delete='N' ORDER BY member_code ASC`;
    connection.query(sql,(error,results) =>{
        if(error){ console.log(error); }
        response.send({
            message: 'member all',
            data: results 
        });
        console.log(results)
        return response;
    });
});

http://localhost:5000/list_user/1
app.get('/list_user/:user_id',(require,response)=>{
    let user_id = require.params.user_id;
    let sql = `SELECT id, member_code, name, username, balance, status FROM member WHERE id='${user_id}' AND status_delete='N' 
    ORDER BY member_code ASC`;
    connection.query(sql,(error,results)=>{
        if(error){ console.log(error) }
        response.send({
            message: "member select",
            data: results
        });

        return response;
    });
});

http://localhost:5000/games
app.get('/games',(require,response)=>{
    let sql = `SELECT id, game_name, image, status FROM game WHERE status_delete='N' ORDER BY game_name ASC`;
    connection.query(sql,(error,results) =>{
        if(error){ console.log(error); }
        response.send({
            message: 'game all',
            data: results
        });

        return response;
    });
});

http://localhost:5000/game/1
app.get('/game/:game_id',(require,response)=>{
    let game_id = require.params.game_id;
    let sql = `SELECT id, game_name, image, status FROM game WHERE id='${game_id}' AND status_delete='N' ORDER BY game_name ASC`;
    connection.query(sql,(error,results) =>{
        if(error){ console.log(error); }
        response.send({
            message: 'game select',
            data: results
        });

        return response;
    });
});

http://localhost:5000/user_play/user/1
app.get('/user_play/user/:user_id',(require,response)=>{
    let user_id = require.params.user_id;
    let sql = `SELECT member.id AS member_id, member.member_code AS member_code, member.name AS name, member.balance AS balance, 
    user_play.bet AS bet, user_play.win AS win, user_play.tiles AS tiles, winline AS winline FROM user_play, member 
    WHERE user_play.member_id=member.id AND member.id='${user_id}' AND member.status='Y' ORDER BY member.created_at DESC`;
    connection.query(sql,(error,results)=>{
        if(error){ console.log(error) }
        response.send({
            message: 'member play',
            data: results
        });

        return response;
    });
});


app.post('/user_play/add/:user_id',(require,response)=>{
    let user_id = require.params.user_id;
    let game_id = require.body.game_id;
    let bet = require.body.bet;
    let win = require.body.win;
    let tiles = require.body.tiles;
    let winline = require.body.winline;
    let sql_check = `SELECT id, member_code, name, username, balance, status FROM member WHERE id='${user_id}' AND status_delete='N' 
    ORDER BY member_code ASC`;
    connection.query(sql_check,(error,results)=>{
        if(results.length > 0){
            let sql = `INSERT INTO user_play (member_id, game_id, bet, win, tiles, winline, created_at) value ('${user_id}','${game_id}','${bet}','${win}','${tiles}','${winline}', now())`;
            connection.query(sql,(error,results)=>{
                if(error){console.log(error)}
                response.send({
                    message: "Data created Success",
                    data: results
                });

                return response;
            });
        }else{
            response.send({
                message: "No Data member",
                data: results
            });

            return response;
        } 
    });
});

http://localhost:5000/user_play/add/1
app.get('/user_play/add/:user_id',(require,response)=>{
    let user_id = require.params.user_id;

    axios.post('http://localhost:5000/user_play/add/'+user_id,{
        "member_id": user_id,
        "game_id": 1,
        "balance": 100.50,
        "bet": 10,
        "win" : 10,
        "tiles":["index1", "index2"],
        'winline': 1
    })
    .then(res => {
        console.log(res.data);
    })
    .catch(error =>{
        console.log(error);
    });

});