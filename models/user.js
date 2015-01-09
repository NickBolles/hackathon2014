var knex = require('../app/data-manager');
var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf.Model.extend({
  tableName: 'users'
});