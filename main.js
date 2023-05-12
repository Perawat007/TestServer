const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const useragent = require('express-useragent');
const ejs = require('ejs');
const mysql = require('mysql2') //npm install mysql2
const axios = require('axios'); //npm install axios
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const postsRoutes = require('./routes/posts')
const os = require('os');
const auth = require('./middleware/auth');
var cors = require('cors');

require('dotenv').config()
app.engine("html", ejs.renderFile);
app.use(useragent.express());
app.use(cors());
app.use(bodyParser.json());
app.use('/post', postsRoutes);
app.listen(5000, () => console.log(`Listening on port... ${5000}`));

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
  });
 
//http://localhost:5000/list_admins
app.post('/list_admins',auth,async(require,response)=>{
    const searchKeyword = require.body.name;
    const pageSize = require.body.pageSize;
    const pageNumber = require.body.pageIndex;
    const offset = (pageNumber - 1) * pageSize;
    if (searchKeyword === ''){
        let sql = `SELECT id, name, username, status, contact_number FROM admin WHERE status_delete='N' LIMIT ${pageSize} OFFSET ${offset}`;
        connection.query(sql,async(error,results) =>{
            if(error){ console.log(error); }
            const totalCount = `SELECT COUNT(*) as count FROM admin WHERE status_delete='N' `
            connection.query(totalCount,(error,res) =>{
                if(error){ console.log(error); }
                response.send({
                message: 'adminNOSearch',
                data: results,
                total: res[0].count
            });
    
            response.end();
            });
        });
    }else{
        let sql = `SELECT id, name, username, status, contact_number  FROM admin WHERE status_delete='N' AND 
        username LIKE '%${searchKeyword}%' OR name LIKE '%${searchKeyword}%' OR id LIKE '%${searchKeyword}%' OR contact_number LIKE '%${searchKeyword}%'
        LIMIT ${pageSize} OFFSET ${offset}`;
        connection.query(sql,async(error,results) =>{
            if(error){ console.log(error); }
                response.send({
                message: 'adminSearch',
                data: results,
                total: results.length
            });
            response.end();
        });
    }
});


//http://localhost:5000/list_idAgent
app.get('/list_idAgent',auth,async (require,response)=>{
    let sql = `SELECT id FROM agent WHERE status_delete='N'`;
    connection.query(sql,async(error,results) =>{
        if(error){ console.log(error); }
            response.send({
            message: 'AllIDAgent',
            data: results
        });
        response.end();
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

        response.end();
    });
});

//http://localhost:5000/list_agents
app.post('/list_agents',auth,(require,response)=>{
    const searchKeyword = require.body.name;
    const pageSize = require.body.pageSize;
    const pageNumber = require.body.pageIndex;
    const offset = (pageNumber - 1) * pageSize;

    if (searchKeyword === ''){
        let sql = `SELECT id, name, username, status, contact_number, credit FROM agent WHERE status_delete='N' LIMIT ${pageSize} OFFSET ${offset}`;
        connection.query(sql,async(error,results) =>{
            if(error){ console.log(error); }
            const totalCount = `SELECT COUNT(*) as count FROM agent WHERE status_delete='N'`
            connection.query(totalCount,(error,res) =>{
                if(error){ console.log(error); }
                response.send({
                message: 'agentNoSearch',
                data: results,
                total: res[0].count
            });
    
            response.end();
            });
        });
    }else{
        let sql = `SELECT id, name, username, status, contact_number, credit FROM agent WHERE status_delete='N' AND 
        username LIKE '%${searchKeyword}%' OR name LIKE '%${searchKeyword}%' OR id LIKE '%${searchKeyword}%' OR contact_number LIKE '%${searchKeyword}%'
        LIMIT ${pageSize} OFFSET ${offset}`;
        connection.query(sql,async(error,results) =>{
            if(error){ console.log(error); }
                response.send({
                message: 'agent_Search',
                data: results,
                total: results.length
            });
            response.end();
        });
    }
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

        response.end();
    });
});

//http://localhost:5000/list_users/agent/1
app.get('/list_users/agent/:agent_id',(require,response)=>{
    let agent_id = require.params.agent_id;
    let sql = `SELECT id, member_code, name, username, credit, status FROM member WHERE agent_id='${agent_id}' AND status_delete='N' 
    ORDER BY member_code ASC`;
    connection.query(sql,(error,results) =>{
        if(error){ console.log(error); }
        response.send({
            message: 'agent member all',
            data: results
        });

        response.end();
    });
});

