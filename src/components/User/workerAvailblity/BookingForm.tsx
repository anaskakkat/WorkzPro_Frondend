import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import "mapbox-gl/dist/mapbox-gl.css";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box } from "@mui/material";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import { MAPBOX_ACCESS_TOKEN } from "../../../constants/constant_env";
import { getSystemPosition } from "../../../utils/getCurrentLoaction";
import validateForm from "../../../utils/bookingValidation";
import toast from "react-hot-toast";

import {
  useSelectedService,
  useSelectedSlot,
  useTimeSlots,
  useUserId,
} from "../../../redux/hooks/userSelectors";
import { useNavigate, useParams } from "react-router-dom";
import { bookingData } from "../../../api/user";

const BookingForm = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [markerLongitude, setMarkerLongitude] = useState<number | null>(null);
  const [markerLatitude, setMarkerLatitude] = useState<number | null>(null);
  const timeSlots = useTimeSlots();
  const selectedSlot = useSelectedSlot();
  const selectedService = useSelectedService();
  const userId = useUserId();
  const { workerId } = useParams();
  const [, setIsBookingSuccessful] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    getSystemPosition()
      .then((position: { coords: { latitude: any; longitude: any } }) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      })
      .catch((error: any) => {
        console.error("Error fetching current location:", error);
      });
  }, []);

  const handleMarkerDragEnd = (event: any) => {
    const { lngLat } = event;
    setMarkerLongitude(lngLat.lng);
    setMarkerLatitude(lngLat.lat);
  };

  const [formData, setFormData] = useState({
    description: "",
    houseNumber: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectLocation = async () => {
    if (markerLatitude && markerLongitude) {
      const geocodingClient = mbxGeocoding({
        accessToken: MAPBOX_ACCESS_TOKEN,
      });

      try {
        const response = await geocodingClient
          .reverseGeocode({
            query: [markerLongitude, markerLatitude],
            limit: 1,
          })
          .send();

        const address = response.body.features[0];
        // console.log("Address:", address);

        if (address) {
          const { place_name, context } = address;
          const city =
            context.find((c: any) => c.id.includes("place"))?.text || "";
          const state =
            context.find((c: any) => c.id.includes("region"))?.text || "";
          const pinCode =
            context.find((c: any) => c.id.includes("postcode"))?.text || "";

          const placeNameParts = place_name.split(",");
          // console.log("streeet ---", placeNameParts);
          const street =
            placeNameParts.length > 1 ? placeNameParts[0].trim() : "";
          setFormData((prevData) => ({
            ...prevData,
            street,
            city,
            state,
            pinCode,
          }));
        }
      } catch (error) {
        console.error("Error fetching address from coordinates:", error);
      }
    }
    setIsMapOpen(false);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!timeSlots) {
      toast.error("Select a Slot");
      return;
    }
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => {
        toast.error(error);
      });
      return;
    }
    const data = {
      address: {
        city: formData.city,
        houseNumber: formData.houseNumber,
        pincode: formData.pinCode,
        state: formData.state,
        street: formData.street,
        location: {
          type: "Point",
          coordinates: [
            markerLongitude ?? longitude,
            markerLatitude ?? latitude,
          ],
        },
      },
      description: formData.description,
      service: selectedService,
      bookingDate: selectedSlot,
      slots: timeSlots,
      workerId,
    };
    // console.log("data---", data, "------", userId);
    try {
      const response = await bookingData(userId, data);
      if (response.status === 200) {
        // console.log("resp-----", response);
        toast.success(response.data.message);
        setIsBookingSuccessful(true);

        navigate(`/success/${response.data.bookingId}`, {
          state: { bookingSuccess: true },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (longitude === null || latitude === null) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="flex-1 p-4 border lg:border-l-2 min-w-96 border-blue-100 rounded-sm">
    <h2 className="font-semibold mb-2 text-custom_navyBlue">
      Booking Details
    </h2>
  
    <form className="mx-auto" onSubmit={handleSubmit}>
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
  
      <div className="flex mb-2 space-x-2 flex-wrap">
        <input
          type="text"
          id="street"
          name="street"
          className="flex-1 min-w-0 p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Street/Area"
          value={formData.street}
          onChange={handleChange}
        />
        <button
          type="button"
          className="w-full sm:w-auto px-5 items-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 mt-2 sm:mt-0"
          onClick={() => setIsMapOpen(true)}
        >
          <MyLocationIcon />
          Location
        </button>
      </div>
  
      {/* City and State Fields */}
      <div className="flex mb-2 flex-wrap">
        <input
          type="text"
          id="city"
          name="city"
          className="flex-1 min-w-0 p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 mr-2"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
        <input
          type="text"
          id="state"
          name="state"
          className="flex-1 min-w-0 p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
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
      <div className="fixed inset-0 mt-8 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
          <Box sx={{ height: 400, position: "relative" }}>
            <ReactMapGL
              mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
              initialViewState={{
                longitude: longitude,
                latitude: latitude,
                zoom: 14,
              }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
            >
              <Marker
                latitude={markerLatitude ?? latitude}
                longitude={markerLongitude ?? longitude}
                draggable
                onDragEnd={handleMarkerDragEnd}
              />
              <NavigationControl position="bottom-right" />
              <GeolocateControl position="bottom-right" trackUserLocation />
            </ReactMapGL>
          </Box>
          <div className="flex flex-row gap-4 justify-between">
            <button
              onClick={() => setIsMapOpen(false)}
              className="mt-4 border text-red-500 border-red-500 hover:text-white hover:bg-red-600 p-2 rounded"
            >
              Close
            </button>
            <button
              onClick={handleSelectLocation}
              className="mt-4 border text-blue-500 border-blue-500 hover:bg-blue-400 hover:text-white p-2 rounded"
            >
              Select
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  
  );
};

export default BookingForm;
