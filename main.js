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

require('dotenv').config();
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
    let sql = "SELECT id, user_code, name FROM member WHERE status='Y' ORDER BY user_code ASC";
    connection.query(sql,(error,data) =>{
        console.log(error);
        response.send({
            message: 'member all',
            data: data
        });

        return response;
    });

});