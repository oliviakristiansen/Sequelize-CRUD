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
  models.artists.findOrCreate({
    where: {
      Name: req.body.artist
    }
  }).spread(function (result, created) {
    models.albums
      .findOrCreate({
        where: {
          Title: req.body.title,
          ArtistId: result.ArtistId,
          YearReleased: req.body.yearReleased
        }
      })
      .spread(function (result, created) {
        if (created) {
          res.redirect('/albums');
        } else {
          res.send('This album already exists!');
        }
      });

  })

});

router.get('/albums/:id', (req, res) => {
  let albumId = parseInt(req.params.id);
  models.albums
    .find({
      where: {
        AlbumId: albumId
      }
    })
    .then(album => {
      models.artists.find({
        where: {
          ArtistId: album.ArtistId
        }
      }).then(artist => {
        res.render('specificAlbum', {
          Title: album.Title,
          YearReleased: album.YearReleased,
          Name: artist.Name
        })
      })
    });
});
module.exports = router;