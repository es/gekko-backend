'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    http = require('http'),
    pg = require('pg'),
    cors = require('cors'),
    async = require('async'),
    config = require('./config'),
    app = express();

var corsOptions = {
  origin: 'http://gekko.stolarsky.com'
};

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(cors(corsOptions));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

  // arr of dates
app.get('/dates', function (req, res) {
  pg.connect(config.db, function(pgErr, client, done) {
    if(pgErr) return console.error('error fetching client from pool', pgErr);
    client.query('SELECT DISTINCT date_field FROM weights ORDER BY date_field', function(err, result) {
      done();
      if(err) return console.error('error running query', err);
      async.map(result.rows, function (item, cb) {
        cb(null, item.date_field.toISOString().substring(0, 10));
      }, function (error, dates) {
        if(err) return console.error('error mapping dates', error);
        res.send(dates);
      });
    });
  });
});

  // weights for each subsector on sepcific date
app.get('/weights/:date', function (req, res) {
  pg.connect(config.db, function(pgErr, client, done) {
    if(pgErr) return console.error('error fetching client from pool', pgErr);
    client.query('SELECT date_field, sub_sector, weight FROM weights WHERE date_field=$1', [new Date(req.params.date).toISOString().substring(0, 10)], function(err, result) {
      done();
      if(err) return console.error('error running query', err);
      // res.send(result.rows);
      async.map(result.rows, function (item, cb) {
        item.date_field = item.date_field.toISOString().substring(0, 10);
        cb(null, item);
      }, function (error, finalArr) {
        if(err) return console.error('error mapping dates', error);
        res.send(finalArr);
      });
    });
  });
});

// map of subsector to sectors
app.get('/map', function (req, res) {
  pg.connect(config.db, function(pgErr, client, done) {
    if(pgErr) return console.error('error fetching client from pool', pgErr);
    client.query('SELECT sector, sub_sector FROM sub_sector_to_sector_map', function(err, result) {
      done();
      if(err) return console.error('error running query', err);      
      res.send(result.rows);
    });
  });
});

app.get('/series/:sector', function (req, res) {
  pg.connect(config.db, function(pgErr, client, done) {
    if(pgErr) return console.error('error fetching client from pool', pgErr);
    client.query('SELECT date_field, value FROM sub_sector_series WHERE sub_sector=$1 ORDER BY date_field', [req.params.sector.replace('%20', ' ')], function(err, result) {
      done();
      if(err) return console.error('error running query', err);
      async.map(result.rows, function (data, cb) {
        cb(null, [Number(data.date_field), Number(data.value)]);
      }, function (error, seriesData) {
        if(err) return console.error('error mapping dates', error);
        res.send(seriesData);
      });
    });
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
