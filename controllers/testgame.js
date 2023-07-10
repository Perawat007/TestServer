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

exports.saveTestGame = async (require, response) => {
    let user_id = require.params.user_id;
    let bet = require.params.bet;
    let game_id = require.params.game_id;

    const today = new Date();
    const date = today.toISOString().slice(0, 10);

    let sql_check = `SELECT id, member_code, name, username, credit, status FROM member WHERE id='${user_id}' AND status_delete='N' 
    ORDER BY member_code ASC`;
    let sql_logGame = `SELECT play, bet, win FROM loggame WHERE id='${game_id}'`;
    connection.query(sql_check, (error, results_check) => {
        if (results_check.length > 0) {
            let user_credit = results_check[0].credit;
            if (user_credit == "") { user_credit = 0; }
            user_credit -= bet
            let jsonGame = MainGame(user_credit, bet, true);
            let isWinFreeSpin = jsonGame.isWinFreeSpin;
            let credit = jsonGame.credit;
            let win = jsonGame.win;
            let tiles = jsonGame.tiles;
            let winline = jsonGame.winline;
            let winStyle = jsonGame.winStyle;
            let winCount = jsonGame.winCount;
            const tilesArr = tiles.split(",").map(Number);
            const winlineArr = winline.split(",").map(Number)
            const winCountArr = winCount.split(",").map(Number)
            const wineArr = parseFloat(win); 0
            const beteArr = parseFloat(bet); 0

            let sql_insert = `INSERT INTO user_play (member_id, game_id, bet, win, tiles, winline, winstyle, winCount, credit, created_at, game_feespin) 
            value ('${user_id}','${game_id}','${bet}','${win}','${tiles}','${winline}','${winStyle}','${winCount}','${credit}',now(), '${isWinFreeSpin}')`;

            let selectSpl_commissionDay = `SELECT * FROM comgogoldplanet WHERE monthly = '${date}'`;

            if (isWinFreeSpin === 'true') {
                let totalWin = 0  //--ส่งไป client
                let arrayTiles = [];
                let arrayWin = [];
                let arrayCredit = [];
                let arrayWinStyle = [];
                let arrayWinLine = [];
                let arrayWinCount = [];
                arrayTiles.push(tilesArr);
                arrayWin.push(wineArr);
                arrayCredit.push(user_credit);
                arrayWinStyle.push(winStyle);
                arrayWinLine.push(winlineArr);
                arrayWinCount.push(winCountArr);
                totalWin += wineArr;
                let checkLoop = false;
                let x = 0;
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => {
                        let jsonGame = MainGame(user_credit, bet, false);
                        let win = jsonGame.win;
                        let tiles = jsonGame.tiles;
                        let winlineLoop = jsonGame.winline;
                        let winStyle = jsonGame.winStyle;
                        let winCount = jsonGame.winCount;
                        const tilesArr = tiles.split(",").map(Number);
                        const winlineArrLoop = winlineLoop.split(",").map(Number)
                        const winCountArr = winCount.split(",").map(Number)
                        const wineArr = parseFloat(win);
                        const beteArr = parseFloat(bet);
                        user_credit += wineArr;
                        totalWin += wineArr;
                        arrayTiles.push(tilesArr);
                        arrayWin.push(wineArr);
                        arrayWinStyle.push(winStyle);
                        arrayWinCount.push(winCountArr);
                        arrayCredit.push(user_credit);
                        arrayWinLine.push(winlineArrLoop);
                        let sql_insert = `INSERT INTO user_play (member_id, game_id, bet, win, tiles, winline, winstyle, winCount, credit, created_at, game_feespin) 
            value ('${user_id}','${game_id}','${bet}','${win}','${tiles}','${winlineArrLoop}','${winStyle}','${winCount}','${credit}',now(), '${isWinFreeSpin}')`;
                        console.log('run')
                        connection.query(sql_insert, (error, result_insert_play) => {
                            if (!error) {
                                response.sendStatus(500);
                                return;
                            } else {
                                const spl_feesPin = `INSERT INTO game_feespin (member_id, game_id, game_feespin) value ('${user_id}','${game_id}','${true}')`;
                                connection.query(spl_feesPin, (error, result_feesPin) => {
                                    if (error) {
                                        response.sendStatus(500);
                                        return;
                                    } else {
                                        const sql_update = `UPDATE member set credit='${user_credit}',bet_latest='${bet}' WHERE id='${user_id}'`;
                                        connection.query(sql_update, (error, result_update_user) => {
                                            if (error) {
                                                response.sendStatus(500);
                                                return;
                                            } else {
                                                connection.query(sql_logGame, (error, result_logGame) => {
                                                    if (error) {
                                                        response.sendStatus(500);
                                                        return;
                                                    } else {
                                                        x = x + i;
                                                        if (x === 45) {
                                                            checkLoop = true;
                                                            const flattenedArray = arrayWinCount.flat();
                                                            const upPlay = result_logGame[0].play + 10;
                                                            const upBet = result_logGame[0].bet + 0;
                                                            const upWin = result_logGame[0].win + wineArr;
                                                            const sql_logGameUpdate = `UPDATE loggame set play='${upPlay}',bet='${upBet}', win='${upWin}' 
                                                        WHERE id='${game_id}'`;
                                                            connection.query(sql_logGameUpdate, (error, result_logGameUpdate) => {
                                                                if (error) {
                                                                    response.sendStatus(500);
                                                                    return;
                                                                } else {
                                                                    const sql = `SELECT id, member_code, name, username, credit, status FROM member WHERE id='${user_id}' AND status_delete='N' 
                                                                ORDER BY member_code ASC`;
                                                                    connection.query(sql, (error, results) => {
                                                                        if (error) {
                                                                            response.sendStatus(500);
                                                                            return;
                                                                        } else {
                                                                            // commissionGame----------------------------------------------------------------------------------------------------//
                                                                            connection.query(selectSpl_commissionDay, (error, result_commissionDay) => {
                                                                                if (error) {
                                                                                    response.sendStatus(500);
                                                                                    return;
                                                                                } else {
                                                                                   /* connection.query(select_logdayGame, (error, result_logGameDay) => {
                                                                                        if (result_commissionDay.length === 0) { //INSERT comgogoldplanet
                                                                                            if (game_id === '1') {
                                                                                                let sql_insertCommission = `INSERT INTO comgogoldplanet (bet_gogold, win_gogold, day, monthly) 
                                                                                            value ('${beteArr}','${wineArr}','${date}','${date}')`;
                                                                                                connection.query(sql_insertCommission, (error, result_GameUpdate) => {
                                                                                                    if (error) {
                                                                                                        response.sendStatus(500);
                                                                                                        return;
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                            else if (game_id === '2') {
                                                                                                let sql_insertCommission = `INSERT INTO comgogoldplanet (bet_luckybunny, win_luckybunny	, day, monthly) 
                                                                                            value ('${beteArr}','${wineArr}','${date}','${date}')`;
                                                                                                connection.query(sql_insertCommission, (error, result_GameUpdate) => {
                                                                                                    if (error) {
                                                                                                        response.sendStatus(500);
                                                                                                        return;
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                            else {
                                                                                                let sql_insertCommission = `INSERT INTO comgogoldplanet (bet_aliens, win_aliens, day, monthly) 
                                                                                            value ('${beteArr}','${wineArr}','${date}','${date}')`;
                                                                                                connection.query(sql_insertCommission, (error, result_GameUpdate) => {
                                                                                                    if (error) {
                                                                                                        response.sendStatus(500);
                                                                                                        return;
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        } else { //UpDate comgogoldplanet
                                                                                            if (game_id === '1') {
                                                                                                let sql_insertCommission = `UPDATE comgogoldplanet set 
                                                                                            bet_gogold='${result_commissionDay[0].bet_gogold + beteArr}',win_gogold='${result_commissionDay[0].win_gogold + wineArr}' WHERE monthly = '${date}'`;
                                                                                                connection.query(sql_insertCommission, (error, result_GameUpdate) => {
                                                                                                    if (error) {
                                                                                                        response.sendStatus(500);
                                                                                                        return;
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                            else if (game_id === '2') {
                                                                                                let sql_insertCommission = `UPDATE comgogoldplanet set 
                                                                                            bet_luckybunny='${result_commissionDay[0].bet_luckybunny + beteArr}',win_luckybunny='${result_commissionDay[0].win_luckybunny + wineArr}' WHERE monthly = '${date}'`;
                                                                                                connection.query(sql_insertCommission, (error, result_GameUpdate) => {
                                                                                                    if (error) {
                                                                                                        response.sendStatus(500);
                                                                                                        return;
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                            else {
                                                                                                let sql_insertCommission = `UPDATE comgogoldplanet set 
                                                                                            bet_aliens='${result_commissionDay[0].bet_aliens + beteArr}',win_aliens='${result_commissionDay[0].win_aliens + wineArr}' WHERE monthly = '${date}'`;
                                                                                                connection.query(sql_insertCommission, (error, result_GameUpdate) => {
                                                                                                    if (error) {
                                                                                                        response.sendStatus(500);
                                                                                                        return;
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        }
                                                                                    });*/
                                                                                }
                                                                            });
                                                                            // commission----------------------------------------------------------------------------------------------------------------------------//
                                                                            // LogDayGame----------------------------------------------------------------------------------------------------------------------------//
                                                                            /*let select_logdayGame = `SELECT * FROM logdaygame WHERE day = '${date}' AND game_id = '${game_id}'`;
                                                                            connection.query(select_logdayGame, (error, result_logGameDay) => {
                                                                                if (result_logGameDay.length === 0) {
                                                                                    if (game_id === '1') {
                                                                                        let sql_logDayGame = `INSERT INTO logdaygame (namegame, game_id, play, bet, win, icon, day) 
                                                                                        value ('Go Gold Planet','${1}','${11}','${beteArr}','${wineArr}','/img/thumbs/icontest3.png','${date}')`;
                                                                                        connection.query(sql_logDayGame, (error, result_GameUpdate) => {
                                                                                            if (error) {
                                                                                                response.sendStatus(500);
                                                                                                return;
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                    else if (game_id === '2') {
                                                                                        let sql_logDayGame = `INSERT INTO logdaygame (namegame, game_id, play, bet, win, icon, day) 
                                                                                        value ('Lucky Bunny Gold','${2}','${11}','${beteArr}','${wineArr}','/img/thumbs/icontest2.png','${date}')`;
                                                                                        connection.query(sql_logDayGame, (error, result_GameUpdate) => {
                                                                                            if (error) {
                                                                                                response.sendStatus(500);
                                                                                                return;
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                    else {
                                                                                        let sql_logDayGame = `INSERT INTO logdaygame (namegame, game_id, play, bet, win, icon, day) 
                                                                                        value ('CowBoys VS Aliens','${3}','${11}','${beteArr}','${wineArr}','/img/thumbs/icontest1.png','${date}')`;
                                                                                        connection.query(sql_logDayGame, (error, result_GameUpdate) => {
                                                                                            if (error) {
                                                                                                response.sendStatus(500);
                                                                                                return;
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                } else {
                                                                                    let sql_logDayGame = `UPDATE logdaygame set 
                                                                                    play ='${result_logGameDay[0].play + 1}',bet ='${result_logGameDay[0].bet + beteArr}',win ='${result_logGameDay[0].win + wineArr}' 
                                                                                    WHERE day = '${date}' AND game_id = '${game_id}'`;
                                                                                    connection.query(sql_logDayGame, (error, result_GameUpdate) => {
                                                                                        if (error) {
                                                                                            response.sendStatus(500);
                                                                                            return;
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                            // LogDayGame----------------------------------------------------------------------------------------------------------------------------//
                                                                            isWinFreeSpinBuy = false;
                                                                            /* response.setHeader('X-Foo', 'bar')
                                                                             response.send({
                                                                                 dataTiles: arrayTiles,
                                                                                 dataCredit: results[0].credit,
                                                                                 credit: arrayCredit,
                                                                                 dataWin: arrayWin,
                                                                                 dataFeeSpin: 'true',
                                                                                 dataWinLine: arrayWinLine,
                                                                                 dataWinStyle: arrayWinStyle,
                                                                                 dataWinCount: flattenedArray,
                                                                                 dataTotalWin: totalWin,
                                                                                 dataMember: results[0].member_code
                                                                             });
                                                                             response.end();*/
                                                                            if (x === 45 && checkLoop === true) {
                                                                                response.status(200).json({
                                                                                    dataTiles: arrayTiles,
                                                                                    dataCredit: results[0].credit,
                                                                                    credit: arrayCredit,
                                                                                    dataWin: arrayWin,
                                                                                    dataFeeSpin: 'true',
                                                                                    dataWinLine: arrayWinLine,
                                                                                    dataWinStyle: arrayWinStyle,
                                                                                    dataWinCount: flattenedArray,
                                                                                    dataTotalWin: totalWin,
                                                                                    dataMember: results[0].member_code
                                                                                })
                                                                                checkLoop = false;
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }, 500);
                }
            } else {
                // commissionGame----------------------------------------------------------------------------------------------------//

                connection.query(selectSpl_commissionDay, (error, result_commissionDay) => {
                    if (error) {
                        response.sendStatus(500);
                        return;
                    } else {
                        if (result_commissionDay.length === 0) { //INSERT comgogoldplanet
                            if (game_id === '1') {
                                let sql_insertCommission = `INSERT INTO comgogoldplanet (bet_gogold, win_gogold, day, monthly) 
                             value ('${beteArr}','${wineArr}','${date}','${date}')`;
                                connection.query(sql_insertCommission, (error, result_GameUpdate) => {
                                    if (error) {
                                        response.sendStatus(500);
                                        return;
                                    }
                                });
                            }
                            else if (game_id === '2') {
                                let sql_insertCommission = `INSERT INTO comgogoldplanet (bet_luckybunny, win_luckybunny	, day, monthly) 
                             value ('${beteArr}','${wineArr}','${date}','${date}')`;
                                connection.query(sql_insertCommission, (error, result_GameUpdate) => {
                                    if (error) {
                                        response.sendStatus(500);
                                        return;
                                    }
                                });
                            }
                            else {
                                let sql_insertCommission = `INSERT INTO comgogoldplanet (bet_aliens, win_aliens, day, monthly) 
                            value ('${beteArr}','${wineArr}','${date}','${date}')`;
                                connection.query(sql_insertCommission, (error, result_GameUpdate) => {
                                    if (error) {
                                        response.sendStatus(500);
                                        return;
                                    }
                                });
                            }
                        } else { //UpDate comgogoldplanet
                            if (game_id === '1') {
                                let sql_insertCommission = `UPDATE comgogoldplanet set 
                                 bet_gogold='${result_commissionDay[0].bet_gogold + beteArr}',win_gogold='${result_commissionDay[0].win_gogold + wineArr}' WHERE monthly = '${date}'`;
                                connection.query(sql_insertCommission, (error, result_GameUpdate) => {
                                    if (error) {
                                        response.sendStatus(500);
                                        return;
                                    }
                                });
                            }
                            else if (game_id === '2') {
                                let sql_insertCommission = `UPDATE comgogoldplanet set 
                                 bet_luckybunny='${result_commissionDay[0].bet_luckybunny + beteArr}',win_luckybunny='${result_commissionDay[0].win_luckybunny + wineArr}' WHERE monthly = '${date}'`;
                                connection.query(sql_insertCommission, (error, result_GameUpdate) => {
                                    if (error) {
                                        response.sendStatus(500);
                                        return;
                                    }
                                });
                            }
                            else {
                                let sql_insertCommission = `UPDATE comgogoldplanet set 
                                 bet_aliens='${result_commissionDay[0].bet_aliens + beteArr}',win_aliens='${result_commissionDay[0].win_aliens + wineArr}' WHERE monthly = '${date}'`;
                                connection.query(sql_insertCommission, (error, result_GameUpdate) => {
                                    if (error) {
                                        response.sendStatus(500);
                                        return;
                                    }
                                });
                            }
                        }
                    }
                });
                // commission----------------------------------------------------------------------------------------------------------------------------//

                // LogDayGame----------------------------------------------------------------------------------------------------------------------------//
                /*let select_logdayGame = `SELECT * FROM logdaygame WHERE game_id = '${game_id}' AND day = '${date}'`;
                connection.query(select_logdayGame, (error, result_logGameDay) => {
                    if (result_logGameDay.length === 0) {
                        if (game_id === '1') {
                            let sql_logDayGame = `INSERT INTO logdaygame (namegame, game_id, play, bet, win, icon, day) 
                            value ('Go Gold Planet','${1}','${1}','${beteArr}','${wineArr}','/img/thumbs/icontest3.png','${date}')`;
                            connection.query(sql_logDayGame, (error, result_GameUpdate) => {
                                if (error) {
                                    response.sendStatus(500);
                                    return;
                                }
                            });
                        }
                        else if (game_id === '2') {
                            let sql_logDayGame = `INSERT INTO logdaygame (namegame, game_id, play, bet, win, icon, day) 
                            value ('Lucky Bunny Gold','${2}','${1}','${beteArr}','${wineArr}','/img/thumbs/icontest2.png','${date}')`;
                            connection.query(sql_logDayGame, (error, result_GameUpdate) => {
                                if (error) {
                                    response.sendStatus(500);
                                    return;
                                }
                            });
                        }
                        else {
                            let sql_logDayGame = `INSERT INTO logdaygame (namegame, game_id, play, bet, win, icon, day) 
                            value ('CowBoys VS Aliens','${3}','${1}','${beteArr}','${wineArr}','/img/thumbs/icontest1.png','${date}')`;
                            connection.query(sql_logDayGame, (error, result_GameUpdate) => {
                                if (error) {
                                    response.sendStatus(500);
                                    return;
                                }
                            });
                        }
                    } else {
                        let sql_logDayGame = `UPDATE logdaygame set 
                        play ='${result_logGameDay[0].play + 1}',bet ='${result_logGameDay[0].bet + beteArr}',win ='${result_logGameDay[0].win + wineArr}' 
                        WHERE day = '${date}' AND game_id = '${game_id}'`;
                        connection.query(sql_logDayGame, (error, result_GameUpdate) => {
                            if (error) {
                                response.sendStatus(500);
                                return;
                            }
                        });
                    }
                });*/
                // LogDayGame----------------------------------------------------------------------------------------------------------------------------//

                connection.query(sql_insert, (error, result_insert_play) => {
                    if (!error) {
                        response.sendStatus(500);
                        return;
                    } else {
                        let spl_feesPin = `INSERT INTO game_feespin (member_id, game_id, game_feespin) value ('${user_id}','${game_id}','${isWinFreeSpin}')`;
                        connection.query(spl_feesPin, (error, result_feesPin) => {
                            if (error) {
                                response.sendStatus(500);
                                return;
                            } else {
                                let sql_update = `UPDATE member set credit='${credit}',bet_latest='${bet}' WHERE id='${user_id}'`;
                                connection.query(sql_update, (error, result_update_user) => {
                                    if (error) {
                                        response.sendStatus(500);
                                        return;
                                    } else {
                                        connection.query(sql_logGame, (error, result_logGame) => {
                                            if (error) {
                                                response.sendStatus(500);
                                                return;
                                            } else {
                                                const upPlay = result_logGame[0].play + 1;
                                                const upBet = result_logGame[0].bet + beteArr;
                                                const upWin = result_logGame[0].win + wineArr;
                                                let sql_logGameUpdate = `UPDATE loggame set play='${upPlay}',bet='${upBet}', win='${upWin}' 
                                        WHERE id='${game_id}'`;
                                                connection.query(sql_logGameUpdate, (error, result_logGameUpdate) => {
                                                    if (error) {
                                                        response.sendStatus(500);
                                                        return;
                                                    } else {
                                                        let sql = `SELECT id, member_code, name, username, credit, status FROM member WHERE id='${user_id}' AND status_delete='N' 
                                                ORDER BY member_code ASC`;
                                                        connection.query(sql, (error, results) => {
                                                            if (error) {
                                                                response.sendStatus(500);
                                                                return;
                                                            }
                                                            if (isWinFreeSpin === 'false') {
                                                                response.send({
                                                                    //message: 'member play game: '+game_id,
                                                                    dataTiles: tilesArr,
                                                                    dataCredit: results[0].credit,
                                                                    dataWinLine: winlineArr,
                                                                    dataFeeSpin: isWinFreeSpin,
                                                                    dataWin: wineArr,
                                                                    dataWinStyle: winStyle,
                                                                    dataWinCount: winCountArr,
                                                                    dataMember: results[0].member_code
                                                                });
                                                                response.end();
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
                    }
                });
            }
        } else {
            response.send({
                message: "no member information",
            });
            response.end();
        }
    });
    //No Buy 
    function MainGame(credit, bet, playOne) {
        let win = 0//เงินที่ชนะในรอบนี้
        let tile15 = []//tile 15 ชิ้นใน playarea
        let reels = [[], [], [], [], []]//5 reel ที่อยู่ในเกมจริงๆ
        let slotTemp = []//ข้อมูลที่ก็อบมาจาก slot สำหรับดึงข้อมูลไปใช้คำนวณ
        let highestWinLine = [];//เส้นนั้นชนะ 3 4 5
        let winLine = [];
        let winStyle = [];
        let winCount = 0;
        let isWinFreeSpin = false//ชนะ freespin มั้ยรอบนี้

        const tileIndexLine = [
            [1, 4, 7, 10, 13], [0, 3, 6, 9, 12], [2, 5, 8, 11, 14], [0, 4, 8, 10, 12], [2, 4, 6, 10, 14], [0, 3, 7, 9, 12],
            [2, 5, 7, 11, 14], [1, 5, 8, 11, 13], [1, 3, 6, 9, 13], [0, 4, 7, 10, 12], [2, 4, 7, 10, 14], [1, 4, 6, 10, 13], [1, 4, 8, 10, 13],
            [0, 5, 8, 11, 12], [2, 3, 6, 9, 14], [1, 3, 7, 9, 13], [1, 5, 7, 11, 13], [0, 5, 6, 11, 12], [2, 3, 8, 9, 14], [0, 4, 6, 10, 12],
            [2, 4, 8, 10, 14], [0, 5, 7, 11, 12], [2, 3, 7, 9, 14], [1, 3, 8, 9, 13], [1, 5, 6, 11, 13], [0, 3, 8, 9, 12], [2, 5, 6, 11, 14],
            [0, 3, 6, 9, 14], [2, 5, 8, 11, 13], [1, 4, 7, 10, 12]
        ];

        const slot = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 12, 12, 12, 11],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10, 10, 12, 12, 12, 11],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 12, 12, 12, 11],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10, 10, 12, 12, 11, 11],
            [0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 12, 11, 11, 11]
        ];

        if (bet <= credit) {
            isWinFreeSpin = false
            reels = [[], [], [], [], []]
            slotTemp = slot
            for (let i = 0; i < 5; i++)//5reel
            {
                for (let j = 0; j < 6; j++)//6tile
                {
                    let r = Math.random()
                    let rand = Math.floor(r * slotTemp[i].length);//สุ่มเลข ตามจำนวณ tile ใน reel นั้น
                    reels[i].push(slotTemp[i][rand])//ใน reel

                    if (j < 3) {
                        tile15.push(reels[i][j])//ใน playarea
                    }
                    slotTemp[i].splice(rand, 1)
                }
                slotTemp[i] = [];
            }

            for (let j = 0; j < 30; j++) {//วน 30 รอบสำหรับเช็ค Win ทั้ง 30 แบบ
                let currentPayline = []//เช่น payline1 มี [1,4,7,10,13]
                for (let x = 0; x < 5; x++) {
                    currentPayline[x] = tileIndexLine[j][x]
                }

                let left3 = CheckArrange(0, 2, currentPayline, j, bet, highestWinLine, tile15)
                let middle3 = CheckArrange(1, 3, currentPayline, j, bet, highestWinLine, tile15)
                let right3 = CheckArrange(2, 4, currentPayline, j, bet, highestWinLine, tile15)
                let left4 = CheckArrange(0, 3, currentPayline, j, bet, highestWinLine, tile15)
                let right4 = CheckArrange(1, 4, currentPayline, j, bet, highestWinLine, tile15)
                let left5 = CheckArrange(0, 4, currentPayline, j, bet, highestWinLine, tile15)

                let m = Math.max(left3, middle3, right3, left4, right4, left5)

                if (m != 0) {//hit
                    winLine.push(j)
                    if (m == left3)
                        winStyle.push("left3")
                    else if (m == middle3)
                        winStyle.push("middle3")
                    else if (m == right3)
                        winStyle.push("right3")
                    else if (m == left4)
                        winStyle.push("left4")
                    else if (m == right4)
                        winStyle.push("right4")
                    else if (m == left5)
                        winStyle.push("left5")
                }
                win += m
            }

            //------------- เช็ค scatter อยู่ตำแหน่งไหนก็ได้ -----------
            if (playOne === true) {
                let scatterCount = 0
                for (let k = 0; k < 15; k++) {
                    if (tile15[k] == 12) {
                        scatterCount += 1
                    }
                }
                if (scatterCount >= 3) {
                    isWinFreeSpin = true
                }
                scatterCount = 0
            }
            //-----------------------------------------------------

            for (let j = 0; j < 30; j++) {
                if (highestWinLine[j] != 0) {
                    winLine.push(j)
                }
            }
            winCount = winLine.length;
            credit += win;
            //
            jsArray = '{"credit": \"' + credit + '\","bet":\"' + bet + '\","win":\"' + win + '\","tiles":\"' + tile15 + '\","winline":\"' + winLine + '\","winStyle":\"' +
                winStyle + '\","winCount":\"' + winCount + '\","isWinFreeSpin":\"' + isWinFreeSpin + '\"}';
            //
            jsArray = JSON.parse(jsArray);
            return jsArray;
        }
    }
    function CheckArrange(start, end, currentPayline, j, bet, highestWinLine, tile15) {
        let lastestTile = 100;
        let tileCount = 0
        let once = 0
        let lineCost = bet / 30
        let winingTile = []
        highestWinLine[j] = 0

        const RewardTable = [
            [3, 8, 15], [3, 8, 15], [5, 15, 30], [5, 15, 30], [5, 15, 30], [5, 15, 30], [10, 20, 50], [10, 20, 50], [15, 30, 80], [15, 30, 80], [20, 50, 150], [50, 150, 500], [0, 0, 0] //มี
        ];

        //หาสัญลักษณ์แรก
        for (let i = start; i <= end; i++) {
            if (tile15[currentPayline[i]] != 11 && once == 0 && tile15[currentPayline[i]] != 12)//หาตัวแรกที่ไม่ใช่ wild
            {
                lastestTile = tile15[currentPayline[i]]
                once = 1
            }
            if (i == end && lastestTile == 100) {
                lastestTile = 11//wild
            }
        }
        for (let i = start; i <= end; i++) {
            if (tile15[currentPayline[i]] == lastestTile || tile15[currentPayline[i]] == 11 && tile15[currentPayline[i]] != 12)//ถ้า tile ตัวล่าสุดเหมือนตัวก่อนหน้า
            {
                tileCount += 1;

                if (tileCount == 3 && end - start == 2)//เรียงมากกว่า 3 ก็คือชนะแล้ว
                {
                    highestWinLine[j] = tileCount//เก็บว่าเรียงได้มากสุดเท่าไหร่
                    winingTile[j] = lastestTile
                }
                if (tileCount == 4 && end - start == 3) {
                    highestWinLine[j] = tileCount//เก็บว่าเรียงได้มากสุดเท่าไหร่
                    winingTile[j] = lastestTile
                }
                if (tileCount == 5 && end - start == 4) {
                    highestWinLine[j] = tileCount//เก็บว่าเรียงได้มากสุดเท่าไหร่
                    winingTile[j] = lastestTile
                }
            }
        }

        if (winingTile[j] == null)//ถ้าเส้นนี้ไม่ถูกก็ไม่ต้องมี winingTile
            winingTile[j] = undefined


        //เช็คว่าชนะ 3 4 5
        if (highestWinLine[j] == 3) {
            return lineCost * RewardTable[winingTile[j]][0]
        }
        else if (highestWinLine[j] == 4) {
            return lineCost * RewardTable[winingTile[j]][1]
        }
        else if (highestWinLine[j] == 5) {
            return lineCost * RewardTable[winingTile[j]][2]
        }
        else {
            return 0
        }
    }
};


exports.saveTestGameBuy = async (require, response) => {
    let user_id = require.params.user_id;
    let bet = require.params.bet;
    let game_id = require.params.game_id;
    let isWinFreeSpinBuy = false//ชนะ freespin มั้ยรอบนี้
    let betFreeSpin = bet * 50//ราคาของการซื้อ freespin
    const today = new Date();
    const date = today.toISOString().slice(0, 10);
    const sql_check = `SELECT id, member_code, name, username, credit, status FROM member WHERE id='${user_id}' AND status_delete='N' 
    ORDER BY member_code ASC`;
    const sql_logGame = `SELECT play, bet, win FROM loggame WHERE id='${game_id}'`;
    connection.query(sql_check, (error, results_check) => {
        if (results_check.length > 0) {
            let user_credit = results_check[0].credit;
            if (user_credit === "") { user_credit = 0; }
            if (betFreeSpin <= user_credit) {
                user_credit -= betFreeSpin
                let totalWin = 0  //--ส่งไป client
                let arrayTiles = [];
                let arrayWin = [];
                let arrayWinStyle = [];
                let arrayWinCount = [];
                let arrayWinLine = [];
                let arrayCredit = [];
                isWinFreeSpinBuy = true;
                let x = 0;
                for (let i = 0; i !== 10; i++) {
                    setTimeout(() => {
                        let jsonGame = MainGame(user_credit, bet);
                        let win = jsonGame.win;
                        let tiles = jsonGame.tiles;
                        let winline = jsonGame.winline;
                        let winStyle = jsonGame.winStyle;
                        let isWinFreeSpin = jsonGame.isWinFreeSpin
                        let winCount = jsonGame.winCount
                        const tilesArr = tiles.split(",").map(Number);
                        const winlineArr = winline.split(",").map(Number)
                        const winCountArr = winCount.split(",").map(Number)
                        const wineArr = parseFloat(win);
                        const beteArr = parseFloat(bet);
                        user_credit += wineArr;
                        totalWin += wineArr;
                        arrayTiles.push(tilesArr);
                        arrayWin.push(wineArr);
                        arrayWinLine.push(winlineArr);
                        arrayCredit.push(user_credit);
                        arrayWinStyle.push(winStyle);
                        arrayWinCount.push(winCountArr)
                        let sql_insert = `INSERT INTO user_play (member_id, game_id, bet, win, tiles, winline, winstyle, winCount, credit, created_at, game_feespin) 
            value ('${user_id}','${game_id}','${bet}','${win}','${tiles}','${winline}','${winStyle}','${winCount}','${user_credit}',now(), '${isWinFreeSpin}')`;

                        connection.query(sql_insert, (error, result_insert_play) => {
                            if (error) {
                                console.log(error)
                            } else {
                                const spl_feesPin = `INSERT INTO game_feespin (member_id, game_id, game_feespin) value ('${user_id}','${game_id}','${isWinFreeSpin}')`;
                                connection.query(spl_feesPin, (error, result_feesPin) => {
                                    if (error) {
                                        console.log(error)
                                    } else {
                                        const sql_update = `UPDATE member set credit='${user_credit}',bet_latest='${bet}' WHERE id='${user_id}'`;
                                        connection.query(sql_update, (error, result_update_user) => {
                                            if (error) {
                                                console.log(error)
                                            } else {
                                                connection.query(sql_logGame, (error, result_logGame) => {
                                                    if (error) {
                                                        console.log(error)
                                                    } else {
                                                        x = x + i;
                                                        if (x === 45) {
                                                            const flattenedArray = arrayWinCount.flat();
                                                            const upPlay = result_logGame[0].play + 10;
                                                            const upBet = result_logGame[0].bet + betFreeSpin;
                                                            const upWin = result_logGame[0].win + wineArr;
                                                            const sql_logGameUpdate = `UPDATE loggame set play='${upPlay}',bet='${upBet}', win='${upWin}' 
                                                            WHERE id='${game_id}'`;
                                                            connection.query(sql_logGameUpdate, (error, result_logGameUpdate) => {
                                                                if (error) {
                                                                    console.log(error)
                                                                } else {
                                                                    const sql = `SELECT id, member_code, name, username, credit, status FROM member WHERE id='${user_id}' AND status_delete='N' 
                                                                    ORDER BY member_code ASC`;
                                                                    connection.query(sql, (error, results) => {
                                                                        if (error) { console.log(error) }
                                                                        else {
                                                                            // commissionGame----------------------------------------------------------------------------------------------------//
                                                                            let selectSpl_commissionDay = `SELECT * FROM comgogoldplanet WHERE monthly = '${date}'`;
                                                                            connection.query(selectSpl_commissionDay, (error, result_commissionDay) => {
                                                                                if (error) {
                                                                                    console.log(error)
                                                                                } else {
                                                                                    if (result_commissionDay.length === 0) { //INSERT comgogoldplanet
                                                                                        if (game_id === '1') {
                                                                                            let sql_insertCommission = `INSERT INTO comgogoldplanet (bet_gogold, win_gogold, day, monthly) 
                                                                                                value ('${betFreeSpin}','${totalWin}','${date}','${date}')`;
                                                                                            connection.query(sql_insertCommission, (error, result_GameUpdate) => {
                                                                                                if (error) {
                                                                                                    console.log(error)
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                        else if (game_id === '2') {
                                                                                            let sql_insertCommission = `INSERT INTO comgogoldplanet (bet_luckybunny, win_luckybunny	, day, monthly) 
                                                                                                value ('${betFreeSpin}','${totalWin}','${date}','${date}')`;
                                                                                            connection.query(sql_insertCommission, (error, result_GameUpdate) => {
                                                                                                if (error) {
                                                                                                    console.log(error)
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                        else {
                                                                                            let sql_insertCommission = `INSERT INTO comgogoldplanet (bet_aliens, win_aliens, day, monthly) 
                                                                                                value ('${betFreeSpin}','${totalWin}','${date}','${date}')`;
                                                                                            connection.query(sql_insertCommission, (error, result_GameUpdate) => {
                                                                                                if (error) {
                                                                                                    console.log(error)
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                    } else { //UpDate comgogoldplanet
                                                                                        if (game_id === '1') {
                                                                                            let sql_insertCommission = `UPDATE comgogoldplanet set 
                                                                                                bet_gogold='${result_commissionDay[0].bet_gogold + betFreeSpin}',win_gogold='${result_commissionDay[0].win_gogold + totalWin}' WHERE monthly = '${date}'`;
                                                                                            connection.query(sql_insertCommission, (error, result_GameUpdate) => {
                                                                                                if (error) {
                                                                                                    console.log(error)
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                        else if (game_id === '2') {
                                                                                            let sql_insertCommission = `UPDATE comgogoldplanet set 
                                                                                                bet_luckybunny='${result_commissionDay[0].bet_luckybunny + betFreeSpin}',win_luckybunny='${result_commissionDay[0].win_luckybunny + totalWin}' WHERE monthly = '${date}'`;
                                                                                            connection.query(sql_insertCommission, (error, result_GameUpdate) => {
                                                                                                if (error) {
                                                                                                    console.log(error)
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                        else {
                                                                                            let sql_insertCommission = `UPDATE comgogoldplanet set 
                                                                                                bet_aliens='${result_commissionDay[0].bet_aliens + betFreeSpin}',win_aliens='${result_commissionDay[0].win_aliens + totalWin}' WHERE monthly = '${date}'`;
                                                                                            connection.query(sql_insertCommission, (error, result_GameUpdate) => {
                                                                                                if (error) {
                                                                                                    console.log(error)
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                    }
                                                                                }
                                                                            });
                                                                            // commission----------------------------------------------------------------------------------------------------------------------------//
                                                                            // LogDayGame----------------------------------------------------------------------------------------------------------------------------//
                                                                           /* let select_logdayGame = `SELECT * FROM logdaygame WHERE day = '${date}' AND game_id = '${game_id}'`;
                                                                            connection.query(select_logdayGame, (error, result_logGameDay) => {
                                                                                if (result_logGameDay.length === 0) {
                                                                                    if (game_id === '1') {
                                                                                        let sql_logDayGame = `INSERT INTO logdaygame (namegame, game_id, play, bet, win, icon, day) 
                                                                                        value ('Go Gold Planet','${1}','${11}','${beteArr}','${wineArr}','/img/thumbs/icontest3.png','${date}')`;
                                                                                        connection.query(sql_logDayGame, (error, result_GameUpdate) => {
                                                                                            if (error) {
                                                                                                console.log(error)
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                    else if (game_id === '2') {
                                                                                        let sql_logDayGame = `INSERT INTO logdaygame (namegame, game_id, play, bet, win, icon, day) 
                                                                                        value ('Lucky Bunny Gold','${2}','${11}','${beteArr}','${wineArr}','/img/thumbs/icontest2.png','${date}')`;
                                                                                        connection.query(sql_logDayGame, (error, result_GameUpdate) => {
                                                                                            if (error) {
                                                                                                console.log(error)
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                    else {
                                                                                        let sql_logDayGame = `INSERT INTO logdaygame (namegame, game_id, play, bet, win, icon, day) 
                                                                                        value ('CowBoys VS Aliens','${3}','${11}','${beteArr}','${wineArr}','/img/thumbs/icontest1.png','${date}')`;
                                                                                        connection.query(sql_logDayGame, (error, result_GameUpdate) => {
                                                                                            if (error) {
                                                                                                console.log(error)
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                } else {
                                                                                    let sql_logDayGame = `UPDATE logdaygame set 
                                                                                    play ='${result_logGameDay[0].play + 1}',bet ='${result_logGameDay[0].bet + beteArr}',win ='${result_logGameDay[0].win + wineArr}' 
                                                                                    WHERE day = '${date}' AND game_id = '${game_id}'`;
                                                                                    connection.query(sql_logDayGame, (error, result_GameUpdate) => {
                                                                                        if (error) {
                                                                                            console.log(error)
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });*/
                                                                            // LogDayGame----------------------------------------------------------------------------------------------------------------------------//
                                                                            isWinFreeSpinBuy = false;
                                                                            response.send({
                                                                                dataTiles: arrayTiles,
                                                                                dataCredit: results[0].credit,
                                                                                credit: arrayCredit,
                                                                                dataWin: arrayWin,
                                                                                dataWinLine: arrayWinLine,
                                                                                dataFeeSpin: isWinFreeSpin,
                                                                                dataTotalWin: totalWin,
                                                                                dataWinStyle: arrayWinStyle,
                                                                                dataWinCount: flattenedArray,
                                                                                dataMember: results[0].member_code
                                                                            });
                                                                            response.end();
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }, 500)
                }
            } else {
                response.send({
                    message: "no member information",
                });
                response.end();
            }
        } else {
            response.send({
                message: "no member information",
            });
            response.end();
        }
    });

    function MainGame(credit, bet) {
        let win = 0//เงินที่ชนะในรอบนี้
        let tile15 = []//tile 15 ชิ้นใน playarea
        let reels = [[], [], [], [], []]//5 reel ที่อยู่ในเกมจริงๆ
        let slotTemp = []//ข้อมูลที่ก็อบมาจาก slot สำหรับดึงข้อมูลไปใช้คำนวณ
        let highestWinLine = [];//เส้นนั้นชนะ 3 4 5
        let winLine = [];
        let winStyle = [];
        let winCount = 0;
        let isWinFreeSpin = false//ชนะ freespin มั้ยรอบนี้

        const tileIndexLine = [
            [1, 4, 7, 10, 13], [0, 3, 6, 9, 12], [2, 5, 8, 11, 14], [0, 4, 8, 10, 12], [2, 4, 6, 10, 14], [0, 3, 7, 9, 12],
            [2, 5, 7, 11, 14], [1, 5, 8, 11, 13], [1, 3, 6, 9, 13], [0, 4, 7, 10, 12], [2, 4, 7, 10, 14], [1, 4, 6, 10, 13], [1, 4, 8, 10, 13],
            [0, 5, 8, 11, 12], [2, 3, 6, 9, 14], [1, 3, 7, 9, 13], [1, 5, 7, 11, 13], [0, 5, 6, 11, 12], [2, 3, 8, 9, 14], [0, 4, 6, 10, 12],
            [2, 4, 8, 10, 14], [0, 5, 7, 11, 12], [2, 3, 7, 9, 14], [1, 3, 8, 9, 13], [1, 5, 6, 11, 13], [0, 3, 8, 9, 12], [2, 5, 6, 11, 14],
            [0, 3, 6, 9, 14], [2, 5, 8, 11, 13], [1, 4, 7, 10, 12]
        ];

        const slot = [
            [5, 4, 5, 2, 4, 0, 1, 3, 6, 0, 7, 8, 9, 10, 11], [5, 4, 6, 2, 0, 0, 1, 3, 6, 1, 7, 8, 9, 10, 11, 11],
            [5, 4, 5, 2, 4, 0, 1, 3, 6, 6, 5, 0, 0, 7, 8, 9, 10, 11], [5, 4, 5, 2, 6, 0, 1, 3, 6, 4, 7, 8, 9, 10, 11],
            [5, 4, 5, 2, 4, 0, 1, 5, 6, 3, 7, 8, 9, 10, 11, 11]
        ];
        if (bet <= credit) {
            isWinFreeSpin = false
            reels = [[], [], [], [], []]
            slotTemp = slot
            for (let i = 0; i < 5; i++)//5reel
            {
                for (let j = 0; j < 6; j++)//6tile
                {
                    let r = Math.random()
                    let rand = Math.floor(r * slotTemp[i].length);//สุ่มเลข ตามจำนวณ tile ใน reel นั้น
                    reels[i].push(slotTemp[i][rand])//ใน reel

                    if (j < 3) {
                        tile15.push(reels[i][j])//ใน playarea
                    }
                    slotTemp[i].splice(rand, 1)
                }
                slotTemp[i] = [];
            }

            for (let j = 0; j < 30; j++) {//วน 30 รอบสำหรับเช็ค Win ทั้ง 30 แบบ
                let currentPayline = []//เช่น payline1 มี [1,4,7,10,13]
                for (let x = 0; x < 5; x++) {
                    currentPayline[x] = tileIndexLine[j][x]
                }

                let left3 = CheckArrange(0, 2, currentPayline, j, bet, highestWinLine, tile15)
                let middle3 = CheckArrange(1, 3, currentPayline, j, bet, highestWinLine, tile15)
                let right3 = CheckArrange(2, 4, currentPayline, j, bet, highestWinLine, tile15)
                let left4 = CheckArrange(0, 3, currentPayline, j, bet, highestWinLine, tile15)
                let right4 = CheckArrange(1, 4, currentPayline, j, bet, highestWinLine, tile15)
                let left5 = CheckArrange(0, 4, currentPayline, j, bet, highestWinLine, tile15)

                let m = Math.max(left3, middle3, right3, left4, right4, left5)

                if (m != 0) {//hit
                    winLine.push(j)
                    winCount++;
                    if (m == left3)
                        winStyle.push("left3")
                    else if (m == middle3)
                        winStyle.push("middle3")
                    else if (m == right3)
                        winStyle.push("right3")
                    else if (m == left4)
                        winStyle.push("left4")
                    else if (m == right4)
                        winStyle.push("right4")
                    else if (m == left5)
                        winStyle.push("left5")
                }
                win += m
            }

            for (let j = 0; j < 30; j++) {
                if (highestWinLine[j] != 0) {
                    winLine.push(j)
                }
            }

            credit += win;
            //
            jsArray = '{"credit": \"' + credit + '\","bet":\"' + bet + '\","win":\"' + win + '\","tiles":\"' + tile15 + '\","winline":\"' + winLine + '\","winStyle":\"' +
                winStyle + '\","winCount":\"' + winCount + '\","isWinFreeSpin":\"' + isWinFreeSpin + '\"}';
            //
            jsArray = JSON.parse(jsArray);
            return jsArray;
        }
    }
    function CheckArrange(start, end, currentPayline, j, bet, highestWinLine, tile15) {
        let lastestTile = 100;
        let tileCount = 0
        let once = 0
        let lineCost = bet / 30
        let winingTile = []
        highestWinLine[j] = 0

        const RewardTable = [
            [3, 8, 15], [3, 8, 15], [5, 15, 30], [5, 15, 30], [5, 15, 30], [5, 15, 30], [10, 20, 50], [10, 20, 50], [15, 30, 80], [15, 30, 80], [20, 50, 150], [50, 150, 500], [0, 0, 0] //มี
        ];

        //หาสัญลักษณ์แรก
        for (let i = start; i <= end; i++) {
            if (tile15[currentPayline[i]] != 11 && once == 0 && tile15[currentPayline[i]] != 12)//หาตัวแรกที่ไม่ใช่ wild
            {
                lastestTile = tile15[currentPayline[i]]
                once = 1
            }
            if (i == end && lastestTile == 100) {
                lastestTile = 11//wild
            }
        }
        for (let i = start; i <= end; i++) {
            if (tile15[currentPayline[i]] == lastestTile || tile15[currentPayline[i]] == 11 && tile15[currentPayline[i]] != 12)//ถ้า tile ตัวล่าสุดเหมือนตัวก่อนหน้า
            {
                tileCount += 1;

                if (tileCount == 3 && end - start == 2)//เรียงมากกว่า 3 ก็คือชนะแล้ว
                {
                    highestWinLine[j] = tileCount//เก็บว่าเรียงได้มากสุดเท่าไหร่
                    winingTile[j] = lastestTile
                }
                if (tileCount == 4 && end - start == 3) {
                    highestWinLine[j] = tileCount//เก็บว่าเรียงได้มากสุดเท่าไหร่
                    winingTile[j] = lastestTile
                }
                if (tileCount == 5 && end - start == 4) {
                    highestWinLine[j] = tileCount//เก็บว่าเรียงได้มากสุดเท่าไหร่
                    winingTile[j] = lastestTile
                }
            }
        }

        if (winingTile[j] == null)//ถ้าเส้นนี้ไม่ถูกก็ไม่ต้องมี winingTile
            winingTile[j] = undefined


        //เช็คว่าชนะ 3 4 5
        if (highestWinLine[j] == 3) {
            return lineCost * RewardTable[winingTile[j]][0]
        }
        else if (highestWinLine[j] == 4) {
            return lineCost * RewardTable[winingTile[j]][1]
        }
        else if (highestWinLine[j] == 5) {
            return lineCost * RewardTable[winingTile[j]][2]
        }
        else {
            return 0
        }
    }
};


/*function MainGame(credit, bet, buyFreeSpin) {
    let win = 0//เงินที่ชนะในรอบนี้
    let tile15 = []//tile 15 ชิ้นใน playarea
    let reels = [[], [], [], [], []]//5 reel ที่อยู่ในเกมจริงๆ
    let slotTemp = []//ข้อมูลที่ก็อบมาจาก slot สำหรับดึงข้อมูลไปใช้คำนวณ
    let highestWinLine = [];//เส้นนั้นชนะ 3 4 5
    let winLine = []
    let isWinFreeSpin = false//ชนะ freespin มั้ยรอบนี้
    let totalWin = 0  //--ส่งไป client
    let isBuyFreeSpin = buyFreeSpin//freespin เริ่มทำงาน --ส่งไป server
    let betFreeSpin = bet * 50//ราคาของการซื้อ freespin

    const tileIndexLine =
        [
            [1, 4, 7, 10, 13], [0, 3, 6, 9, 12], [2, 5, 8, 11, 14], [0, 4, 8, 10, 12], [2, 4, 6, 10, 14], [0, 3, 7, 9, 12],
            [2, 5, 7, 11, 14], [1, 5, 8, 11, 13], [1, 3, 6, 9, 13], [0, 4, 7, 10, 12], [2, 4, 7, 10, 14], [1, 4, 6, 10, 13], [1, 4, 8, 10, 13],
            [0, 5, 8, 11, 12], [2, 3, 6, 9, 14], [1, 3, 7, 9, 13], [1, 5, 7, 11, 13], [0, 5, 6, 11, 12], [2, 3, 8, 9, 14], [0, 4, 6, 10, 12],
            [2, 4, 8, 10, 14], [0, 5, 7, 11, 12], [2, 3, 7, 9, 14], [1, 3, 8, 9, 13], [1, 5, 6, 11, 13], [0, 3, 8, 9, 12], [2, 5, 6, 11, 14],
            [0, 3, 6, 9, 14], [2, 5, 8, 11, 13], [1, 4, 7, 10, 12]
        ]

    const slot = [
        [5, 4, 5, 2, 4, 0, 1, 3, 6, 0, 7, 8, 9, 10, 11, 12], [5, 4, 6, 2, 0, 0, 1, 3, 6, 1, 7, 8, 9, 10, 11, 11, 12],
        [5, 4, 5, 2, 4, 0, 1, 3, 6, 6, 5, 0, 0, 7, 8, 9, 10, 11, 12], [5, 4, 5, 2, 6, 0, 1, 3, 6, 4, 7, 8, 9, 10, 11, 12],
        [5, 4, 5, 2, 4, 0, 1, 5, 6, 3, 7, 8, 9, 10, 11, 11, 12]
    ];
    if (bet <= credit) {
        if (isBuyFreeSpin === 'true') {
            if (betFreeSpin <= credit) {
                credit -= betFreeSpin
                isWinFreeSpin = true;
                if (isWinFreeSpin) {
                    totalWin = 0
                    for (let a = 0; a < 10; a++) {                    
                        //resetSlot
                        reels = [[], [], [], [], []]
                        slotTemp = JSON.parse(JSON.stringify(slot))//ดีง array มาใช้ไม่ให้กระทบต้นฉบับ
                        tile15 = []
                        winingTile = []
                        win = 0
                        winLine = []
                        //resetSlot

                        //Random_AddTile_AllReel()
                        slotTemp = slot

                        for (let i = 0; i < 5; i++)//5reel
                        {
                            for (let j = 0; j < 6; j++)//6tile
                            {
                                let r = Math.random()
                                let rand = Math.floor(r * slotTemp[i].length);//สุ่มเลข ตามจำนวณ tile ใน reel นั้น
                                reels[i].push(slotTemp[i][rand])//ใน reel

                                if (j < 3) {
                                    tile15.push(reels[i][j])//ใน playarea
                                }
                                slotTemp[i].splice(rand, 1)
                            }
                            slotTemp[i] = [];
                        }

                        for (let j = 0; j < 30; j++) {//วน 30 รอบสำหรับเช็ค Win ทั้ง 30 แบบ
                            let currentPayline = []//เช่น payline1 มี [1,4,7,10,13]
                            for (let x = 0; x < 5; x++) {
                                currentPayline[x] = tileIndexLine[j][x]
                            }

                            let left3 = CheckArrange(0, 2, currentPayline, j, bet, highestWinLine, tile15)
                            let middle3 = CheckArrange(1, 3, currentPayline, j, bet, highestWinLine, tile15)
                            let right3 = CheckArrange(2, 4, currentPayline, j, bet, highestWinLine, tile15)
                            let left4 = CheckArrange(0, 3, currentPayline, j, bet, highestWinLine, tile15)
                            let right4 = CheckArrange(1, 4, currentPayline, j, bet, highestWinLine, tile15)
                            let left5 = CheckArrange(0, 4, currentPayline, j, bet, highestWinLine, tile15)

                            win += Math.max(left3, middle3, right3, left4, right4, left5)
                        }

                        /*for (let j = 0; j < 30; j++) {
                            if (highestWinLine[j] != 0) {
                                winLine.push(j)
                            }
                        }
                        console.log(a);
                        credit += win;
                        totalWin += win
                        jsArray = '{"credit": \"' + credit + '\","bet":\"' + bet + '\","win":\"' + win + '\","tiles":\"' + tile15 + '\","winline":\"' + winLine + '\","isWinFreeSpin":\"' + isWinFreeSpin + '\"}';
                        jsArray = JSON.parse(jsArray);
                    }
                    return jsArray;
                }
            }
        } else {
            isWinFreeSpin = false
            credit -= bet
            reels = [[], [], [], [], []]
            slotTemp = slot
            for (let i = 0; i < 5; i++)//5reel
            {
                for (let j = 0; j < 6; j++)//6tile
                {
                    let r = Math.random()
                    let rand = Math.floor(r * slotTemp[i].length);//สุ่มเลข ตามจำนวณ tile ใน reel นั้น
                    reels[i].push(slotTemp[i][rand])//ใน reel

                    if (j < 3) {
                        tile15.push(reels[i][j])//ใน playarea
                    }
                    slotTemp[i].splice(rand, 1)
                }
                slotTemp[i] = [];
            }

            for (let j = 0; j < 30; j++) {//วน 30 รอบสำหรับเช็ค Win ทั้ง 30 แบบ
                let currentPayline = []//เช่น payline1 มี [1,4,7,10,13]
                for (let x = 0; x < 5; x++) {
                    currentPayline[x] = tileIndexLine[j][x]
                }

                let left3 = CheckArrange(0, 2, currentPayline, j, bet, highestWinLine, tile15)
                let middle3 = CheckArrange(1, 3, currentPayline, j, bet, highestWinLine, tile15)
                let right3 = CheckArrange(2, 4, currentPayline, j, bet, highestWinLine, tile15)
                let left4 = CheckArrange(0, 3, currentPayline, j, bet, highestWinLine, tile15)
                let right4 = CheckArrange(1, 4, currentPayline, j, bet, highestWinLine, tile15)
                let left5 = CheckArrange(0, 4, currentPayline, j, bet, highestWinLine, tile15)

                win += Math.max(left3, middle3, right3, left4, right4, left5)
            }

            for (let j = 0; j < 30; j++) {
                if (highestWinLine[j] != 0) {
                    winLine.push(j)
                }
            }

            credit += win;

            jsArray = '{"credit": \"' + credit + '\","bet":\"' + bet + '\","win":\"' + win + '\","tiles":\"' + tile15 + '\","winline":\"' + winLine + '\","isWinFreeSpin":\"' + isWinFreeSpin + '\"}';
            jsArray = JSON.parse(jsArray);
            return jsArray;
        }
    }

}
function CheckArrange(start, end, currentPayline, j, bet, highestWinLine, tile15) {
    let lastestTile = 100;
    let scatterCount = 0
    let tileCount = 0
    let once = 0
    let lineCost = bet / 30
    let winingTile = []
    highestWinLine[j] = 0

    const RewardTable = [
        [3, 8, 15], [3, 8, 15], [5, 15, 30], [5, 15, 30], [5, 15, 30], [5, 15, 30], [10, 20, 50], [10, 20, 50], [15, 30, 80], [15, 30, 80], [20, 50, 150], [50, 150, 500], [0, 0, 0] //มี
    ];

    //หาสัญลักษณ์แรก
    for (let i = start; i <= end; i++) {
        if (tile15[currentPayline[i]] != 11 && once == 0 && tile15[currentPayline[i]] != 12)//หาตัวแรกที่ไม่ใช่ wild
        {
            lastestTile = tile15[currentPayline[i]]
            once = 1
        }
        if (i == end && lastestTile == 100) {
            lastestTile = 11//wild
        }
    }
    for (let i = start; i <= end; i++) {
        if (tile15[currentPayline[i]] == lastestTile || tile15[currentPayline[i]] == 11 && tile15[currentPayline[i]] != 12)//ถ้า tile ตัวล่าสุดเหมือนตัวก่อนหน้า
        {
            tileCount += 1;

            if (tileCount == 3 && end - start == 2)//เรียงมากกว่า 3 ก็คือชนะแล้ว
            {
                highestWinLine[j] = tileCount//เก็บว่าเรียงได้มากสุดเท่าไหร่
                winingTile[j] = lastestTile
            }
            if (tileCount == 4 && end - start == 3) {
                highestWinLine[j] = tileCount//เก็บว่าเรียงได้มากสุดเท่าไหร่
                winingTile[j] = lastestTile
            }
            if (tileCount == 5 && end - start == 4) {
                highestWinLine[j] = tileCount//เก็บว่าเรียงได้มากสุดเท่าไหร่
                winingTile[j] = lastestTile
            }
        }
    }

    if (winingTile[j] == null)//ถ้าเส้นนี้ไม่ถูกก็ไม่ต้องมี winingTile
        winingTile[j] = undefined


    //------------- เช็ค scatter อยู่ตำแหน่งไหนก็ได้ -----------
    for (let k = 0; k < 15; k++) {
        if (tile15[k] == 12) {
            scatterCount += 1
        }
    }
    if (scatterCount >= 3) {
        isWinFreeSpin = true
    }
    scatterCount = 0
    //-----------------------------------------------------

    //เช็คว่าชนะ 3 4 5
    if (highestWinLine[j] == 3) {
        return lineCost * RewardTable[winingTile[j]][0]
    }
    else if (highestWinLine[j] == 4) {
        return lineCost * RewardTable[winingTile[j]][1]
    }
    else if (highestWinLine[j] == 5) {
        return lineCost * RewardTable[winingTile[j]][2]
    }
    else {
        return 0
    }
}

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
}*/

