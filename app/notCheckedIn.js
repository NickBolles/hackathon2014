var MailParser = require("mailparser").MailParser,
    mailparser = new MailParser(),
    User = require('../models/user');
/**
 * Created by Nicholas on 11/22/2014.
 */
module.exports = {};
var u =  new User().fetchAll().then(function(model) {
    global.notCheckedIn = model.models;

});

global.c = {
    "verizon":{"name": "verizon", "address": "vtext.com"},
    "uscellular" :{"name": "uscellular", "address": "email.uscc.net"},
    "att" :{"name": "att", "address": "txt.att.net"},
    "tmobile" :{"name": "tmobile", "address": "tmomail.net"},
    "sprint" :{"name": "sprint", "address": "messaging.sprintpcs.com"},
    "boostmobile" :{"name": "boostmobile", "address": "myboostmobile.com"},
    "virginmobile" :{"name": "virginmobile", "address": "vmobl.com"}
};
global.textMessage = "Please Respond with your safe word!";