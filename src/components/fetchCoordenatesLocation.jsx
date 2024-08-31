export const fetchCoordinates = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.length > 0) {
        const location = data[0];
        return { lat: location.lat, lon: location.lon };
      } else {
        console.error('Erro ao buscar coordenadas.');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
    }
};

  
  
  