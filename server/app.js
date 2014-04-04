var express = require('express');
var http = require('http');
var path = require('path');
var expressJwt = require('express-jwt');
var MongoClient = require('mongodb').MongoClient;
var app = express();

MongoClient.connect(process.env['MONGOLAB_URI'] || 'mongodb://localhost:27017/girlitz', function(err, db) {
  "use strict";
  if(err) throw err;

  app.use('/api', expressJwt({secret: process.env['TOKEN_SECRET']}));
  app.use(express.static('client'));
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.use(express.favicon('/favicon.ico'));
  app.use(express.json());
  app.use(express.urlencoded());

  app.use(function(err, req, res, next) {
    if (err.constructor.name === 'UnauthorizedError') {
      res.json(401, {"message" : "Unauthorized Error"});
    }
  });

  require('./routes')(app, db);
  var port = process.env.PORT || 3000;
  http.createServer(app).listen(port, function(){
    console.log('Express server listening on port ' + port);
  });
});

