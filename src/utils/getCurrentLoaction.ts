export const getSystemPosition = async (): Promise<GeolocationPosition> => {
  // console.log("Starting to fetch the current position...");

  if (!navigator.geolocation) {
    // console.error("Geolocation is not supported by your browser");
    throw new Error("Geolocation is not supported by your browser");
  }

  return new Promise((resolve, reject) => {
    // console.log("Geolocation is supported. Attempting to fetch position...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log("Successfully fetched position:", position);
        resolve(position);
      },
      (error) => {
        console.error("Geolocation error occurred:", error);
        reject(error);
      },
      {
        enableHighAccuracy: true, // Use high accuracy for precise location
        timeout: 20000, // Set timeout to 20 seconds
        maximumAge: 0, // Prevent cached locations
      }
    );
  });
};
