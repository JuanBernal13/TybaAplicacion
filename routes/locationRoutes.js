const express = require('express');
const router = express.Router();

const { getNearbyRestaurants } = require('../controllers/locationController');
const { verifyLocation, validateRadius } = require('../middlewares/locationMiddleware');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/nearby', authenticateToken, verifyLocation, validateRadius, getNearbyRestaurants);

console.log('Endpoint registrado: POST /api/v1/restaurants/nearby - Obtener restaurantes cercanos');

module.exports = router;
