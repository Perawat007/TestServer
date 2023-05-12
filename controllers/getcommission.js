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

//http://localhost:5000/post/commissionGame
exports.getCommission = async (req, res, next) => {
  const today = new Date();
  const date = today.toISOString().slice(0, 10);

  let sql = `SELECT * FROM comgogoldplanet WHERE monthly = '${date}'`
  try {
    connection.query(sql,(error,results)=>{
      if(error){ console.log(error) }
      else{
        let sql_com = `SELECT commission FROM comgogoldplanet `
        connection.query(sql_com,(error,resultscom)=>{
          if(error){ console.log(error) }
          else{
            const dataD = {
              commission: resultscom
            };
            const transformedData = [{commission: dataD.commission.map((item) => item.commission),}]
            const dataA = {transformedData};
            const datacommission = dataA.transformedData.flatMap((item) => item.commission)
            res.send({
             data : results,
             datacommission
          });
          res.end();
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
};