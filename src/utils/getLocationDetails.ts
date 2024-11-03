// import axios from "axios";
// import { GOOGLE_API, GOOGLE_BASE_URL } from "../constants/constant_env";

// export const fetchLocationDetails = async (
//   latitude: number,
//   longitude: number
// ) => {
//   const url = `${GOOGLE_BASE_URL}/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API}`;
//   const response = await axios.get(url);

//   if (response.data.status === "OK") {
//     const addressComponents =
//       response.data.results[0]?.address_components || [];
//     const localityComponent = addressComponents.find(
//       (component: { types: string | string[] }) =>
//         component.types.includes("locality")
//     );
//     // console.log("localityComponent:",localityComponent);

//     const locality = localityComponent?.short_name || "Unknown locality";
//     return locality;
//   } else {
//     throw new Error("Failed to fetch location details.");
//   }
// };

import axios from "axios";
import { MAPBOX_ACCESS_TOKEN } from "../constants/constant_env";

export const fetchLocationDetails = async (
  latitude: number,
  longitude: number
) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;

  try {
    const response = await axios.get(url);

    if (
      response.data &&
      response.data.features &&
      response.data.features.length > 0
    ) {
      // Find the locality (city) from the context or features
      const features = response.data.features;

      // Look for place type in the features
      const localityFeature = features.find(
        (feature: { place_type: string[] }) =>
          feature.place_type.includes("place")
      );

      console.log("--localityFeature--", localityFeature);

      // If we found a locality, return its name, otherwise return the first relevant place name
      if (localityFeature) {
        return localityFeature.text || "Unknown locality";
      } else {
        // Fallback to the first feature's place name if no specific locality is found
        return features[0].text || "Unknown locality";
      }
    } else {
      throw new Error("No location data found");
    }
  } catch (error) {
    throw new Error("Failed to fetch location details");
  }
};
