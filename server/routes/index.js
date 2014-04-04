var ContentHandler = require('./content');
var GitHubHandler = require('./github');
var CallbackHandler = require('./callback');
var BookHandler = require('./book');

module.exports = exports = function(app, db) {
  var contentHandler = new ContentHandler();
  var callbackHandler = new CallbackHandler();
  var gitHubHandler = new GitHubHandler();
  var bookHandler = new BookHandler();
  app.get('/html/login.html', contentHandler.displayMainPage);
  app.get('/app/callback', callbackHandler.handleCallback);
  app.get('/app/login/github', gitHubHandler.login);
  app.get('/api/books', bookHandler.list);
}