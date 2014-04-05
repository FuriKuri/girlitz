var UsersDAO = require('../users').UsersDAO;

function BookHandler(db) {
  "use strict";
  var users = new UsersDAO(db);

  this.list = function (req, res) {
    "use strict";
    console.log("User is " + req.user.id);
    users.find(req.user.id, function(err, user) {
      if (err) throw err;
      res.json(user.books);
    });
  };

  this.delete = function(req, res) {
    users.find(req.user.id, function(err, user) {
      user.books.forEach(function(book) {
        if (book.isbn == req.param('isbn')) {
          user.books.splice(user.books.indexOf(book), 1);
          users.update(user, function(err, user) {
            res.json({message: 'ok'});
          });
        }
      });
    });
  };

  this.add = function(req, res) {
    "use strict";
    users.find(req.user.id, function(err, user) {
      var alreadyHasTheBook = false;
      user.books.forEach(function(book) {
        if (book.isbn == req.body.isbn) {
          alreadyHasTheBook = true;
        }
      });
      if (alreadyHasTheBook) {
        res.json({message: 'already have this book'});
      } else {
        user.books.push({
          isbn: req.body.isbn,
          name: req.body.name
        });
        users.update(user, function(err, user) {
          res.json({message: 'ok'});
        });
      }
    });
  };
}

module.exports = BookHandler;