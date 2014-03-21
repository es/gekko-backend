'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    http = require('http'),
    pg = require('pg'),
    async = require('async'),
    app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// You should change this data
var conObj = {
  user: 'user_name',
  password: 'user_password',
  database: 'db_name',
  host: 'localhost'
};

pg.connect(conObj, function(err, client, done) {
  if(err) return console.error('error fetching client from pool', err);
  // arr of dates
  app.get('/dates', function (req, res) {
    client.query('SELECT DISTINCT date_field FROM weights', function(err, result) {
      done();
      if(err) return console.error('error running query', err);
      async.map(result.rows, function (item, cb) {
        cb(null, item.date_field.toISOString().substring(0, 10));
      }, function (error, dates) {
        if(err) return console.error('error mapping dates', error);
        res.jsonp(dates);
      });
    });
  });

  // weights for each subsector on sepcific date
  app.get('/weights/:date', function (req, res) {
    client.query('SELECT date_field, sub_sector, weight FROM weights WHERE date_field=$1', [req.params.date], function(err, result) {
      done();
      if(err) return console.error('error running query', err);
      async.map(result.rows, function (item, cb) {
        item.date_field = item.date_field.toISOString().substring(0, 10);
        cb(null, item);
      }, function (error, finalArr) {
        if(err) return console.error('error mapping dates', error);
        res.jsonp(finalArr);
      });
    });
  });

  // map of subsector to sectors
  app.get('/map', function (req, res) {
    client.query('SELECT sector, sub_sector FROM sub_sector_to_sector_map', function(err, result) {
      done();
      if(err) return console.error('error running query', err);      
      res.jsonp(result.rows);
    });
  });
});  

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
