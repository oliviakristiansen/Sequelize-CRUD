'use strict';
var Albums = require('./albums.js')
module.exports = (sequelize, DataTypes) => {
    const artists = sequelize.define(
        'artists', {
            ArtistId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            Name: DataTypes.STRING
        }, {
            timestamps: false,
            classMethods: {
                associate: function (models) {
                    artists.hasMany(models.albums)
                },
            },
        }
    );

    return artists;
};