import React, { useEffect, useRef } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { MAPBOX_ACCESS_TOKEN } from "../../../constants/constant_env";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (lng: number, lat: number) => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, onLocationSelect }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | undefined>(undefined);

  useEffect(() => {
    if (isOpen && mapContainerRef.current) {
      mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
      
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9, // starting zoom
        style: 'mapbox://styles/mapbox/streets-v11' // map style
      });

      mapRef.current.on('click', (event) => {
        const { lngLat } = event;
        onLocationSelect(lngLat.lng, lngLat.lat);
        onClose();
      });
    }
  }, [isOpen, onClose, onLocationSelect]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Select Location</h2>
        <div
          style={{ height: '300px' }}
          ref={mapContainerRef}
          className="map-container"
        />
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LocationModal;
