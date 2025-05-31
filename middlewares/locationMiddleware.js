const { validateCoordinates } = require('../utils/mapsUtils');

/**
 * Middleware para verificar la validez de las coordenadas
 */
const verifyLocation = (req, res, next) => {
    const { latitud, longitud } = req.body;
    
    // Verificar que las coordenadas estén presentes
    if (latitud === undefined || longitud === undefined) {
        return res.status(400).json({
            success: false,
            error: 'Faltan coordenadas',
            message: 'Se requiere latitud y longitud',
            timestamp: new Date().toISOString()
        });
    }

    const lat = parseFloat(latitud);
    const lng = parseFloat(longitud);

    if (isNaN(lat) || isNaN(lng)) {
        return res.status(400).json({
            success: false,
            error: 'Coordenadas inválidas',
            message: 'Latitud y longitud deben ser números válidos',
            timestamp: new Date().toISOString()
        });
    }

    if (!validateCoordinates(lat, lng)) {
        return res.status(400).json({
            success: false,
            error: 'Coordenadas fuera de rango',
            message: 'Las coordenadas deben estar entre -90 y 90 para latitud, y entre -180 y 180 para longitud',
            received: { latitud: lat, longitud: lng },
            timestamp: new Date().toISOString()
        });
    }

    req.body.latitud = lat;
    req.body.longitud = lng;

    next();
};

/**
 *Verifica si se proporcionan coordenadas opcionales
 */
const verifyOptionalLocation = (req, res, next) => {
    const { latitud, longitud } = req.body;
    
    // Si no se proporcionan coordenadas, continuar
    if (latitud === undefined && longitud === undefined) {
        return next();
    }

    // Si se proporciona una, deben proporcionarse ambas
    if ((latitud === undefined) !== (longitud === undefined)) {
        return res.status(400).json({
            success: false,
            error: 'Coordenadas incompletas',
            message: 'Si se proporciona latitud o longitud, ambas son requeridas',
            timestamp: new Date().toISOString()
        });
    }

    verifyLocation(req, res, next);
};

/**
 * Middleware para validar parámetros de radio
 */
const validateRadius = (req, res, next) => {
    const { radius } = req.body;
    
    if (radius !== undefined) {
        const radiusNum = parseInt(radius);
        
        if (isNaN(radiusNum) || radiusNum < 0) {
            return res.status(400).json({
                success: false,
                error: 'Radio inválido',
                message: 'El radio debe ser un número positivo',
                timestamp: new Date().toISOString()
            });
        }

        if (radiusNum > 50000) {
            return res.status(400).json({
                success: false,
                error: 'Radio muy grande',
                message: 'El radio máximo permitido es 50,000 metros (50 km)',
                timestamp: new Date().toISOString()
            });
        }

        req.body.radius = radiusNum;
    }

    next();
};

module.exports = {
    verifyLocation,
    verifyOptionalLocation,
    validateRadius
};