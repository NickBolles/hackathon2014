var Marionette = require('backbone.marionette'),
    Controller = require('./controller'),
    Router = require('./router'),
    ContactModel = require('./models/contact'),
    ContactsCollection = require('./collections/contacts'),
    MessagesCollection = require('./collections/messages');

module.exports = App = function App() {};
App.prototype.start = function(){
    App.core = new Marionette.Application();
    App.core.on("initialize:before", function (options) {
        App.core.vent.trigger('app:log', 'App: Initializing');

        App.views = {};
        App.data = {};

        // load up some initial data:
        App.data.contacts = new ContactsCollection();
        App.data.messages = new MessagesCollection();
        window.disco = App.data;
        // contacts.fetch({
        //     success: function() {
        //         App.data.contacts = contacts;
        //         App.core.vent.trigger('app:start');
        //     }
        // });
        // App.data.contacts.add({
        //         "name": {
        //             "first": "George",
        //             "last": "Jetson"
        //         },
        //         "email": "gjetson@gmail.com",
        //         "phone": "813-555-3956",
        //         "carrier": "InterstellarCarrier"
        //     });
        App.data.contacts.fetch();
        App.core.vent.trigger('app:start');
    });

    App.core.vent.bind('app:start', function(options){
        App.core.vent.trigger('app:log', 'App: Starting');
        if (Backbone.history) {
            App.controller = new Controller();
            App.router = new Router({ controller: App.controller });
            App.core.vent.trigger('app:log', 'App: Backbone.history starting');
            Backbone.history.start();
        }

        //new up and views and render for base app here...
        App.core.vent.trigger('app:log', 'App: Done starting and running!');
    });

    App.core.vent.bind('app:log', function(msg) {
        console.log(msg);
    });

    App.core.start();
};