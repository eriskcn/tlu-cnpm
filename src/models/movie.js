const mongoose = require("mongoose");
const mongooseSequence = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

function createDefaultSeats() {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const seats = [];
    rows.forEach(row => {
        for (let i = 1; i <= 10; i++) {
            const seat = {
                number: row + i.toString(),
                available: true,
                vip: row >= 'E'
            };
            seats.push(seat);
        }
    });
    return seats;
}

const seatSchema = new Schema({
    number: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    vip: {
        type: Boolean,
        required: true
    }
});

const showtimeSchema = new Schema({
    showtimeId: {
        type: Number,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    seats: {
        type: [seatSchema],
        default: createDefaultSeats()
    }
});

const movieSchema = new Schema({
    movieId: {
        type: Number,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        index: true
    },
    genre: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    cast: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true,
        index: true
    },
    showtimes: {
        type: [showtimeSchema],
        required: true
    }
});

movieSchema.plugin(mongooseSequence, { inc_field: "movieId" });
showtimeSchema.plugin(mongooseSequence, { inc_field: "showtimeId" });
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
