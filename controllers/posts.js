const { response } = require("express");
const mysql = require('mysql2') //npm install mysql2
const jwt = require('jsonwebtoken');
const os = require('os');
require('dotenv').config()

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD
});

http://localhost:5000/post/test
exports.getOne = async (req, res, next) => {
    const networkInterfaces = os.networkInterfaces();

    const ipAddress = Object.keys(networkInterfaces).reduce((acc, interfaceName) => {
    const interfaceInfo = networkInterfaces[interfaceName];
    const ipv4Info = interfaceInfo.find(info => info.family === 'IPv4' && !info.internal);
    
    if (ipv4Info) {
      acc = ipv4Info.address;
    }
  
    return acc;
  }, '');
  console.log('IP address:', ipAddress);
  try {
    res.send('Hello World!');
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.getGame = async (req, res, next) => {
  let sql = `SELECT * FROM allgame`;
  try {
    connection.query(sql,(error,results) =>{
        if(error){ console.log(error); }
        else{
          res.send({
            message: 'gameAll',
            data: results,
        });
        res.end();
        }
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

http://localhost:5000/post/convertToken
exports.convertToken = async (req, res) => {
  const authHeader = req.body.Authorization;
  //start check ip address
  //const ip_address = req.body.ip_address;
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
const userAgent = req.headers['user-agent'];
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

  if (!authHeader) {
    const error = new Error('Not authenticated!');
    throw error;
  }
  const token = authHeader;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secretfortoken')
    let splip = `SELECT ip_address, browserlogin FROM member WHERE username ='${decodedToken.username}' AND status_delete='N' 
    ORDER BY member_code ASC`;
    connection.query(splip,(error,resultsIp)=>{
      if(error){ console.log(error) }
      if (resultsIp[0].ip_address !== ipAddress){
        const error = new Error('A user with this ip_address could not be found.');
        error.statusCode = 500;
        res.json({status:"A user with this ip_address could not be found."});
      }
      else{
        if (resultsIp[0].browserlogin !== browser){
          const error = new Error('A user with this browserlogin could not be found.');
          error.statusCode = 500;
          res.json({status:"A user with this browserlogin could not be found."});
        }
        else{
          let sql = `SELECT id, credit, bet_latest, name FROM member WHERE username ='${decodedToken.username}' AND status_delete='N' 
          ORDER BY member_code ASC`;
            connection.query(sql,(error,results)=>{
              if(error){ console.log(error) }
              else{
                res.json(results[0]);
              }
          });
        }
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({status:"A user with this Token could not be found."});
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated!');
    error.statusCode = 500;
  }
};

http://localhost:5000/post/convertData
exports.convertData = async (req, res, next) => {
  console.log(req.body.data);
  datauserMD5 = req.body.data;

  let sql = `SELECT id, credit, bet_latest, name FROM member WHERE password='${datauserMD5}' AND status_delete='N' 
  ORDER BY member_code ASC`;
 try {
    
    connection.query(sql,(error,results)=>{
        if(error){ console.log(error) }
        else{
          res.status(201).json({status:results[0]});
        }
    });
  } catch (err) {
    err.statusCode = '600';
    throw err;
  }
};

http://localhost:5000/post/logoutMember
exports.logoutMember = async (req, res, next) => {
  const memberID = req.body.memberID;
  let update = `UPDATE member set ip_address = 'null',browserlogin = 'null' WHERE id='${memberID}'`;
    connection.query(update,(error,result)=>{
      if(error){ console.log(error) }
      else{
        res.send({
        message: "Data Update Success",
      });
      res.end();
      }
    });
};

http://localhost:5000/post/logAgentMember/1
exports.logAgentMember = async (require, response) =>{
  const agentId = require.params.agentId;
  const searchKeyword = require.body.name;
  const pageSize = require.body.pageSize;
  const pageNumber = require.body.pageIndex;
  const offset = (pageNumber - 1) * pageSize;

  if (searchKeyword === ''){
      let sql = `SELECT id, name, username, status, credit, created_at FROM member WHERE status_delete='N' AND agent_id = ${agentId} LIMIT ${pageSize} OFFSET ${offset}`;
      connection.query(sql,async(error,results) =>{
          if(error){ console.log(error); }
          const totalCount = `SELECT COUNT(*) as count FROM member WHERE status_delete='N' `
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
      let sql = `SELECT id, name, username, status, credit, created_at FROM member WHERE status_delete='N' AND agent_id = ${agentId} AND 
      username LIKE '%${searchKeyword}%' OR name LIKE '%${searchKeyword}%' OR id LIKE '%${searchKeyword}%'
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
};