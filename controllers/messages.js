var Message = require('../models/message'),
    md5 = require('MD5'),
    SMS = require('../app/smsManager'),
    User = require('../models/user');

module.exports = {
    index: function(req, res) {
       new User().fetchAll().then(function(collection) {
          var users = collection.toJSON();
          var phones = collection.pluck('phone');

           //is valid

            for(var i=0; i<users.length; i++){
               var email = users[i].phone+'@'+global.c[users[i].carrier]['address'];
                SMS.sendText(email, req.body.message ,function(){});
            }


            //res.send();
        }).catch(function(error) {
          console.log(error);
          res.send('An error occured');
        });
    },
    getById: function(req, res) {
/*        models.Contact.find({ _id: req.params.id }, function(err, contact) {
            if (err) {
                res.json({error: 'Contact not found.'});
            } else {
                res.json(contact);
            }
        });
*/    },
    add: function(req, res) {
        console.log(req);
        console.log(res);
/*        var newContact = new models.Contact(req.body);
        newContact.gravatar = md5(newContact.email);
        newContact.save(function(err, contact) {
            if (err) {
                res.json({error: 'Error adding contact.'});
            } else {
                res.json(contact);
            }
        });
*/    },
    // update: function(req, res) {
    //     console.log(req.body);
    //     models.Contact.update({ _id: req.body.id }, req.body, function(err, updated) {
    //         if (err) {
    //             res.json({error: 'Contact not found.'});
    //         } else {
    //             res.json(updated);
    //         }
    //     })
    // },
    delete: function(req, res) {
/*        models.Contact.findOne({ _id: req.params.id }, function(err, contact) {
            if (err) {
                res.json({error: 'Contact not found.'});
            } else {
                contact.remove(function(err, contact){
                    res.json(200, {status: 'Success'});
                })
            }
        });
*/    }
};
