function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function processGooglePlacesData(places, userLat, userLon) {
    return places.map(place => {
        const lat = place.geometry.location.lat;
        const lon = place.geometry.location.lng;
        
        return {
            id: place.place_id,
            nombre: place.name || 'Restaurante sin nombre',
            latitud: lat,
            longitud: lon,
            distancia: Math.round(calculateDistance(userLat, userLon, lat, lon)),
            tipo: place.types?.find(type => type !== 'restaurant' && type !== 'food' && type !== 'establishment') || 'No especificado',
            rating: place.rating || null,
            precio: place.price_level || null,
            direccion: place.vicinity || 'Dirección no disponible',
            abierto: place.opening_hours?.open_now || null
        };
    }).filter(Boolean);
}

function sortAndLimitRestaurants(restaurants, limit = 10) {
    return restaurants
        .sort((a, b) => a.distancia - b.distancia)
        .slice(0, limit);
}

function validateCoordinates(lat, lng) {
    return typeof lat === 'number' && 
           typeof lng === 'number' && 
           lat >= -90 && lat <= 90 && 
           lng >= -180 && lng <= 180;
}

function formatDistance(meters) {
    if (meters < 1000) {
        return `${meters} m`;
    } else {
        return `${(meters / 1000).toFixed(1)} km`;
    }
}

module.exports = {
    calculateDistance,
    processGooglePlacesData,
    sortAndLimitRestaurants,
    validateCoordinates,
    formatDistance
}; 