//http://localhost:5000/list_users
app.post('/list_users',auth,(require,response)=>{
    const searchKeyword = require.body.name;
    const pageSize = require.body.pageSize;
    const pageNumber = require.body.pageIndex;
    const offset = (pageNumber - 1) * pageSize;

   if (searchKeyword === ""){
        let sql = `SELECT id, username_agent, member_code, name, username, credit, status, created_at FROM member WHERE status_delete='N' LIMIT ${pageSize} OFFSET ${offset}`;
        connection.query(sql,async(error,results) =>{
            if(error){ console.log(error); }
            else{
                const totalCount = `SELECT COUNT(*) as count FROM member WHERE status_delete='N'`
                connection.query(totalCount,(error,res) =>{
                    if(error){ console.log(error); }
                    response.send({
                    message: 'memberSearchAll',
                    data: results,
                    total: res[0].count
                });
        
                response.end();
                });
            }
        });
    }else{
        let sql = `SELECT id, username_agent, member_code, name, username, credit, status, created_at FROM member WHERE status_delete='N' 
        AND username LIKE '%${searchKeyword}%' OR name LIKE '%${searchKeyword}%' OR username_agent LIKE '%${searchKeyword}%' LIMIT ${pageSize} OFFSET ${offset}`;
        connection.query(sql,async(error,results) =>{
            if(error){ console.log(error); }
                response.send({
                message: 'memberSearch',
                data: results,
                total: results.length
            });
            response.end();
        });
    }
});

http://localhost:5000/list_user/1
app.get('/list_user/:user_id',(require,response)=>{
    let user_id = require.params.user_id;
    let sql = `SELECT id, member_code, name, username, credit, status FROM member WHERE id='${user_id}' AND status_delete='N' 
    ORDER BY member_code ASC`;
    connection.query(sql,(error,results)=>{
        if(error){ console.log(error) }
        response.send({
            message: 'member id',
            data: results
        });

        response.end();
    });
});

http://localhost:5000/list_userGame/1 
app.get('/list_userGame/:user_id',(require,response)=>{
    let user_id = require.params.user_id;
    let sql = `SELECT username, credit, bet_latest FROM member WHERE id='${user_id}' AND status_delete='N' 
    ORDER BY member_code ASC`;
    connection.query(sql,(error,results)=>{
        if(error){ console.log(error) }
        console.log(results);
        response.json(results[0]);
    });
});


app.post('/user/add',(require,response)=>{
    let member_code = require.member_code;
    let name = require.name;
    let username = require.username;
    let password = require.password;
    let sql = `SELECT id, member_code, name, username, credit, status FROM member WHERE id='${user_id}' AND status_delete='N' 
    ORDER BY member_code ASC`;
    connection.query(sql,(error,results)=>{
        if(error){ console.log(error) }
        response.send({
            message: "member select",
            data: results
        });

        response.end();
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

        response.end();
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

        response.end();
    });
});

http://localhost:5000/user_play/user/1
app.get('/user_play/user/:user_id',(require,response)=>{
    let user_id = require.params.user_id;
    let sql = `SELECT user_play.id AS play_id, member.id AS member_id, member.member_code AS member_code, member.name AS name, member.credit AS credit, 
    user_play.bet AS bet, user_play.win AS win, user_play.tiles AS tiles, winline AS winline FROM user_play, member 
    WHERE user_play.member_id=member.id AND member.id='${user_id}' AND member.status='Y' ORDER BY user_play.id DESC`;
    connection.query(sql,(error,results)=>{
        if(error){ console.log(error) }
        response.send({
            message: "member play",
            data: results
        });

        response.end();
    });
});

http://localhost:5000/user_play/user_lay/1
app.post('/user_play/user_lay/:user_id',(require,response)=>{
    let user_id = require.params.user_id;
    const pageSize = require.body.pageSize;
    const pageNumber = require.body.pageIndex;
    const offset = (pageNumber - 1) * pageSize;

    let sql = `SELECT id, member_id, game_id, bet, credit, win, winline, created_at FROM user_play
    WHERE member_id = '${user_id}' LIMIT ${pageSize} OFFSET ${offset}`;
    connection.query(sql,(error,results)=>{
        const dataLog = results;
        if(error){ console.log(error) }
        const totalCount = `SELECT COUNT(*) as count FROM user_play WHERE member_id = '${user_id}'`
        connection.query(totalCount,(error,res) =>{
            if(error){ console.log(error); }
            response.send({
            message: 'user_playSearch',
            data: dataLog,
            total: res[0].count
        });

        response.end();
        });
    });
});

