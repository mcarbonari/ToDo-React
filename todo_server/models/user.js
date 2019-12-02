var Model = require('./model');
var bcrypt = require('bcrypt');
var db = require('./database');

class User extends Model {
  constructor() {
    super();
    this.table = 'users';
    this.primaryKey = 'id';
  }

  async email (email) {
    try {
      let [result] = await db.pool.query(`SELECT * FROM ${this.table} WHERE email LIKE '${email}'`);
      return result;
    } catch(e) {
      throw e;
    }
  }
  
  async create(user) {
    user.password = await bcrypt.hash(user.password, 10);
    try {
      let [result] = await db.pool.query(`INSERT INTO ${this.table} SET ?`, user);
      return result;
    } catch(e) {
      throw e;
    }
  }

}

module.exports = new User();