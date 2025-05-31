const { Client } = require('@googlemaps/google-maps-services-js');
const Restaurant = require('../models/Restaurant');

const { 
    processGooglePlacesData, 
    sortAndLimitRestaurants, 
    validateCoordinates 
} = require('../utils/mapsUtils');
require('dotenv').config();

class LocationService {
    constructor() {
        this.client = new Client({});
        console.log(process.env.GOOGLE_MAPS_API_KEY);
        this.apiKey = process.env.GOOGLE_MAPS_API_KEY;
        
        if (!this.apiKey) {
            console.warn('GOOGLE_MAPS_API_KEY no está configurada en las variables de entorno');
        } else {
            console.log('Google Maps API Key configurada correctamente');
        }
    }

    /**
     * Busca restaurantes por texto/nombre
     */
    async searchRestaurants(latitud = null, longitud = null, radius = 5000) {
        

        if (!this.apiKey) {
            throw new Error('API Key de Google Maps no configurada');
        }

        try {
            const params = {
                query:`Restaurante`,
                key: this.apiKey,
                language: 'es'
            };

            if (latitud && longitud && validateCoordinates(latitud, longitud)) {
                params.location = `${latitud},${longitud}`;
                params.radius = Math.min(radius, 50000); // Limitar radio
            }

            console.log('Parámetros de enviados al API de google:', params);

            const response = await this.client.textSearch({ params });

            console.log('Respuesta de textSearch:', {
                status: response.data.status,
                results_count: response.data.results.length
            });

            if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
                throw new Error(`Google API respondió con estado: ${response.data.status}`);
            }

            console.log(`Búsqueda de texto completada. Procesando ${response.data.results.length} restaurantes.`);
            
            if (latitud && longitud) {
                const restaurants = processGooglePlacesData(response.data.results, latitud, longitud);
                return sortAndLimitRestaurants(restaurants, 10);
            } else {
                
                return response.data.results.slice(0, 10).map(place => {
                    return new Restaurant({
                        id: place.place_id,
                        nombre: place.name || 'Restaurante sin nombre',
                        latitud: place.geometry.location.lat,
                        longitud: place.geometry.location.lng,
                        tipo: place.types?.find(type => type !== 'restaurant' && type !== 'food' && type !== 'establishment') || 'No especificado',
                        rating: place.rating || null,
                        precio: place.price_level || null,
                        direccion: place.formatted_address || 'Dirección no disponible',
                        abierto: place.opening_hours?.open_now || null
                    });
                });
            }

        } catch (error) {
            console.error(`Error al buscar restaurantes por texto: ${error.message}`);
            throw new Error(`Error al buscar restaurantes por texto: ${error.message}`);
        }
    }
}

module.exports = new LocationService();