http://localhost:5000/login/admin  Login Admin
app.post('/login/admin', async (require, response, next) => {
    let username = require.body.username;
    let password = require.body.password;

    let sql = `SELECT * FROM admin WHERE username='${username}' AND status_delete='N' ORDER BY username ASC`;
    connection.query(sql, async (error,results)=>{
        try {
            const data = results;
            if (data.length !== 1) {
              const error = new Error('A user with this email could not be found.');
              error.statusCode = 401;
              throw error;
            }
            const storedUser = data[0];
            const passwordMatches = await bcrypt.compare(password, storedUser.password);
            
            if (!passwordMatches ) {
              const error = new Error('Wrong password!');
              error.statusCode = 401;
              throw error;
            }
            const token = jwt.sign(
                {
                  username: storedUser.Username,
                  userId: storedUser.ID,
                  role: storedUser.Role
                },
                'secretfortoken',
                { expiresIn: '2h' }
            );
            response.status(201).json({ token: token, data: storedUser});
            } catch (err) {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          }
    });
   
});

http://localhost:5000/login/agent  Login Agent
app.post('/login/agent', async (require, response, next) => {
    let username = require.body.username;
    let password = require.body.password;

    let sql = `SELECT * FROM agent WHERE username='${username}' AND status_delete='N' ORDER BY username ASC`;
    connection.query(sql, async (error,results)=>{
        try {
            const data = results;
            if (data.length !== 1) {
              const error = new Error('A user with this email could not be found.');
              error.statusCode = 401;
              throw error;
            }
            const storedUser = data[0];
            const passwordMatches = await bcrypt.compare(password, storedUser.password);
            
            if (!passwordMatches ) {
              const error = new Error('Wrong password!');
              error.statusCode = 401;
              throw error;
            }
            const token = jwt.sign(
                {
                  username: storedUser.username,
                  userId: storedUser.id
                },
                'secretfortoken',
                { expiresIn: '2h' }
            );
            response.status(201).json({ token: token, data: storedUser});
            } catch (err) {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          }
    });
   
});

http://localhost:5000/login/member  Login Member
app.post('/login/member', async (require, response, next) => {
    let username = require.body.username;
    let password = require.body.password;
    let ip_address = require.body.ip_address;

    //start check ip address
    const networkInterfaces = os.networkInterfaces();
    const ipAddress = Object.keys(networkInterfaces).reduce((acc, interfaceName) => {
    const interfaceInfo = networkInterfaces[interfaceName];
    const ipv4Info = interfaceInfo.find(info => info.family === 'IPv4' && !info.internal);
    if (ipv4Info) {
      acc = ipv4Info.address;
    }
    return acc;
    }, '');
    // end check ip address

    //start check Browser
    const userAgent = require.headers['user-agent'];
    let browser;
    if (userAgent.includes('Chrome')) {
    browser = 'Google Chrome';
    } else if (userAgent.indexOf('Firefox') > -1) {
    browser = 'Mozilla Firefox';
    } else if (userAgent.indexOf('Safari') > -1) {
    browser = 'Apple Safari';
    } else if (userAgent.indexOf('Opera') > -1) {
    browser = 'Opera';
    } else if (userAgent.indexOf('Edg') > -1) {
    browser = 'Microsoft Edge';
    } else if (userAgent.indexOf('Trident') > -1) {
    browser = 'Microsoft Internet Explorer';
    }
    else{
    browser = 'Google Chrome';
    }
    // end check ip Browser

    let browserName = require.body.browserName;
    let sql = `SELECT id, credit, name, username, password FROM member WHERE username='${username}' AND status_delete='N' ORDER BY username ASC`;
    connection.query(sql, async (error,results)=>{
        try {
            let update = `UPDATE member set ip_address = '${ipAddress}',browserlogin = '${browser}' WHERE id='${results[0].id}'`;
            connection.query(update, async (error,results)=>{
                if(error){ console.log(error) }
            })
            const data = results;
            if (data.length !== 1) {
              const error = new Error('A user with this email could not be found.');
              error.statusCode = 401;
              throw error;
            }
            const storedUser = data[0];

            const hashedPassword = md5(password);
            if (hashedPassword !== storedUser.password) {
                return response.status(401).json({ message: 'Incorrect password' });
            }
            const token = jwt.sign(
                {
                  id: storedUser.id,
                  username: storedUser.username,
                  credit: storedUser.credit,
                  passwordCode : hashedPassword
                },
                'secretfortoken',
                { expiresIn: '2h' }
            );
            response.status(201).json({ token: token});
            } catch (err) {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          }
    });
   
});

