var jwt = require('jsonwebtoken');

var UsersDAO = require('../users').UsersDAO;

function AccountHandler(db) {
  "use strict";
  var users = new UsersDAO(db);

  this.add = function (req, res) {
    "use strict";

    users.createAccount(req.body.username, req.body.password, function(err, created) {
      if (created) {
        var profile = {'id' : req.body.username, 'username': req.body.username};
        var token = jwt.sign(profile, process.env['TOKEN_SECRET'], { expiresInMinutes: 60 * 24 * 30 });
          res.json({
            "username" : req.body.username,
            "token" : token
          });
      } else {
        res.json(400, {message: 'error'});
      }
    });
  };

  this.verify = function (req, res) {
    "use strict";

    users.verifyAccount(req.body.username, req.body.password, function(err, success) {
      if (success) {
        var profile = {'id' : req.body.username, 'username': req.body.username};
        var token = jwt.sign(profile, process.env['TOKEN_SECRET'], { expiresInMinutes: 60 * 24 * 30 });
        res.json({
          "username" : req.body.username,
          "token" : token
        });
      } else {
        res.json(400, {message: 'error'});
      }
    });
  };
}

module.exports = AccountHandler;