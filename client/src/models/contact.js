var Backbone = require('backbone');

module.exports = ContactModel = Backbone.Model.extend({
    idAttribute: 'id',
    urlRoot: 'api/contacts'
});
