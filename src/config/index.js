require('dotenv').config();

module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: '1h',
    dbUri: process.env.DB_URI,
};
