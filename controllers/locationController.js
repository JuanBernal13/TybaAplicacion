const LocationService = require('../services/locationService');
const { validateCoordinates } = require('../utils/mapsUtils');

/**
 * Obtiene restaurantes cercanos a una ubicación
 */
const getNearbyRestaurants = async (req, res) => {
    try {
        const { latitud, longitud, radius = 1000 } = req.body;
        
        console.log(`Solicitud de restaurantes cercanos: lat=${latitud}, lng=${longitud}, radius=${radius}`);
    
        const restaurants = await LocationService.searchRestaurants(latitud, longitud, radius);

        res.json({
            success: true,
            data: restaurants,
            meta: {
                count: restaurants.length,
                coordinates: { latitud, longitud },
                radius: radius,
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Error al obtener restaurantes cercanos:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor',
            message: error.message || 'Ocurrió un error al obtener los restaurantes cercanos',
            timestamp: new Date().toISOString()
        });
    }
};

module.exports = {
    getNearbyRestaurants
};
