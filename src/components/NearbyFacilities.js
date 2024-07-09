import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};
const center = {
  lat: 0, // Default to 0,0 - you should use the user's location
  lng: 0,
};

export function NearbyFacilities() {
  const [facilities, setFacilities] = useState([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (isLoaded) {
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      const request = {
        location: center,
        radius: '5000',
        type: ['hospital', 'doctor'],
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setFacilities(results);
        }
      });
    }
  }, [isLoaded]);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div>
      <h2>Nearby Health Facilities</h2>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        {facilities.map((facility) => (
          <Marker
            key={facility.place_id}
            position={facility.geometry.location}
            title={facility.name}
          />
        ))}
      </GoogleMap>
      <ul>
        {facilities.map((facility) => (
          <li key={facility.place_id}>
            {facility.name} - {facility.vicinity}
          </li>
        ))}
      </ul>
    </div>
  );
}