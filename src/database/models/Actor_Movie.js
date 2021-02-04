const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const actorMovie = sequelize.define('Actor_Movie', {
        actor_id: DataTypes.INTEGER,
        movie_id: DataTypes.INTEGER,

    },
    {
        tableName: 'actor_movie'
    }
    )
    actorMovie.associate = function(models){
        actorMovie.belongsTo(models.Movie,{
          as: 'movie',
          foreignKey: 'movie_id',
        }),
        actorMovie.belongsTo(models.Actor,{
            as: 'actor',
            foreignKey: 'actor_id',
          })
    }
    return actorMovie
}
