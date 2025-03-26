import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ height = '300px' }) => {
    useEffect(() => {
        const mapContainerId = 'map';
        let map;

        // Check if the map container is already initialized
        if (!L.DomUtil.get(mapContainerId)?._leaflet_id) {
            map = L.map(mapContainerId).setView([51.505, -0.09], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            L.marker([51.505, -0.09])
                .addTo(map)
                .bindPopup('A pretty popup.<br> Easily customizable.')
                .openPopup();
        }

        // Cleanup the map on unmount
        return () => {
            if (map) {
                map.remove();
            }
        };
    }, []);

    return <div id="map" style={{ height }} className="w-full" />;
};

export default MapComponent;
