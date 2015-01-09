
var ES = require('./email-settings');
var SMS = {};
module.exports = SMS;

//Connect to the Email IMAP server
SMS.server = require("emailjs/email").server.connect({

    host 	    : ES.host,
    user 	    : ES.user,
    password    : ES.password,
    ssl		    : true

}, function(){console.log('Connected To Email server ' + ES.host + "  " + ES.user )});
SMS.sendText = function(address, body, callback)
{
    //TODO figure out the number before hand
    //address = "sup3rb0wlz@gmail.com";
    console.log('Sending SMS to ' + address + " with message: " + body);
    SMS.server.send({
        from         : ES.sender,
        to           : address,
        subject      : 'Please Respond',
        text         : body,
        attachment   : SMS.composeEmail()
    });
};

SMS.composeEmail = function(o)
{
    //var link = 'http://node-login.braitsch.io/reset-password?e='+o.email+'&p='+o.pass;
    //var html = "<html><body>";
    //html += "Hi "+o.name+",<br><br>";
    //html += "Your username is :: <b>"+o.user+"</b><br><br>";
    //html += "<a href='"+link+"'>Please click here to reset your password</a><br><br>";
    //html += "Cheers,<br>";
    //html += "<a href='http://twitter.com/braitsch'>braitsch</a><br><br>";
    //html += "</body></html>";
    //var html = "HELLO THIS IS A TEST";
    return  [{data:'', alternative:true}];
};