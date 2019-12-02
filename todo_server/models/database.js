var mysql = require('mysql2');
var config = require('../config/config');

const MODE_TEST = 'mode_test'
const MODE_PRODUCTION = 'mode_production'

class Database {
  constructor() {
    this.mode = '',
    this._pool = null;
  }
  connect(mode, callback) {
    this._pool = mysql.createPool({
      host: 'localhost',
      user: config.database_user,
      password: config.database_password,
      database: mode === MODE_PRODUCTION ? config.database_name : config.database_name,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    this.mode = mode;
    callback();
  }

  get pool() {
    return this._pool.promise();
  }
  
}

module.exports = new Database();