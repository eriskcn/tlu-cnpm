const express = require('express');
const { protect } = require('../middlewares/authMiddlewares');
const orderController = require('../controllers/orderControllers');
const router = express.Router();

router.get('/', protect, orderController.getOrders);
router.post('/', protect, orderController.createOrder);

module.exports = router;