http://localhost:5000/signup  Add Admin
app.post('/signup', async (req, res, next) => {
  const name = req.body.name; //รับDataจากForm
  const username = req.body.username; //รับDataจากForm
  const password = req.body.password; //รับDataจากForm
  const contact_number = req.body.contact_number
  let sql_check = `SELECT * FROM admin WHERE username='${username}' ORDER BY username ASC`;
  connection.query(sql_check, async (error,results)=>{
    try {
        const data = results;
        if (data.length !== 1) {
            const hashedPassword = await bcrypt.hash(password, 12);
            const userDetails = {
              name: name,
              username: username,
              password: hashedPassword,
            };
            let sql =  `INSERT INTO admin (name, username, password, contact_number, created_at, updated_at)
            value ('${userDetails.name}','${userDetails.username}','${userDetails.password}','${contact_number}',now(), now())`;
            connection.query(sql,(error,result)=>{
                if(error){ console.log(error) }
                res.send({
                    message: "Data created Success"
                });
                res.end();
            });
        }
        else{
            res.send({
                message: "Data Creates False"
            });
            res.end();
        }
      } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
  })
});

http://localhost:5000/signupAgent Add Agent
app.post('/signupAgent', async (req, res, next) => {
  const name = req.body.name; //รับDataจากForm
  const username = req.body.username; //รับDataจากForm
  const password = req.body.password; //รับDataจากForm
  const contact_number = req.body.contact_number
  const credit = req.body.credit;

  let sql_check = `SELECT * FROM agent WHERE username='${username}' ORDER BY username ASC`;
  connection.query(sql_check, async (error,results)=>{
    try {
        const data = results;
        if (data.length !== 1) {
            const hashedPassword = await bcrypt.hash(password, 12);
            const userDetails = {
              name: name,
              username: username,
              password: hashedPassword,
            };
            let sql = `INSERT INTO agent (name, username, password, contact_number, credit, created_at, updated_at) 
            value ('${userDetails.name}','${userDetails.username}','${userDetails.password}','${contact_number}','${credit}',now(), now())`;
            connection.query(sql,(error,result)=>{
                if(error){ console.log(error) }
                res.send({
                    message: "Data created Success"
                });
                res.end();
            });
        }
        else{
            res.send({
                message: "Data Creates False"
            });
            res.end();
        }
      } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
  })
});

http://localhost:5000/signupMember Add Member
app.post('/signupMember', async (req, res, next) => {
  const agent_id = req.body.agent_id;
  const member_code = req.body.member_code; //รับDataจากForm
  const name = req.body.name; 
  const username = req.body.username; 
  const password = req.body.password;
  const hashedPassword = md5(password);
  let sql_check = `SELECT * FROM member WHERE username='${username}' ORDER BY username ASC`;
  connection.query(sql_check, async (error,results)=>{
    try {
        const data = results;
        if (data.length !== 1 || data.length < 1) {
            let sql_agent= `SELECT username FROM agent WHERE id='${agent_id}'`;
            connection.query(sql_agent,(error,usernameAgent)=>{
                if(error){ console.log(error) }
                else{
                //const hashedPassword = await bcrypt.hash(password, 12);
                 let sql = `INSERT INTO member (agent_id, username_agent, member_code, name, username, password, created_at, updated_at) 
                    value ('${agent_id}','${usernameAgent[0].username}','${member_code}','${name}','${username}','${hashedPassword}',now(), now())`;
                    connection.query(sql,(error,result)=>{
                    if(error){ console.log(error) }
                    res.send({
                    message: "Data created Success"
                    });
                res.end();
            });
                }
            });
        }
        else{
            res.send({
                message: "Data Creates False"
            });
            res.end();
        }
      } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
  })
});

