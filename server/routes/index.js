var ContentHandler = require('./content');
var GitHubHandler = require('./github');
var CallbackHandler = require('./callback');

module.exports = exports = function(app) {
  var contentHandler = new ContentHandler();
  var callbackHandler = new CallbackHandler();
  var gitHubHandler = new GitHubHandler();
  app.get('/html/login.html', contentHandler.displayMainPage);
  app.get('/app/callback', callbackHandler.handleCallback);
  app.get('/app/login/github', gitHubHandler.login);
}