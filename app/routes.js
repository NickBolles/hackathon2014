var home = require('../controllers/home'),
    contacts = require('../controllers/contacts'),
    messages = require('../controllers/messages'),
    SMS = require('./smsManager');
module.exports.initialize = function(app) {
    app.get('/', home.index)

    app.get('/api/contacts', contacts.index);
    app.get('/api/contacts/:id', contacts.getById);
    app.post('/api/contacts', contacts.add);
    // app.put('/api/contacts', contacts.update);
    app.delete('/api/contacts/:id', contacts.delete);

    app.post('/api/messages', messages.index);


    //to test SMS sending
    app.get('/test', SMS.sendText);
};
