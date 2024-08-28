import { Box } from "@mui/material";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_ACCESS_TOKEN } from "../constants/constant_env";
import { useEffect, useState } from "react";
import { getCurrentPosition } from "../utils/getCurrentLoaction";

const Demo = () => {
  const [longitude, setLongitude] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);

  useEffect(() => {
    getCurrentPosition()
      .then((position: { coords: { latitude: any; longitude: any } }) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      })
      .catch((error: any) => {
        console.error("Error fetching current location:", error);
      });
  }, []);

  if (longitude === null || latitude === null) {
    return <div>Loading map...</div>;
  }

  return (
    <Box
      sx={{
        height: 400,
        position: "relative",
      }}
    >
      <ReactMapGL
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: 14,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker latitude={latitude} longitude={longitude} draggable />
        <NavigationControl position="bottom-right" />
        <GeolocateControl position="top-left" trackUserLocation />
      </ReactMapGL>
    </Box>
  );
};

export default Demo;
