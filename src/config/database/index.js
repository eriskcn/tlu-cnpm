const mongoose = require('mongoose');
const config = require('../index');

const connect = async () => {
    try {
        await mongoose.connect(config.dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('================================\nDatabase connected successfully');
    } catch (error) {
        console.error('================================\nDatabase connection error:', error);
        throw error;
    }
};

module.exports = { connect };
