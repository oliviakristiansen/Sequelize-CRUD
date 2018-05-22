'use strict';
module.exports = (sequelize, DataTypes) => {
    const albums = sequelize.define(
        'albums', {
            AlbumId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            Title: DataTypes.STRING,
            ArtistId: DataTypes.INTEGER,
            YearReleased: DataTypes.INTEGER
        }, {
            timestamps: false,
            classMethods: {
                associate: function (models) {
                    albums.hasOne(models.artists, {
                        foreignKey: 'ArtistId',
                        as: 'artist'
                    })
                },
            },
        },

    )

    return albums;
};