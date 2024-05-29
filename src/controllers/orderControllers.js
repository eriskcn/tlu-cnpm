const Order = require('../models/order');
const Movie = require('../models/movie');

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user_id: req.user._id })
            .populate('user_id')
            .populate('movie_id')
            .lean();

        const populatedOrders = await Promise.all(orders.map(async order => {
            const movie = await Movie.findById(order.movie_id);
            if (!movie) {
                throw new Error(`Movie ${order.movie_id} not found`);
            }

            const showtime = movie.showtimes.id(order.showtime_id);
            if (!showtime) {
                throw new Error(`Showtime ${order.showtime_id} not found`);
            }

            const seats = showtime.seats.filter(seat =>
                order.seats_booked.includes(seat._id)
            );

            return {
                ...order,
                movie: movie.toObject(),
                showtime: showtime.toObject(),
                seats: seats
            };
        }));

        res.status(200).json(populatedOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.createOrder = async (req, res) => {
    try {
        const order = new Order({ ...req.body, user: req.user._id });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
