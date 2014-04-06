var request = require('request');
var jwt = require('jsonwebtoken');

function CallbackHandler() {
  "use strict";

  this.handleCallback = function (req, res) {
    "use strict";
    var code = req.query.code;
    res.location("/#/auth/github");
    res.redirect("/#/auth/github?code=" + code);
  }
}
module.exports = CallbackHandler;