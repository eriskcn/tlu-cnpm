const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const seatSchema = new Schema({
    _id: { type: ObjectId, required: true },
    number: { type: String, required: true },
    available: { type: Boolean, default: true },
    VIP: { type: Boolean, default: false }
});

const showtimeSchema = new Schema({
    _id: { type: ObjectId, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    seats: { type: [seatSchema], required: true }
});

const movieSchema = new Schema({
    _id: { type: ObjectId, required: true },
    poster_url: { type: String, required: true },
    title: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    director: { type: String, required: true },
    cast: { type: [String], required: true },
    price: { type: Number, required: true },
    release: { type: Date, required: true, default: Date.now },
    showtimes: { type: [showtimeSchema], required: true }
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
