var ContentHandler = require('./content');
var GitHubHandler = require('./github');
var CallbackHandler = require('./callback');
var BookHandler = require('./book');

module.exports = exports = function(app, db) {
  var contentHandler = new ContentHandler();
  var callbackHandler = new CallbackHandler();
  var gitHubHandler = new GitHubHandler(db);
  var bookHandler = new BookHandler(db);
  app.get('/html/login.html', contentHandler.displayMainPage);
  app.get('/callback/github', callbackHandler.handleCallback);
  app.get('/app/login/github', gitHubHandler.login);

  app.get('/api/books', bookHandler.list);
  app.put('/api/book/:isbn', bookHandler.add);
  app.delete('/api/book/:isbn', bookHandler.delete);
}