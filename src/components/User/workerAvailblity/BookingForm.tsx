import React, { useState } from "react";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import Map, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_ACCESS_TOKEN } from "../../../constants/constant_env";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
const geocodingClient = mbxGeocoding({ accessToken: MAPBOX_ACCESS_TOKEN });

const BookingForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    houseNumber: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [coordinates, setCoordinates] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 4,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLocationSelect = (selectedCoordinates: {
    lat: number;
    lng: number;
  }) => {
    setCoordinates(selectedCoordinates);
    setIsMapOpen(false);
  };

  const handleLocationChange = async () => {
    const fullAddress = `${formData.houseNumber} ${formData.street}, ${formData.city}, ${formData.state}, ${formData.pinCode}`;

    try {
      const response = await geocodingClient
        .forwardGeocode({
          query: fullAddress,
          limit: 1,
        })
        .send();

      const match = response.body.features[0];
      if (match) {
        setCoordinates({
          lat: match.geometry.coordinates[1],
          lng: match.geometry.coordinates[0],
        });
        setViewport({
          latitude: match.geometry.coordinates[1],
          longitude: match.geometry.coordinates[0],
          zoom: 14,
        });
        console.log("Coordinates:", match.geometry.coordinates);
      } else {
        console.error("No match found");
      }
    } catch (error) {
      console.error("Error during geocoding:", error);
    }
  };

  const openMap = () => {
    setIsMapOpen(true);
  };

  return (
    <div className="flex-1 p-4 border-l-2 border-blue-100 shadow-lg rounded-sm">
      <h2 className=" font-semibold mb-2 text-custom_navyBlue">
        Booking Details
      </h2>

      <form
        className="max-w-md mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          handleLocationChange();
        }}
      >
        {/* Form Fields */}
        <div className="mb-2">
          <input
            type="text"
            id="description"
            name="description"
            className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <input
            type="text"
            id="houseNumber"
            name="houseNumber"
            className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="House Number"
            value={formData.houseNumber}
            onChange={handleChange}
          />
        </div>

        <div className="flex mb-2 space-x-4">
          <input
            type="text"
            id="street"
            name="street"
            className="w-1/2 p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Street/Area"
            value={formData.street}
            onChange={handleChange}
          />
          <button
            type="button"
            className="w-1/2 px-5 items-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex gap-2"
            onClick={openMap}
          >
            {" "}
            <MyLocationIcon />
            Location
          </button>
        </div>

        {/* City and State Fields */}
        <div className="flex mb-2 ">
          <input
            type="text"
            id="city"
            name="city"
            className="w-1/2 p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            type="text"
            id="state"
            name="state"
            className="w-1/2 p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
          />
        </div>

        {/* Pin Code Field */}
        <div className="mb-6">
          <input
            type="text"
            id="pinCode"
            name="pinCode"
            className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Pin Code"
            value={formData.pinCode}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center gap-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          <CalendarMonthIcon />
          Book
        </button>
      </form>

      {/* Map Modal or Component */}
      {isMapOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
            <Map
              initialViewState={viewport}
              mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
              style={{ width: "100%", height: "400px" }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              onMove={(evt) => setViewport(evt.viewState)}
            >
              <NavigationControl />
              {coordinates.lat && coordinates.lng && (
                <Marker
                  latitude={coordinates.lat}
                  longitude={coordinates.lng}
                />
              )}
            </Map>
            <button
              onClick={() => setIsMapOpen(false)}
              className="mt-4 bg-red-500 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