//http://localhost:5000/agent/1  Update Agent
app.put('/agent/:id', async (req, res, next) => {
  const id = req.params.id;
  const edittype = req.body.edittype;
  const idedit = req.body.idedit;
  const username = req.body.username;
  const name = req.body.name;
  const status = req.body.status;
  const contact_number = req.body.contact_number;
  const credit = req.body.credit;
  try {
    let sql_before= `SELECT * FROM agent WHERE id ='${id}' ORDER BY username ASC`;
    connection.query(sql_before,(error,resultBefore)=>{
      if(error){ console.log(error) }
      else{
        let sql = `UPDATE agent set username = '${username}', name = '${name}', status = '${status}', contact_number = '${contact_number}', credit = '${credit}'  WHERE id='${id}'`;
          connection.query(sql,(error,result)=>{
          if(error){ console.log(error) }
          else{
              let sql_before= `INSERT INTO logeditagent (edittype, idedit, agentid, name, editbefore, editafter, created_at) value 
              ('admin','${idedit}','${id}','${name}','${'name : '+ resultBefore[0].name+ ' , ' + 'status : '+ resultBefore[0].status + ' , ' +'contact_number : ' + resultBefore[0].contact_number}
              ','${'name : '+ name +' , ' + 'status : '+ status +' , '+'contact_number : ' + contact_number}',now())`;
              connection.query(sql_before,(error,resultAfter) =>{
                  if(error){ console.log(error); }
                  res.send({
                          message: "Data Update Success",
                  });
                  res.end();
              });
          }
          });
      }
  });
} catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
}

});

