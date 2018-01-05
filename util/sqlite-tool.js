const sqlite3 = require("sqlite3").verbose();
const path = require('path');
const config = require('../config/config');


let db;

/**
 * 连接表
 * 
 * @returns 
 */
function connectionSqlite() {
  return new Promise((resolve, reject) => {
    let db_path = path.join(__dirname, `../db/${config.config.sqlite.dbName || 'ruicky.db'}`);
    db = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE, err => {
      if (err) {
        return reject(err);
      }
      console.log("Connected to the ruicky database.");
      resolve("ok");
    });
  });
}


/**
 * 创建表
 * 
 * @param {any} tableName 表明
 * @param {any} fieldsObj {column:datatype...}
 */
exports.creatTable = (tableName, fieldsObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      await connectionSqlite();
  
      let temp = "";
      for (const key in fieldsObj) {
        temp += `${key} ${fieldsObj[key]},`;
      }
      temp = temp.substring(0, temp.length - 1);
  
      console.log(`** createTable ${tableName}`);
      let sql = `CREATE TABLE IF NOT EXISTS ${tableName}  (${temp});`;
      console.log(`createTable sql is ---> ${sql}`);
      db.run(sql, err => {
        if (err) {
          return reject(err);
        }
        // db.close();
        return resolve("ok");
      });
    } catch (error) {
      return reject(error);
    }
  });

  // try {
  //   await connectionSqlite();

  //   let temp = "";
  //   for (const key in fieldsObj) {
  //     temp += `${key} ${fieldsObj[key]},`;
  //   }
  //   temp = temp.substring(0, temp.length - 1);

  //   console.log(`** createTable ${tableName}`);
  //   let sql = `CREATE TABLE IF NOT EXISTS ${tableName}  (${temp});`;
  //   console.log(`createTable sql is ---> ${sql}`);
  //   db.run(sql, err => {
  //     if (err) {
  //       return Promise.reject(err);
  //     }
  //     // db.close();
  //     return "ok";
  //   });
  // } catch (error) {
  //   return Promise.reject(error);
  // }
};

/**
 *  插入数据
 * 
 * @param {string} tableName 
 * @param {Object} paramsObj {field:value}
 * @returns 
 */
exports.insertData = (tableName, paramsObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      await connectionSqlite();

      let keys = [],
        values = [];
      for (const k in paramsObj) {
        keys.push(k);
        values.push(paramsObj[k]);
      }

      let keysSql = keys.join(",");

      let valuesSql = values.join("','");

      let sql = `INSERT INTO ${tableName}(${keysSql}) VALUES ('${valuesSql}')`;
      console.log(`insert sql is ${sql}`);
      db.run(sql, err => {
        if (err) {
          return reject(err);
        }
        // db.close();
        return resolve("ok");
      });
    } catch (error) {
      reject(error);
    }
  });
  // try {
  //   await connectionSqlite();

  //   let keys = [],
  //     values = [];
  //   for (const k in paramsObj) {
  //     keys.push(k);
  //     values.push(paramsObj[k]);
  //   }

  //   let sql = `INSERT INTO ${tableName}(${keys.join(
  //     ","
  //   )}) VALUES (${values.join(",")})`;
  //   console.log(`insert sql is ${sql}`);
  //   db.run(sql, err => {
  //     if (err) {
  //       return Promise.reject(err);
  //     }
  //     // db.close();
  //     return "ok";
  //   });
  // } catch (error) {
  //     Promise.reject(error)
  // }
};

/**
 *  查找数据
 *  
 * @param {string} tableName 
 * @returns 
 */
exports.selectData = tableName => {
  return new Promise(async (resolve, reject) => {
    try {
      await connectionSqlite();
      let sql = `SELECT * FROM ${tableName}`;
      console.log(`select sql is ${sql}`);
      db.all(sql, [], (err, rows) => {
        if (err) {
          return reject(err);
        }
        console.log("rows", rows);
        return resolve(rows);
      });
    } catch (error) {
      // db.close();
      reject(err);
    }
  });
};