var UsersDAO = require('../users').UsersDAO;

function AccountHandler(db) {
  "use strict";
  var users = new UsersDAO(db);

  this.add = function (req, res) {
    "use strict";

    users.createAccount(req.body.username, req.body.password, function(err, created) {
      if (created) {
        res.json({message: 'ok'});
      } else {
        res.json(400, {message: 'error'});
      }
    });
  };

  this.verify = function (req, res) {
    "use strict";

    users.verifyAccount(req.body.username, req.body.password, function(err, success) {
      if (success) {
        res.json({message: 'ok'});
      } else {
        res.json(400, {message: 'error'});
      }
    });
  };
}

module.exports = AccountHandler;