const authRoutes = require('./authRoutes');
const movieRoutes = require('./movieRoutes');
const orderRoutes = require('./orderRoutes');
const adminRoutes = require('./adminRoutes');
const { protect, admin } = require('../middlewares/authMiddlewares');

const setupRoutes = (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/movies', movieRoutes);
    app.use('/api/orders', protect, orderRoutes);
    app.use('/api/admin', protect, admin, adminRoutes);
};

module.exports = setupRoutes;
