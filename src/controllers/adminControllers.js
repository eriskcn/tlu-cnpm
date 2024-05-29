const Movie = require('../models/movie');
const User = require('../models/user');
const Order = require('../models/order');

// Movies CRUD
exports.getMovie = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(movie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Movie deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Users CRUD
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'User deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Orders Read-only
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('user_id');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
