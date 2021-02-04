const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const genre = sequelize.define('Genre', {
        /*id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },*/
        name: DataTypes.STRING,
    },
    {
        tableName: 'genres'
    }
    );
    genre.associate = models => {
        genre.hasMany(models.Movie, {
            as: 'movies',
            foreignKey: 'genre_id'
        })
    }
    return genre
}
