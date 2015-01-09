/**
 * Created by Nicholas on 11/22/2014.
 */
var Imap = require('imap'),
    inspect = require('util').inspect,
    MailParser = require("mailparser").MailParser,
    mailparser = new MailParser(),
    User = require('../models/user'),
    notCheckedIn = require('./notCheckedIn'),
    SMS = require('./smsManager');


var imap = new Imap({
    user: 'sup3rb0wlz@gmail.com',
    // password: 'l0lkoliop',
    host: 'imap.gmail.com',
    port: 993,
    tls: true
});

function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
}
function printMessages(f){

    f.on('message', function(msg, seqno) {


        //console.log('Message #%d', seqno);
        var prefix = '(#' + seqno + ') ';
        msg.on('body', function(stream, info) {

            //console.log(JSON.stringify(info));
            if (info.which === 'TEXT') {
                //console.log(prefix + 'Body [%s] found, %d total bytes', inspect(info.which), info.size);
            }
            var buffer = '', count = 0;
            stream.on('data', function(chunk) {
                mailparser.write(chunk.toString('utf8'));
                count += chunk.length;
                buffer += chunk.toString('utf8');
                //if (info.which === 'TEXT')
                    //console.log(prefix + 'Body [%s] (%d/%d)', inspect(info.which), count, info.size);
            });

            stream.once('end', function() {

                //console.log(prefix + 'Parsed header: %s', buffer);
            });
        });
        msg.once('attributes', function(attrs) {
            //console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
        });
        msg.once('end', function() {
            //console.log(prefix + 'Finished');
            mailparser.end();
        });
    });
    f.once('error', function(err) {
        console.log('Fetch error: ' + err);
    });
    f.once('end', function() {
        //console.log('Done fetching all messages!');
    });
}

imap.once('ready', function() {
    console.log("Connected to IMAP server! YAY!!! =)");

    openInbox(function(err, box) {
        if (err) throw err;

        imap.on('mail', function(numNew){
            console.log("YOU HAVE NEW MAIL!!!!" + numNew);
            var f = imap.seq.fetch(box.messages.total + ':*', { envelope:true,bodies: ['HEADER.FIELDS (FROM)','TEXT'] });
            printMessages(f);
        });
    });
});

imap.once('error', function(err) {
    console.log(err);
});

imap.once('end', function() {
    console.log('Connection ended');
});

mailparser.on("end", function(mail){

    try {
        var responseText = mail.text.split('--')[0];

        responseText = responseText.replace("(\\)+(.){1}", '');
        var from = mail.text.match("From: ((\\d){10})@(([A-z])*)((.){1})(([A-z]){3})");
        var email = from[0].split(" ")[1];
        var phone = email.split("@")[0];

        new User().where({phone: phone}).fetch().then(function (model) {
            var safeWord = model.get('safeWord');
            console.log("We found " + model.get('nameFirst') + " " + model.get('nameLast') + "!  safe word is " + safeWord);
            // TODO: better validation of safeword
            // TODO: add tracking of user status
            if (safeWord.toLowerCase() === responseText.toLowerCase()) {
                for (var i = 0; i < global.notCheckedIn.length; i++) {
                    if (global.notCheckedIn[i].id = model.get('id')) {
                        global.notCheckedIn.splice(i, 1);
                    }
                }
            }else{
                // TODO: notify admin
                // SMS.sendText('6083545968@vtext.com',"User in trouble: Nick ");
            }
        });

        console.log(email + " sent the text " + responseText); // object structure for parsed e-mail
    }catch(e){
        console.log("ERROR!!!!");
    }
});

imap.connect();


