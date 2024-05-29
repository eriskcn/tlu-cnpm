const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/index');

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, {
        expiresIn: config.jwtExpiresIn,
    });
};

const register = async (userData) => {
    const user = new User(userData);
    await user.save();
    return generateToken(user);
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        return generateToken(user);
    } else {
        throw new Error('Invalid email or password');
    }
};

module.exports = { register, login };
