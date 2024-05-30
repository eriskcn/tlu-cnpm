const mongoose = require("mongoose");
const mongooseSequence = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderId: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        ref: "User",
        required: true,
        index: true
    },
    movieId: {
        type: Number,
        ref: "Movie",
        required: true,
        index: true
    },
    showtimeId: {
        type: Number,
        ref: "Movie.showtimes",
        required: true,
        index: true
    },
    seatsBooked: [{
        type: String,
        required: true
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Canceled"],
        default: "Pending"
    }
});

orderSchema.plugin(mongooseSequence, { inc_field: "orderId" });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
