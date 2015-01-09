var Backbone = require('backbone'),
    MessageModel = require('../models/message');

module.exports = MessagesCollection = Backbone.Collection.extend({
    model:  MessageModel,
    url: '/api/messages'
});
