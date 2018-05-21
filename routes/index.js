var express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();
var models = require('../models');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/albums', function (req, res, next) {
  models.albums.findAll({}).then(data => {
    res.render('albums', {
      albums: data
    });
  });
});

router.post('/albums', (req, res) => {
  models.albums
    .findOrCreate({
      where: {
        Title: req.body.title,
      }
    })
    .spread(function (result, created) {
      if (created) {
        res.redirect('/albums');
      } else {
        res.send('This album already exists!');
      }
    });
});

module.exports = router;