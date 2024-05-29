const Movie = require('../models/movie');

exports.getMovies = (req, res) => {
    Movie.find()
        .then(movies => {
            res.status(200).json(movies);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};
