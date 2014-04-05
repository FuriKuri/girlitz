function UsersDAO(db) {
  "use strict";

  if (false === (this instanceof UsersDAO)) {
    console.log('Warning: UsersDAO constructor called without "new" operator');
    return new UsersDAO(db);
  }

  var users = db.collection("users");

  this.create = function(id, username, callback) {
    var user = {
      _id: id,
      username: username,
      registration_date: new Date(),
      books: []
    };
    this.find(id, function(err, existingUser) {
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
      callback(user, null);
    });
  };

  this.find = function(id, callback) {
    users.findOne({_id: id}, function(err, user) {
      if (err) callback(err, null);
      callback(null, user);
    });
  };
}

module.exports.UsersDAO = UsersDAO;