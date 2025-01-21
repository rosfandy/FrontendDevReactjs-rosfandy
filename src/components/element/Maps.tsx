import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
    latitude: number;
    longitude: number;
    address: string;
}

const Maps: React.FC<MapComponentProps> = ({ latitude, longitude, address }) => {
    useEffect(() => {
        const map = L.map('map').setView([latitude, longitude], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const marker = L.marker([latitude, longitude]).addTo(map);
        marker.bindPopup(address).openPopup();

        return () => {
            map.remove();
        };
    }, [latitude, longitude, address]);

    return <div className='rounded-xl' id="map" style={{ height: '100vh', width: '100%' }} />;
};

export default Maps;