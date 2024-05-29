const User = require('../models/user');

exports.getUsers = (req, res) => {
    Movie.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};
