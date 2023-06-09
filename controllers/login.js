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

http://localhost:5000/post/checkBalance 
exports.checkBalance = async (req, res) => {
  const id = req.body.id;
  const timestampMillis = req.body.timestampMillis;
  const productId = req.body.productId;
  const currency = req.body.currency;
  const authHeader = req.body.sessionToken;
  const usernameGame = req.body.username;

  username = 'member001';

  if (!authHeader) {
    const error = new Error('Not authenticated!');
    error.statusCode = 500;
  }

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const timestamp = parseInt(timestampMillis);
        const balanceUser = parseFloat(results[0].credit);
        res.status(201).json({
          id: id,
          statusCode: 0,
          timestampMillis: timestamp,
          productId: productId,
          currency: currency,
          balance: balanceUser,
          username: usernameGame
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/settleBets 
exports.settleBets = async (req, res) => {
  const id = req.body.id;
  const timestampMillis = req.body.timestampMillis;
  const productId = req.body.productId;
  const currency = req.body.currency;
  const usernameGame = req.body.username;
  const txnsGame = req.body.txns;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const timestamp = parseInt(timestampMillis);
        const balanceUser = parseFloat(results[0].credit);
        const betPlay = txnsGame[0].betAmount;
        const betPlayOut = txnsGame[0].payoutAmount;
        const balanceNow = balanceUser - betPlay + betPlayOut;
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${betPlay}' WHERE username ='${username}'`;

        connection.query(sql_update, (error, resultsGame) => {
          if (error) { console.log(error) }
          else {
            res.status(201).json({
              id: id,
              statusCode: 0,
              timestampMillis: timestamp,
              productId: productId,
              currency: currency,
              balanceBefore: balanceUser,
              balanceAfter: balanceNow,
              username: usernameGame
            });
          }
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

//SlotXO-------------------------------------------------------------------------------------------------------------------------------------------------------------------
http://localhost:5000/post/authenticate-token 
exports.authenticate = async (req, res) => {
  const authHeader = req.body.token;
  const ip = req.body.ip;
  const timestampMillis = req.body.timestampMillis;
  const userUsername = "victest2"
  username = 'member001';
  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        console.log(authHeader, ip, balanceUser);
        res.status(200).json({
          Status: 0,
          Message: "Success",
          Username: userUsername,
          Balance: balanceUser
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/balance 
exports.balanceXO = async (req, res) => {
  const timestampMillis = req.body.timestampMillis;
  const usernameGame = req.body.username;
  username = 'member001';
  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        res.status(201).json({
          Status: 0,
          Message: "Success",
          Username: usernameGame,
          Balance: balanceUser
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/bet 
exports.PlaceBetSlotXo = async (req, res) => {
  const id = req.body.id;
  const amount = req.body.amount;
  const timestampMillis = req.body.timestampMillis;
  const roundid = req.body.roundid;
  const usernameGame = req.body.username;
  const gamecode = req.body.gamecode;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser - amount;
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${amount}' WHERE username ='${username}'`;
        connection.query(sql_update, (error, resultsGame) => {
          if (error) { console.log(error) }
          else {
            res.status(201).json({
              Status: 0,
              Message: "Success",
              Username: usernameGame,
              Balance: balanceNow
            });
          }
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/settle-bet 
exports.SettlePlaySlotXo = async (req, res) => {
  const amount = req.body.amount;
  const usernameGame = req.body.username;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser + amount;
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${amount}' WHERE username ='${username}'`;
        connection.query(sql_update, (error, resultsGame) => {
          if (error) { console.log(error) }
          else {
            res.status(201).json({
              Status: 0,
              Message: "Success",
              Username: usernameGame,
              Balance: balanceNow
            });
          }
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/cancel-bet
exports.CancelPlaySlotXo = async (req, res) => {
  const usernameGame = req.body.username;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        connection.query(sql_update, (error, resultsGame) => {
          if (error) { console.log(error) }
          else {
            res.status(201).json({
              Status: 0,
              Message: "Success",
              Username: usernameGame,
              Balance: balanceUser
            });
          }
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/bonus-win
exports.bonusPlaySlotXo = async (req, res) => {
  const amount = req.body.amount;
  const usernameGame = req.body.username;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser + amount;
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${amount}' WHERE username ='${username}'`;
        connection.query(sql_update, (error, resultsGame) => {
          if (error) { console.log(error) }
          else {
            res.status(201).json({
              Status: 0,
              Message: "Success",
              Username: usernameGame,
              Balance: balanceNow
            });
          }
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/jackpot-win
exports.JackpotPlaySlotXo = async (req, res) => {
  const amount = req.body.amount;
  const usernameGame = req.body.username;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser + amount;
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${amount}' WHERE username ='${username}'`;
        connection.query(sql_update, (error, resultsGame) => {
          if (error) { console.log(error) }
          else {
            res.status(201).json({
              Status: 0,
              Message: "Success",
              Username: usernameGame,
              Balance: balanceNow
            });
          }
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/transaction
exports.TransactionSlotXo = async (req, res) => {
  const amount = req.body.amount;
  const usernameGame = req.body.username;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser + amount;
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${amount}' WHERE username ='${username}'`;
        connection.query(sql_update, (error, resultsGame) => {
          if (error) { console.log(error) }
          else {
            res.status(201).json({
              Status: 0,
              Message: "Success",
              Username: usernameGame,
              Balance: balanceNow
            });
          }
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/withdraw
exports.WithdrawSlotXo = async (req, res) => {
  const amount = req.body.amount;
  const usernameGame = req.body.username;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser - amount;
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${0}' WHERE username ='${username}'`;
        connection.query(sql_update, (error, resultsGame) => {
          if (error) { console.log(error) }
          else {
            res.status(201).json({
              Status: 0,
              Message: "Success",
              Username: usernameGame,
              Balance: balanceNow
            });
          }
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/deposit
exports.DepositSlotXo = async (req, res) => {
  const amount = req.body.amount;
  const usernameGame = req.body.username;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser + amount;
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${0}' WHERE username ='${username}'`;
        connection.query(sql_update, (error, resultsGame) => {
          if (error) { console.log(error) }
          else {
            res.status(201).json({
              Status: 0,
              Message: "Success",
              Username: usernameGame,
              Balance: balanceNow
            });
          }
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

//Askmebet-------------------------------------------------------------------------------------------------------------------------------------------------------------

http://localhost:5000/post/api/wallet/balance
exports.GetBalanceAsk = async (req, res) => {
  const agent = req.body.agent;
  const account = req.body.account;
  const authHeader = req.body.token;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        res.status(201).json({
          "status": 1,
          "balance": balanceUser
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/api/wallet/bet
exports.PlaceBetAsk = async (req, res) => {
  const trans_id = req.body.trans_id;
  const agent = req.body.agent;
  const account = req.body.account;
  const game_id = req.body.game_id;
  const amount = req.body.amount;
  const authHeader = req.body.token;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser - amount;
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${amount}' WHERE username ='${username}'`;
        connection.query(sql_update, (error, resultsGame) => {
          if (error) { console.log(error) }
          else {
            res.status(201).json({
              status: 1,
              trans_id: trans_id,
              balance: balanceNow
            });
          }
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/api/wallet/payout
exports.SettleBetAsk = async (req, res) => {
  const trans_id = req.body.trans_id;
  const agent = req.body.agent;
  const account = req.body.account;
  const game_id = req.body.game_id;
  const amount = req.body.amount;
  const authHeader = req.body.token;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser + amount;
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${0}' WHERE username ='${username}'`;
        connection.query(sql_update, (error, resultsGame) => {
          if (error) { console.log(error) }
          else {
            res.status(201).json({
              status: 1,
              trans_id: trans_id,
              balance: balanceNow
            });
          }
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/api/wallet/cancel
exports.CancelBetAsk = async (req, res) => {
  const trans_id = req.body.trans_id;
  const agent = req.body.agent;
  const account = req.body.account;
  const game_id = req.body.game_id;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        res.status(201).json({
          status: 1,
          trans_id: trans_id,
          balance: balanceUser
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

//JILI Seamless Integration APIs

http://localhost:5000/post/Jili/auth
exports.PlayerAuthenticationJili = async (req, res) => {
  const reqId = req.body.reqId;
  const authHeader = req.body.token;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        res.status(201).json({
          errorCode: 0,
          message: "success",
          username: "victest2",
          currency: "THB",
          balance: balanceUser,
          token: authHeader
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/Jili/bet
exports.PlayerBetJili = async (req, res) => {
  const reqId = req.body.reqId;
  const authHeader = req.body.token;
  const round = req.body.round;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        res.status(201).json({
          errorCode: 0,
          message: "success",
          username: "victest2",
          currency: "THB",
          balance: balanceUser,
          txId: round,
          token: authHeader
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/Jili/cancelBet
exports.CancelBetJili = async (req, res) => {
  const reqId = req.body.reqId;
  const authHeader = req.body.token;
  const round = req.body.round;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        res.status(201).json({
          errorCode: 0,
          message: "Success",
          username: "victest2",
          currency: "THB",
          balance: balanceUser,
          txId: round,
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};