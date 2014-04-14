var bcrypt = require('bcrypt');

function UsersDAO(db) {
  "use strict";

  if (false === (this instanceof UsersDAO)) {
    console.log('Warning: UsersDAO constructor called without "new" operator');
    return new UsersDAO(db);
  }

  var users = db.collection("users");

  function find(id, callback) {
    users.findOne({_id: id}, function(err, user) {
      if (err) callback(err, null);
      callback(null, user);
    });
  }

  this.find = function(id, callback) {
    find(id, callback);
  };

  function createHash(password, callback) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) callback(err, null);

        callback(null, hash);
      });
    });

  }

  this.createAccount = function(username, password, callback) {
    createHash(password, function(err, hash) {
      if (err) callback(err, null);

      var user = {
        _id: username,
        username: username,
        password: hash,
        registration_date: new Date(),
        books: []
      };
      find(username, function(err, existingUser) {
        if (err) callback(err, null);

        if (!existingUser) {
          users.insert(user, function(err, inserted) {
            if (err) callback(err, null);
            callback(null, true);
          });
        } else {
          callback(null, false);
        }
      });
    });
  };

  this.verifyAccount = function(username, password, callback) {
    find(username, function(err, existingUser) {
      if (err) callback(err, null);
      if (existingUser) {
        bcrypt.compare(password, existingUser.password, function(err, result) {
          if (err) callback(err, null);

          if (result == true) {
            callback(null, true);
          } else {
            callback(null, false);
          }
        });
      } else {
        callback(null, false);
      }
    });
  };

  this.createUser = function(id, username, callback) {
    var user = {
      _id: id,
      username: username,
      registration_date: new Date(),
      books: []
    };
    find(id, function(err, existingUser) {
      if (err) callback(err, null);

      if (!existingUser) {
        users.insert(user, function(err, inserted) {
          if (err) callback(err, null);
          callback(null, user);
        });
      } else {
        callback(null, existingUser);
      }
    });
  };

  this.update = function(user, callback) {
    users.save(user, function(err, updated) {
      if (err) callback(err, null);
      callback(null, user);
    });
  };
}

module.exports.UsersDAO = UsersDAO;