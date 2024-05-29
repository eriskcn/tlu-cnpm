const express = require('express');
const { protect, admin } = require('../middlewares/authMiddlewares');
const adminController = require('../controllers/adminControllers');
const router = express.Router();

// Movies CRUD
router.get('/movies', protect, admin, adminController.getMovie);
router.post('/movies', protect, admin, adminController.createMovie);
router.put('/movies/:id', protect, admin, adminController.updateMovie);
router.delete('/movies/:id', protect, admin, adminController.deleteMovie);

// Users CRUD
router.get('/users', protect, admin, adminController.getUsers);
router.put('/users/:id', protect, admin, adminController.updateUser);
router.delete('/users/:id', protect, admin, adminController.deleteUser);

// Orders Read-only
router.get('/orders', protect, admin, adminController.getOrders);

module.exports = router;
