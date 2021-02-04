const db = require('../database/models')

module.exports= {
    list: async function(req, res){
        try{

            let movieslist = await db.Movie.findAll( {include: ['genres']} )
                res.render('list', {movies: movieslist, list: 'Lista de peliculas'})

        } catch(error){
            console.log(error + ' <--- ESTO ES UN ERROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR');
        }

    },
    detail: async function(req, res){
        try{
            let pelicula = await db.Movie.findByPk(req.params.id, {include: ['genres', 'actors']})
            res.render('detail', {movie: pelicula})

        } catch(error){
            console.log(error + ' <--- ESTO ES UN ERROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR');
        }
    },
    create: async function (req, res){
        let generos = await db.Genre.findAll()
        let actores = await db.Actor.findAll()
        res.render('create', {genres: generos, actors: actores})
    },
    store: async function (req, res){
        try{

            await db.Movie.create({
                title: req.body.titulo,
                rating: req.body.rating,
                awards: req.body.premios,
                release_date: req.body.lanzamiento,
                length: req.body.duración,
                genre_id: req.body.genero
            })

            let IdMovie = await db.Movie.findOne({
                where:{
                    title: req.body.titulo
                }
            })

            let actoresForm = req.body.actores

            actoresForm.forEach( e => {
                
                async function crear (){
                    await db.Actor_Movie.create({
                        actor_id: e,
                        movie_id: IdMovie.id
                    })
                }

                crear();
            });

            res.redirect('/movies')

        } catch(error){
            console.log(error + ' <--- ESTO ES UN ERROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR');
        }

    },
    new: async function(req, res){
        try{

            let nuevas = await db.Movie.findAll({
                order: [
                    ['release_date', 'DESC']
                ],
                limit: 5
            },
            {include: ['genres']}
            )
            res.render('list', {movies: nuevas, list: 'peliculas nuevas'})

        } catch(error){
            console.log(error + ' <--- ESTO ES UN ERROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR');
        }
    },
    recommended: async function(req, res){
        try{

            let recomendadas = await db.Movie.findAll({
                order: [
                    ['rating', 'DESC']
                ],
                limit: 5
            },
            {include: ['genres']}
            )
            res.render('list', {movies: recomendadas, list: 'peliculas recomendadas'})

        } catch(error){
            console.log(error + ' <--- ESTO ES UN ERROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR');
        }
    },
    edit: async function(req, res){
        try{

            let pelicula = await db.Movie.findByPk(req.params.id, {include: ['genres', 'actors']})
            let generos = await db.Genre.findAll()
            let actores = await db.Actor.findAll()
            res.render('edit', {movie: pelicula, genres: generos, actors: actores})

        } catch(error){
            console.log(error + ' <--- ESTO ES UN ERROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR');
        }
    },
    update: function(req, res){
        try{

            db.Movie.update({
                title: req.body.titulo,
                rating: req.body.rating,
                awards: req.body.premios,
                length: req.body.duración,
                genre_id: req.body.genero
            }, {
                where: {
                    id: req.params.id
                }
            })

            res.redirect('/movies/detail/' + req.params.id)

        } catch(error){
            console.log(error + ' <--- ESTO ES UN ERROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR');
        }
    },
    delete: async function(req, res){
        try{

            await db.Actor_Movie.destroy({
				where:{
					movie_id: req.params.id
				}
            })
            await db.Actor.update({
                favorite_movie_id: null
                },
                {
                    where:{
                        favorite_movie_id: req.params.id
                    }
                })
            await db.Movie.destroy({
                where: {
                    id: req.params.id
                }
            })
            
            .then(res.redirect('/movies'))            

        } catch(error){
            console.log(error + ' <--- ESTO ES UN ERROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR');
        }
    },
    search: async function(req, res){
        try{

        let results = await db.Movie.findAll({
            where: {
                title: {
                    [db.Sequelize.Op.like]: `%${req.body.busqueda}%`
                  }
                },
            order: [
            ['title', 'ASC']
            ]  
        })

        res.render('list', {movies: results, list: 'Resultados de la busqueda'})

        } catch(error){
            console.log(error + ' <--- ESTO ES UN ERROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR');
        }
    },
    listActors: async function(req, res){
        try{

            let actorslist = await db.Actor.findAll()
                res.render('actors', {actors: actorslist})

        } catch(error){
            console.log(error + ' <--- ESTO ES UN ERROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR');
        }

    }
}