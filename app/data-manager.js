var dbConf = require('../config/database');
var knex = require('knex')({
    client: 'mysql',
    connection: dbConf
});

module.exports = knex;