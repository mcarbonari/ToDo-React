var db = require('./database');
var User = require('./user');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

class Model {
  constructor() {
    this.table = '';
    this.primaryKey = '';
    this.belongsTo = [];
  } 

  async _belongsTo (rows) {
    if (this.belongsTo.length > 0) {
      var self = this;
      await asyncForEach(rows, async function(row, index, arr) {
        await asyncForEach(self.belongsTo, async function(relation){
          try {
            arr[index][relation.name] = await self.queryBelongsTo(row[relation.foreignKey], relation.model);
          } catch(e) {
            throw e;
          }
        });
      });
    }
  }

  async queryBelongsTo(id, model) {
    try {
      let result = await model.find.by.id(id);
      return result[0];
    } catch(e) {
      throw e;
    }
    
  }
  async getAll() {
    try {
      let [result] = await db.pool.query(`SELECT * FROM ${this.table};`);
      await this._belongsTo(result);
      return result;
    } catch(e) {
      throw e;
    }
  }

  async create(task) {
    try {
      let [result] = await db.pool.query(`INSERT INTO ${this.table} SET ?`, task);
      return result;
    } catch(e) {
      throw e;
    }
  }

  async update(id, task) {
    try {
      let [result] = await db.pool.query(`UPDATE ${this.table} SET ? WHERE ${this.primaryKey} = ${id}`, task);
      return result;
    } catch(e) {
      throw e;
    }
  }

  async delete(id) {
    try {
      let [result] = await db.pool.query(`DELETE FROM ${this.table} WHERE ${this.primaryKey} = ${id}`);
      return result;
    } catch(e) {
      throw e;
    }
  }

  get find() {
    return this;
  }
  
  get by() {
    return this;
  }

  async id(id) {
    try {
      let [result] = await db.pool.query(`SELECT * FROM ${this.table} WHERE ${this.primaryKey} = ${id};`);
      await this._belongsTo(result);
      return result;
    } catch(e) {
      throw e;
    }
  }
}

module.exports = Model;