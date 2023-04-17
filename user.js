const mysql = require('mysql2')
require('dotenv').config()
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD
});

module.exports = class User {
  constructor(name, username, password) {
    this.name = name;
    this.username = username;
    this.password = password;
  }
  
  static save(user) {
    return db.execute(
     `INSERT INTO admin (name, username, password, created_at, updated_at) value ('${user.name}','${user.username}','${user.password}',now(), now())`
    );
  }
};