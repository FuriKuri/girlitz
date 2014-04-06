var request = require('request');
var jwt = require('jsonwebtoken');
var UsersDAO = require('../users').UsersDAO;

function GitHubHandler(db) {
  "use strict";
  var users = new UsersDAO(db);

  this.login = function (req, res) {
    "use strict";
    var code = req.query.code;

    var options = {
      uri: 'https://github.com/login/oauth/access_token',
      method: 'POST',
      form: {
        client_id: process.env['CLIENT_ID'],
        client_secret: process.env['CLIENT_SECRET'],
        code: code
      }
    };
    options.headers = {Accept: 'application/json'};
    request(options, function (error, result, body) {
      var accessToken = JSON.parse(body)['access_token'];
      if (accessToken) {
        var opt = {uri: 'https://api.github.com/user', method: 'GET'};
        opt.headers = {
          Accept: 'application/json',
          Authorization: 'token ' + accessToken,
          'User-Agent': 'furikuri'};
        request(opt, function (error, result, body) {
          var userInfo = JSON.parse(body);
          var username = userInfo['login'];
          var id = userInfo['id'];
          var profile = {'id' : "GitHub#" + id, 'username': username};
          var token = jwt.sign(profile, process.env['TOKEN_SECRET'], { expiresInMinutes: 60 * 24 * 30 });
          users.createUser(profile.id, username ,function(err, insertedUser) {
            if (err) throw err;

            res.json({
              "username" : username,
              "token" : token
            });
          });
        });
      } else {
        res.send("something went wrong");
      }
    });
  }
}
module.exports = GitHubHandler;