import React, { useEffect, useState } from "react";
import Map, { Marker, Source, Layer, NavigationControl } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLocation, useNavigate } from "react-router-dom";
import mbxDirections, {
  RouteGeometry,
} from "@mapbox/mapbox-sdk/services/directions";
import { DirectionsResponse } from "@mapbox/mapbox-sdk/services/directions";
import { IoIosArrowBack } from "react-icons/io";
import { FaCar } from "react-icons/fa";
import { FaPersonWalking } from "react-icons/fa6";
import { BiCycling } from "react-icons/bi";
import { GrDirections } from "react-icons/gr";
import { MAPBOX_ACCESS_TOKEN } from "../constants/constant_env";
import { getSystemPosition } from "../utils/getCurrentLoaction";

const directionsClient = mbxDirections({ accessToken: MAPBOX_ACCESS_TOKEN });
const locationState: LocationState = {
  start: { lng: 75.890503, lat: 11.156362 }, // Example start location
  end: { lng: 75.944684, lat: 11.140985 }, // Example end location
};

interface LocationState {
  start: { lng: number; lat: number };
  end: { lng: number; lat: number };
}

interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

interface ProfileTimes {
  driving: number;
  walking: number;
  cycling: number;
}

const Demo = () => {
  // const location = useLocation();
  const navigate = useNavigate();
  const { start, end } = locationState as LocationState;
  const [viewState, setViewState] = useState<ViewState>({
    longitude: (start.lng + end.lng) / 2,
    latitude: (start.lat + end.lat) / 2,
    zoom: 12,
    pitch: 0,
    bearing: 0,
  });
  const [route, setRoute] = useState<DirectionsResponse<RouteGeometry> | null>(
    null
  );
  const [profile, setProfile] = useState<"driving" | "walking" | "cycling">(
    "driving"
  );
  const [directions, setDirections] = useState<string[]>([]);
  const [isDirectionsPanelOpen, setIsDirectionsPanelOpen] = useState(true);
  const [profileTimes, setProfileTimes] = useState<ProfileTimes>({
    driving: 0,
    walking: 0,
    cycling: 0,
  });
  useEffect(() => {
    handleGetCurrentLocation();
  }, []);
  const handleGetCurrentLocation = async () => {
    try {
      const position = await getSystemPosition();
      // console.log("coooordinates---", position);

      const { latitude, longitude } = position.coords;
      const locationData = {
        type: "Point",
        coordinates: [longitude, latitude],
      };

      console.log("----location:-----", longitude, latitude);
    } catch (error: any) {
      console.error("Error location:", error);
    }
  };
  useEffect(() => {
    const getRoutes = async () => {
      const profiles: ("driving" | "walking" | "cycling")[] = [
        "driving",
        "walking",
        "cycling",
      ];
      const times: ProfileTimes = { driving: 0, walking: 0, cycling: 0 };

      for (const p of profiles) {
        const response = await directionsClient
          .getDirections({
            profile: p,
            geometries: "geojson",
            steps: true,
            waypoints: [
              { coordinates: [start.lng, start.lat] },
              { coordinates: [end.lng, end.lat] },
            ],
          })
          .send();

        times[p] = Math.round(response.body.routes[0].duration / 60); // Convert seconds to minutes

        if (p === profile) {
          setRoute(response.body);
          setDirections(
            response.body.routes[0].legs[0].steps.map(
              (step) => step.maneuver.instruction
            )
          );
        }
      }

      setProfileTimes(times);
    };

    getRoutes();
  }, [start, end, profile]);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="h-screen bg-red-200 ">
      <div className="relative w-full h-5/6">
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        >
          <Marker longitude={start.lng} latitude={start.lat} color="red" />
          <Marker longitude={end.lng} latitude={end.lat} color="green" />
          {route && route.routes[0] && (
            <Source type="geojson" data={route.routes[0].geometry}>
              <Layer
                id="route"
                type="line"
                paint={{
                  "line-color": "#3887be",
                  "line-width": 5,
                  "line-opacity": 0.75,
                }}
              />
            </Source>
          )}
          <NavigationControl showCompass showZoom position="top-right" />
        </Map>
        <div className="absolute top-4 left-4">
          <button
            onClick={() => navigate(-1)}
            className=" p-2 flex justify-center rounded-full text-indigo-950 bg-white"
          >
            <IoIosArrowBack size={20} />
          </button>
          <div className="flex flex-col gap-2 mt-2">
            <button
              onClick={() => setProfile("driving")}
              className={`px-4 py-2 flex  rounded ${
                profile === "driving" ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              <FaCar size={20} className="me-2" />{" "}
              {formatTime(profileTimes.driving)}
            </button>

            <button
              onClick={() => setProfile("cycling")}
              className={`px-4 py-2 rounded flex ${
                profile === "cycling" ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              <BiCycling size={20} className="me-2" />{" "}
              {formatTime(profileTimes.cycling)}
            </button>
            <button
              onClick={() => setProfile("walking")}
              className={`px-4 py-2 rounded flex ${
                profile === "walking" ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              <FaPersonWalking size={20} className="me-2" />{" "}
              {formatTime(profileTimes.walking)}
            </button>
          </div>
        </div>

        <div
          className={`absolute left-4 bottom-4 bg-white rounded transition-all duration-300 ease-in-out ${
            isDirectionsPanelOpen ? "w-64 h-64" : "w-12 h-12"
          }`}
        >
          <button
            onClick={() => setIsDirectionsPanelOpen(!isDirectionsPanelOpen)}
            className="absolute top-2 right-2 w-8 h-8 bg-indigo-950/50 text-white rounded-full flex items-center justify-center"
          >
            {isDirectionsPanelOpen ? "−" : <GrDirections size={20} />}
          </button>
          {isDirectionsPanelOpen && (
            <div className="p-4 h-full overflow-y-auto">
              <h3 className="font-bold mb-2">Directions:</h3>
              <p className="mb-2">
                Estimated time: {formatTime(profileTimes[profile])}
              </p>
              <ol className="list-decimal pl-4">
                {directions.map((direction, index) => (
                  <li key={index} className="mb-2">
                    {direction}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Demo;
