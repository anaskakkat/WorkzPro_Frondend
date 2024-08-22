// import React, { useState } from 'react';
// import ReactMapGL, { Marker, ViewportProps } from 'react-map-gl';
// import { Dialog, DialogContent, Button } from '@mui/material';
// import mapboxgl from 'mapbox-gl';

// // Ensure you import Mapbox GL's CSS
// import 'mapbox-gl/dist/mapbox-gl.css';
// import { MAPBOX_ACCESS_TOKEN } from '../../../constants/constant_env';

// // Define your Mapbox token

// // Define the interface for component props
// interface MapDialogProps {
//   open: boolean;
//   onClose: () => void;
//   onSelectLocation: (latitude: number, longitude: number) => void;

// }

// const MapDialog: React.FC<MapDialogProps> = ({ open, onClose, onSelectLocation }) => {
//   const [viewport, setViewport] = useState<ViewportProps>({
//     width: '100%',
//     height: 400,
//     latitude: 37.8,
//     longitude: -122.4,
//     zoom: 10
//   });

//   const [selectedLocation, setSelectedLocation] = useState<{ longitude: number; latitude: number } | null>(null);

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogContent>
//         <ReactMapGL
//           {...viewport}
//           mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
//           onViewportChange={(nextViewport: ViewportProps) => setViewport(nextViewport)}
//           onClick={(event) => {
//             const lngLat = event.lngLat as mapboxgl.LngLat;
//             setSelectedLocation({ longitude: lngLat.lng, latitude: lngLat.lat });
//           }}
//         >
//           {selectedLocation && (
//             <Marker longitude={selectedLocation.longitude} latitude={selectedLocation.latitude}>
//               <div style={{ backgroundColor: 'red', width: '10px', height: '10px', borderRadius: '50%' }} />
//             </Marker>
//           )}
//         </ReactMapGL>
//         <Button
//           onClick={() => {
//             if (selectedLocation) {
//                 onSelectLocation(selectedLocation.latitude, selectedLocation.longitude);



//             }
//           }}
//         >
//           Select Location
//         </Button>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default MapDialog;
