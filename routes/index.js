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

// Below, I am trying to do a sequelize join using include. Can't quite get it to work. 
router.get('/albums/:id', (req, res) => {
  let albumId = parseInt(req.params.id);
  models.albums
    .find({
      where: {
        AlbumId: albumId,
      },
      include: [models.artists]
    }).then(album => {
      console.log(album.artist.Name);
      res.render('specificAlbum', {
        Title: album.Title,
        YearReleased: album.YearReleased,
        Name: album.artist.Name,
        AlbumId: album.AlbumId
      })

    })
});


// trying to figure out how to update an album based on an html form. Not working yet. 
router.put('/albums/:id', (req, res) => {
  console.log(req.body);
  let albumId = parseInt(req.params.id);
  models.albums.update({
    Title: req.body.title,
    YearReleased: req.body.yearReleased
  }, {
    where: {
      AlbumId: albumId
    }
  }).then(result => {
    res.send()
  })
})
module.exports = router;