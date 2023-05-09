import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import mapStyles from '../styles/MapStyles';

const containerStyle = {
  width: '100%',
  height: '280px',
};

// Stockholm is set as default
const center: google.maps.LatLngLiteral = {
  lat: 59.328,
  lng: 18.07,
};

const MapComponent = () => {
  const [currentPosition, setCurrentPosition] = useState<
    google.maps.LatLngLiteral | undefined
  >(undefined);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      () => {
        setCurrentPosition(center);
      }
    );
  }, []);

  return (
    <LoadScript googleMapsApiKey='AIzaSyAeJky6_w5dAxCg_fg1qWLN1bmWzpdgYGE'>
      <>
        <GoogleMap
          mapContainerStyle={containerStyle}
          options={{
            styles: mapStyles,
            disableDefaultUI: true,
          }}
          center={
            (currentPosition as google.maps.LatLngLiteral)
              ? (currentPosition as google.maps.LatLngLiteral)
              : center
          }
          zoom={13}>
          {/* Child components, such as markers, info windows, etc. */}
          {currentPosition && <Marker position={currentPosition} />}
        </GoogleMap>
      </>
    </LoadScript>
  );
};

export default MapComponent;
