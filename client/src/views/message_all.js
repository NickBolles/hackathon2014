var Marionette = require('backbone.marionette');

module.exports = AddView = Marionette.ItemView.extend({
    template: require('../../templates/message_all.hbs'),
    events: {
        'click button.send': 'send'
    },

    send: function(e) {
        e.preventDefault();
        var messageAll = {
            message: this.$el.find('textarea.form-control').val()
        };

        window.App.data.messages.create(messageAll);
        window.App.core.vent.trigger('app:log', 'Created new message');
        window.App.controller.home();
    }
});