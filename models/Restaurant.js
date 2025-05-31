class Restaurant {
    constructor(data = {}) {
        this.id = data.id || null;
        this.nombre = data.nombre || '';
        this.latitud = data.latitud || null;
        this.longitud = data.longitud || null;
        this.distancia = data.distancia || null;
        this.tipo = data.tipo || 'No especificado';
        this.rating = data.rating || null;
        this.precio = data.precio || null;
        this.direccion = data.direccion || 'Dirección no disponible';
        this.abierto = data.abierto || null;
    }
}

module.exports = Restaurant;
