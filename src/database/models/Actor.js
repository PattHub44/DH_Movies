const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const actor = sequelize.define('Actor', {
        /*id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },*/
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        favorite_movie_id: DataTypes.INTEGER

    },
    {
        tableName: 'actors'
    }
    )
    actor.associate = (models => {
        actor.belongsToMany(models.Movie, {
            as: 'movies',
            through: 'actor_movie'
        })

    })
    return actor
}
