import { MapContainer, TileLayer, Marker, Polyline, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useRouteAnimal } from '../components/getPublications';
import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import L from 'leaflet';

function FitBounds({ points }) {
    const map = useMap();

    useEffect(() => {
        if (points.length > 0) {
            const bounds = L.latLngBounds(points.map(point => [point.latitude, point.longitude]));
            map.fitBounds(bounds);
        }
    }, [map, points]);

    return null;
}

export default function Publication() {
    const { pubID } = useParams();
    const location = useLocation();
    const { someData } = location.state || {};
    const [selectedMarker, setSelectedMarker] = useState(null);
    const { data, loading } = useRouteAnimal(someData[pubID]?.id || null);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (!data || data.length === 0) {
        return <p>No data available</p>; // Ou outra mensagem adequada
    }

    // Supondo que data seja um array de objetos com { latitude, longitude }
    const points = data.map(point => [point.latitude, point.longitude]);

    return (
        <MapContainer center={points[0]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FitBounds points={data} />
            {data.map((point, index) => (
                <Marker key={index} position={[point.latitude, point.longitude]}>
                    <Popup>Ponto {index + 1}</Popup>
                </Marker>
            ))}
            {data.length > 1 && (
                <Polyline positions={points} color="red" />
            )}
        </MapContainer>
    );
}
