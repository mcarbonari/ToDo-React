var db = require('./database');
var User = require('./user');
var Model = require('./model');

class Task extends Model {
  constructor() {
    super();
    this.table = 'tasks';
    this.primaryKey = 'id';
    this.belongsTo = [
      {
        foreignKey: 'user_id',
        model: User,
        name: 'user'
      }
    ];
  }

  async getAll(user_id) {
    try {
      let [result] = await db.pool.query(`SELECT *, UNIX_TIMESTAMP(created_date) AS created_date FROM ${this.table} WHERE user_id = ${user_id};`);
      await this._belongsTo(result);
      return result;
    } catch(e) {
      throw e;
    }
  }

  async id(id) {
    try {
      let [result] = await db.pool.query(`SELECT *, UNIX_TIMESTAMP(created_date) AS created_date FROM ${this.table} WHERE ${this.primaryKey} = ${id};`);
      await this._belongsTo(result);
      return result;
    } catch(e) {
      throw e;
    }
  }
}

module.exports = new Task();