import { useEffect, useState } from "react";
import Map, {
  Marker,
  Source,
  Layer,
  NavigationControl,
  GeolocateControl,
} from "react-map-gl";
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
import { MAPBOX_ACCESS_TOKEN } from "../../../constants/constant_env";
import { getCurrentPosition } from "../../../utils/getCurrentLoaction";

const directionsClient = mbxDirections({ accessToken: MAPBOX_ACCESS_TOKEN });


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

const MapDirection = () => {
  const userLocation = useLocation();
// console.log("userLocation-------", userLocation);
  const navigate = useNavigate();
  const [viewState, setViewState] = useState<ViewState>({
    longitude: 0,
    latitude: 0,
    zoom: 12,
    pitch: 0,
    bearing: 0,
  });
  const [locationState, setLocationState] = useState<LocationState | null>(
    null
  );
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user's current location
    getCurrentPosition()
      .then((position: { coords: { latitude: any; longitude: any } }) => {
        const { latitude, longitude } = position.coords;
        const start = { lng: longitude, lat: latitude };
        const end = { lng: userLocation.state[0], lat: userLocation.state[1] };

        setLocationState({ start, end });
        setViewState({
          longitude: (start.lng + end.lng) / 2,
          latitude: (start.lat + end.lat) / 2,
          zoom: 12,
          pitch: 0,
          bearing: 0,
        });
      })
      .catch((error: any) => {
        setError("Unable to retrieve your location.");
        console.error("Geolocation error:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!locationState) return; // Wait until locationState is set

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
              {
                coordinates: [locationState.start.lng, locationState.start.lat],
              },
              { coordinates: [locationState.end.lng, locationState.end.lat] },
            ],
          })
          .send();

        times[p] = Math.round(response.body.routes[0].duration / 60);

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
  }, [locationState, profile]);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (loading) {
    return <div>Loading map...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="h-full">
      <div className="relative w-full h-full">
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        >
          {locationState && (
            <>
              <Marker
                longitude={locationState.start.lng}
                latitude={locationState.start.lat}
                color="blue"
              />
              <NavigationControl showCompass showZoom position="bottom-right" />
              <GeolocateControl position="bottom-right" trackUserLocation />

              <Marker
                longitude={locationState.end.lng}
                latitude={locationState.end.lat}
                color="green"
              />
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
            </>
          )}
        </Map>
        <div className="absolute top-4 left-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 flex justify-center rounded-full text-indigo-950 bg-white"
          >
            <IoIosArrowBack size={20} />
          </button>
          <div className="flex flex-col gap-2 mt-2">
            <button
              onClick={() => setProfile("driving")}
              className={`px-4 py-2 flex rounded ${
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

export default MapDirection;