//http://localhost:5000/admin/1  Update Admin
app.put('/admin/:id', async (req, res, next) => {
    const id = req.params.id;
    const idedit = req.body.idedit;
    const username = req.body.username;
    const name = req.body.name;
    const status = req.body.status;
    const contact_number = req.body.contact_number;
      try {
        let sql_before= `SELECT * FROM admin WHERE id ='${id}' ORDER BY username ASC`;
        connection.query(sql_before,(error,resultBefore)=>{
          if(error){ console.log(error) }
          else{
            let sql = `UPDATE admin set username = '${username}',name = '${name}', status = '${status}', contact_number = '${contact_number}' WHERE id='${id}'`;
              connection.query(sql,(error,result)=>{
              if(error){ console.log(error) }
              else{
                  let sql_before= `INSERT INTO logeditadmin (edittype, idedit, adminid, name, editbefore, editafter, created_at) value 
                  ('admin','${idedit}','${id}','${name}','${'name : '+ resultBefore[0].name+ ' , ' + 'status : '+ resultBefore[0].status + ' , ' +'contact_number : ' + resultBefore[0].contact_number}
                  ','${'name : '+ name +' , ' + 'status : '+ status +' , '+'contact_number : ' + contact_number}',now())`;
                  connection.query(sql_before,(error,resultAfter) =>{
                      if(error){ console.log(error); }
                      res.send({
                              message: "Data Update Success",
                      });
                      res.end();
                  });
              }
              });
          }
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  });

  //http://localhost:5000/member/1  Update Member
app.put('/member/:id', async (req, res, next) => {
    const id = req.params.id;
    const edittype = req.body.edittype;
    const idedit = req.body.idedit;
    const member_code = req.body.member_code;
    const name = req.body.name;
    const username = req.body.username;
    const status = req.body.status;
    const credit = req.body.credit; 
    try {
      let sql_before= `SELECT * FROM member WHERE id ='${id}' ORDER BY username ASC`;
      connection.query(sql_before,(error,resultBefore)=>{
        if(error){ console.log(error) }
        else{
            let sql = `UPDATE member set member_code = '${member_code}', name = '${name}', username = '${username}', status = '${status}', credit = '${credit}' 
        WHERE id='${id}'`;
            connection.query(sql,(error,result)=>{
            if(error){ console.log(error) }
            else{

                let sql_before= `INSERT INTO logedit (edittype, idedit, idmember, name, editbefore, editafter, created_at) value 
                ('${edittype}','${idedit}','${id}','${name}','${'member_code : '+ resultBefore[0].member_code+ ' , ' + 'status : '+ resultBefore[0].status + ' , ' +'credit : ' + resultBefore[0].credit}
                ','${'member_code : '+ member_code +' , ' + 'status : '+ status +' , '+'credit : ' + credit}',now())`;

                connection.query(sql_before,(error,resultAfter) =>{
                    if(error){ console.log(error); }
                    res.send({
                            message: "Data Update Success",
                    });
                    res.end();
                });
            }
            });
        }
    });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  });

   //http://localhost:5000/deleteMember/1  Delete users
app.put('/delete/:id', async (req, res, next) => {
    const id = req.params.id;
    const user = req.body.user;
    let sql = `UPDATE ${user} set status_delete = 'Y' WHERE id='${id}'`;
    connection.query(sql,(error,result) =>{
        if(error){ console.log(error); }

        if(user === 'agent'){
            let sqlDeleteAgent = `UPDATE member set status_delete = 'Y' WHERE agent_id ='${id}'`;
            connection.query(sqlDeleteAgent,(error,result) =>{
                if(error){ console.log(error); }
                res.send({
                        message: "Delete Success",
                });
                res.end();
            });
        }
        else{
            res.send({ 
                message: "Delete Success",
        });
        res.end();
        }
    });
});

http://localhost:5000/logEdit/1
app.post('/logEdit/:user_id',(require,response)=>{
    let user_id = require.params.user_id;
    const pageSize = require.body.pageSize;
    const pageNumber = require.body.pageIndex;
    const offset = (pageNumber - 1) * pageSize;
    const typeLog = require.body.typeLog;
    
    if (typeLog === 'member'){
    let sql = `SELECT edittype, idedit, editbefore, editafter, created_at FROM logedit
    WHERE idmember = '${user_id}' LIMIT ${pageSize} OFFSET ${offset}`;
    connection.query(sql,(error,results)=>{
        const dataLog = results;
        if(error){ console.log(error) }
        const totalCount = `SELECT COUNT(*) as count FROM logedit WHERE idmember = '${user_id}'`
        connection.query(totalCount,(error,res) =>{
            if(error){ console.log(error); }
            response.send({
            message: 'user_playSearch',
            data: dataLog,
            total: res[0].count
        });

        response.end();
        });
    });
    }

    if (typeLog === "agent"){
        let sql = `SELECT edittype, idedit, editbefore, editafter, created_at FROM logeditagent
        WHERE agentid = '${user_id}' LIMIT ${pageSize} OFFSET ${offset}`;
        connection.query(sql,(error,results)=>{
            const dataLog = results;
            if(error){ console.log(error) }
            const totalCount = `SELECT COUNT(*) as count FROM logeditagent WHERE agentid = '${user_id}'`
            connection.query(totalCount,(error,res) =>{
                if(error){ console.log(error); }
                response.send({
                message: 'user_playSearch',
                data: dataLog,
                total: res[0].count
            });
    
            response.end();
            });
        });
    }
    if (typeLog === 'admin'){
        let sql = `SELECT edittype, idedit, editbefore, editafter, created_at FROM logeditadmin
        WHERE adminid = '${user_id}' LIMIT ${pageSize} OFFSET ${offset}`;
        connection.query(sql,(error,results)=>{
            const dataLog = results;
            if(error){ console.log(error) }
            const totalCount = `SELECT COUNT(*) as count FROM logeditadmin WHERE adminid = '${user_id}'`
            connection.query(totalCount,(error,res) =>{
                if(error){ console.log(error); }
                response.send({
                message: 'user_playSearch',
                data: dataLog,
                total: res[0].count
            });
    
            response.end();
            });
        });
    }
});


//getมาใช้ใน Dashboard
http://localhost:5000/getallData
app.get('/getallData', async (require, response, next) => {
    let sqlAdmin = `SELECT id FROM admin WHERE status_delete='N' ORDER BY username ASC`;
    let sqlAgent = `SELECT id FROM agent WHERE status_delete='N' ORDER BY username ASC`;
    let sqlMember = `SELECT id FROM member WHERE status_delete='N' ORDER BY username ASC`;
    let sqlGame = `SELECT * FROM game`;
    let sqlGamePlay = `SELECT * FROM loggame`;
    connection.query(sqlAdmin,(error,resultsAdmin) =>{
        if(error){ console.log(error); }
        connection.query(sqlAgent,(error,resultsAgent) =>{
            if(error){ console.log(error); }
            connection.query(sqlMember,(error,resultsMember) =>{
                if(error){ console.log(error); }
                connection.query(sqlGame,(error,resultsGame) =>{
                    if(error){ console.log(error); }
                    else{
                        connection.query(sqlGamePlay,(error,resultsGamePlay) =>{
                            if(error){ console.log(error); }
                            else{
                                response.send({
                                    dataAdmin: resultsAdmin.length,
                                    dataAgent: resultsAgent.length,
                                    dataMember: resultsMember.length,
                                    Member: resultsMember,
                                    dataGame: resultsGame,
                                    logGame: resultsGamePlay
                                });
                                response.end();
                            }
                        });
                    }
                });
            });
        });
    });
});


http://localhost:5000/play/game/add
//ส่งค่า post 2 ตัวคือ user_id, bet
//url เปลี่ยนเป็น http://relaxtimecafe.fun/play/game/save
app.post('/play/game/save/:user_id/:bet',(require,response)=>{
    //let user_id = require.body.user_id;
    let user_id = require.params.user_id;
    //let bet = 10;
    let bet = require.params.bet;
    let game_id = 1;

    let sql_check = `SELECT id, member_code, name, username, credit, status FROM member WHERE id='${user_id}' AND status_delete='N' 
    ORDER BY member_code ASC`;
    let sql_logGame = `SELECT play, bet, win FROM loggame WHERE id='${game_id}'`;

    connection.query(sql_check,(error,results_check)=>{
        if(results_check.length > 0){
            let user_credit = results_check[0].credit;
            if(user_credit == ""){ user_credit = 0; }
            let jsonGame = MainGame(user_credit,bet);
            let credit = jsonGame.balance;
            let win = jsonGame.win;
            let tiles = jsonGame.tiles;
            let winline = jsonGame.winline;
            let isWinFreeSpin = jsonGame.isWinFreeSpin
            const tilesArr = tiles.split(",").map(Number);
            const winlineArr = winline.split(",").map(Number)
            const wineArr = parseFloat(win);0
            let sql_insert = `INSERT INTO user_play (member_id, game_id, bet, win, tiles, winline, credit, created_at) 
            value ('${user_id}','${game_id}','${bet}','${win}','${tiles}','${winline}','${credit}',now())`;
            connection.query(sql_insert,(error,result_insert_play)=>{
                if(error){ 
                    console.log(error) 
                }else{
                    let spl_feesPin = `INSERT INTO game_feespin (member_id, game_id, game_feespin) value ('${user_id}','${game_id}','${isWinFreeSpin}')`;
                    connection.query(spl_feesPin,(error,result_feesPin)=>{
                        if(error){ 
                            console.log(error) 
                        }else{
                            let sql_update = `UPDATE member set credit='${credit}',bet_latest='${bet}' WHERE id='${user_id}'`;
                        connection.query(sql_update,(error,result_update_user)=>{
                            if(error){ 
                                console.log(error) 
                            }else{
                                connection.query(sql_logGame,(error,result_logGame)=>{
                                    if(error){ 
                                        console.log(error) 
                                    }else{
                                        const beteArr = parseFloat(bet);0
                                        const upPlay = result_logGame[0].play + 1;
                                        const upBet = result_logGame[0].bet + beteArr;
                                        const upWin = result_logGame[0].win + wineArr;
                                        let sql_logGameUpdate = `UPDATE loggame set play='${upPlay}',bet='${upBet}', win='${upWin}' 
                                        WHERE id='${game_id}'`;
                                        connection.query(sql_logGameUpdate,(error,result_logGameUpdate)=>{
                                            if(error){ 
                                                console.log(error) 
                                            }else{
                                                let sql = `SELECT id, member_code, name, username, credit, status FROM member WHERE id='${user_id}' AND status_delete='N' 
                                                ORDER BY member_code ASC`;
                                                connection.query(sql,(error,results)=>{
                                                    if(error){ console.log(error) }
                                                    response.send({
                                                        //message: 'member play game: '+game_id,
                                                         dataTiles: tilesArr,
                                                         dataCredit: results[0].credit,
                                                         dataWinLine: winlineArr,
                                                         dataFeeSpin: isWinFreeSpin,
                                                         dataWin : wineArr,
                                                         dataMember: results[0].member_code
                                                    }); 
                                                    response.end();
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                        }
                    });
                }
            });
        }else{
            response.send({
                message: "no member information",
            });
            response.end();
        } 
    });

    function CombinationCal(slot,tileNum,fromReel,toReel){
        let combi = 1;
        let count = 0;
    
        for(fromReel; fromReel < toReel; fromReel++){
            for(let j = 0; j < slot[fromReel].length; j++){
                if(slot[fromReel][j] == tileNum){
                    count++;
                }
            }
            combi *= count;
            count = 0;
        }
    
        return combi;
    }
    
    function MainGame(credit,bet){
        let win = 0;
        let lineCost = bet / 30;
        let tile15 = [];
        let winLine = [];
        let reels = [[],[],[],[],[]];
        let highestWinLine = [];
        let winingTile = [];
        let slotTemp = [];
        let jsArray = [];
        let isWinFreeSpin = false;

        const tileIndexLine = [ 
            [1,4,7,10,13 ],[0,3,6,9,12],[2,5,8,11,14],[0,4,8,10,12],[2,4,6,10,14],[0,3,7,9,12],[2,5,7,11,14],[1,5,8,11,13],[1,3,6,9,13],[0,4,7,10,12],
            [2,4,7,10,14],[1,4,6,10,13],[1,4,8,10,13],[0,5,8,11,12],[2,3,6,9,14],[1,3,7,9,13],[1,5,7,11,13],[0,5,6,11,12],[2,3,8,9,14],[0,4,6,10,12],
            [2,4,8,10,14],[0,5,7,11,12],[2,3,7,9,14],[1,3,8,9,13],[1,5,6,11,13],[0,3,8,9,12],[2,5,6,11,14],[0,3,6,9,14],[2,5,8,11,13],[1,4,7,10,12]
        ];
    
        const RewardTable = [
            [3,8,15],[3,8,15],[5,15,30],[5,15,30],[5,15,30],[5,15,30],[10,20,50],[10,20,50],[15,30,80],[15,30,80],[20,50,150],[50,150,500],[0,0,0]
        ];
    
        const slot = [
            [5, 4, 5, 2 , 4, 0, 1, 3, 6 ,0 ,7,8,9,10,11,12],[5, 4, 6, 2 , 0, 0, 1, 3, 6 ,1, 7, 8, 9, 10, 11,12],
            [5, 4, 5, 2 , 4, 0, 1, 3, 6, 6, 7, 8, 9, 10, 11,12],[5, 4, 5, 2 , 6, 0, 1, 3, 6, 4, 7, 8, 9, 10, 11,12],
            [5, 4, 5, 2 , 4, 0, 1, 5, 6, 3, 7, 8, 9, 10, 11,12]
        ];
    
        const combination = [[],[],[],[],[],[],[],[],[],[],[],[],[]];
    
        if(bet <= credit){
            for(let i = 0; i < 13 ;i++){
                combination[i].push(CombinationCal(slot,i,0,3));
                combination[i].push(CombinationCal(slot,i,1,4));
                combination[i].push(CombinationCal(slot,i,2,5));
                combination[i].push(CombinationCal(slot,i,0,4));
                combination[i].push(CombinationCal(slot,i,1,5));
                combination[i].push(CombinationCal(slot,i,0,5));
            }
            isWinFreeSpin = false;
            credit -= bet;
            reels = [[],[],[],[],[]];
            slotTemp = slot;
            
            for (let i = 0; i < 5; i++){
                for(let j = 0; j < 6; j++){
                    let rand = Math.floor(Math.random() * slotTemp[i].length);
                    reels[i].push(slotTemp[i][rand]);
                    if(j < 3){
                        tile15.push(reels[i][j]);
                    }
                    slotTemp[i].splice(rand,1);
                }
                slotTemp[i] = [];
            }
            
            let lastestTile = "";
    
            for (let j = 0; j < 30; j++){
                let tileCount = 1;
                let currentPayline = [];
                for (let x = 0; x < 5; x++) {
                    currentPayline[x] = tileIndexLine[j][x]
                }
                lastestTile = tile15[currentPayline[0]]//เอา frame ของ tile แรกเก็บไว้
                highestWinLine[j] = 0
        
                for(let i = 1; i <= 4 ;i++){
                    if(tile15[currentPayline[i]] == lastestTile){
                        tileCount += 1;
                        if(tileCount >= 3){
                            highestWinLine[j] = tileCount;
                            winingTile[j] = lastestTile;
        
                            if(highestWinLine[j] == 3){
                                win += lineCost * RewardTable[winingTile[j]][0]
                                if(winingTile[j] == 12){
                                    isWinFreeSpin = true;
                                }    
                            }else if(highestWinLine[j] == 4){
                                win += lineCost * RewardTable[winingTile[j]][1]
                            }else if(highestWinLine[j] == 5){
                                win += lineCost * RewardTable[winingTile[j]][2]
                            }
                        }
                    }else{
                        lastestTile = tile15[currentPayline[i]];
                        tileCount = 1;
                    }
                }
        
                if(winingTile[j] == null){
                    winingTile[j] = undefined;
                }
            }
    
            for (let j = 0; j < 30; j++){
                if (highestWinLine[j] != 0){
                    winLine.push(j);
                }
            }
            credit += win;
        }
        jsArray = '{"balance": \"'+credit+'\","bet":\"'+bet+'\","win":\"'+win+'\","tiles":\"'+tile15+'\","winline":\"'+winLine+'\","isWinFreeSpin":\"'+isWinFreeSpin+'\"}';
        jsArray = JSON.parse(jsArray);
        return jsArray;
    }
});
