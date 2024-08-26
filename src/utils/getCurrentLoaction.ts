
export const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(error),
          {
            enableHighAccuracy: true, // Request more accurate location data
            timeout: 5000, // Timeout after 5 seconds
            maximumAge: 0, // Do not use cached location
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  }; 
  