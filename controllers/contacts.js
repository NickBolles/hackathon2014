var User = require('../models/user'),
    md5 = require('MD5');

module.exports = {
    index: function(req, res) {
       new User().fetchAll().then(function(collection) {
          res.send(collection.toJSON());
        }).catch(function(error) {
          console.log(error);
          res.send('An error occured');
        });
    },
    getById: function(req, res) {
        new User.find({ _id: req.params.id }, function(err, contact) {
            if (err) {
                res.json({error: 'Contact not found.'});
            } else {
                res.json(contact);
            }
        });
    },
    add: function(req, res) {
        console.log(req.body);
        return new User(req.body).save().then(function(model) {
            res.json(model);
        });
    },
    // update: function(req, res) {
    //     console.log(req.body);
    //     User.update({ _id: req.body.id }, req.body, function(err, updated) {
    //         if (err) {
    //             res.json({error: 'Contact not found.'});
    //         } else {
    //             res.json(updated);
    //         }
    //     })
    // },
    delete: function(req, res) {
        User.findOne({ _id: req.params.id }, function(err, contact) {
            if (err) {
                res.json({error: 'Contact not found.'});
            } else {
                contact.destroy(function(err, contact){
                    res.json(200, {status: 'Success'});
                })
            }
        });
    }
};
