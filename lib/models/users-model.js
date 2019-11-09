'use strict';

const Model = require('./model.js');
const schema = require('./users-schema.js');

class Users extends Model {
  constructor() {
    super(schema);
  }
  /**
   * receive user object as a parameter and return valid or authenticated user against the schema
   * @param {object} creds 
   */
  authenticate(creds) {
    return this.schema.authenticate(creds);
  }
}

module.exports = Users;
