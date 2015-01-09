var Backbone = require('backbone');

module.exports = MessageModel = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: 'api/messages'
});
