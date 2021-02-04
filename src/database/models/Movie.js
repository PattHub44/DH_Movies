const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const movie = sequelize.define('Movie', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: DataTypes.STRING,
        rating: DataTypes.DECIMAL,
        awards: DataTypes.INTEGER,
        release_date: DataTypes.DATEONLY,
        length: DataTypes.INTEGER,
        genre_id: DataTypes.INTEGER,

    },
    {
        tableName: 'movies'
    }
    )
    movie.associate = (models => {
        movie.belongsTo(models.Genre, {
            as: 'genres',
            foreignKey: 'genre_id'
        });
        movie.belongsToMany(models.Actor, {
            as: 'actors',
            through: 'actor_movie',
        })

    })
    return movie
}
