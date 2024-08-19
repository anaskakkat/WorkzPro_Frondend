import axios from "axios";
import { GOOGLE_API, GOOGLE_BASE_URL } from "../constants/constant_env";

export const fetchLocationDetails = async (
  latitude: number,
  longitude: number
) => {
  const url = `${GOOGLE_BASE_URL}/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API}`;
  const response = await axios.get(url);

  if (response.data.status === "OK") {
    const addressComponents =
      response.data.results[0]?.address_components || [];
    const localityComponent = addressComponents.find(
      (component: { types: string | string[] }) =>
        component.types.includes("locality")
    );
    // console.log("localityComponent:",localityComponent);
    
    const locality = localityComponent?.short_name || "Unknown locality";
    return locality;
  } else {
    throw new Error("Failed to fetch location details.");
  }
};
