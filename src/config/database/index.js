const mongoose = require('mongoose');
const config = require('../index');

const connect = async () => {
    try {
        await mongoose.connect(config.dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};

module.exports = { connect };
