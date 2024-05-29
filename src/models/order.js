const mongoose = require("mongoose");
const Movie = require('./movie');
const User = require('./user');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new mongoose.Schema({
    _id: { type: ObjectId, required: true },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    showtime_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie.showtimes',
        required: true
    },
    seats_booked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie.showtimes.seats',
        required: true
    }],
    total_amount: {
        type: Number,
        required: true
    },
    payment_status: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
