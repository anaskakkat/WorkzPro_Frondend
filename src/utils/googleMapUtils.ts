import { GOOGLE_API, GOOGLE_BASE_URL } from "../constants/constant_env";

// googleMapsUtils.ts
export const initMapScript = async (): Promise<void> => {
  if (window.google) {
    return Promise.resolve(); // If already loaded
  }
  const src = `${GOOGLE_BASE_URL}/js?key=${GOOGLE_API}&libraries=places&v=weekly`;
  await loadAsyncScript(src);
  return undefined;
};

export const initAutocomplete = (
  searchInput: React.RefObject<HTMLInputElement>
): void => {
  if (!searchInput.current) return;
  const rectangleString = "rectangle:8.1805,74.8606|12.9250,77.1196";
  const [, coordinates] = rectangleString.split(":");
  const [southWest, northEast] = coordinates.split("|").map((coord) => {
    const [lat, lng] = coord.split(",").map(Number);
    return new window.google.maps.LatLng(lat, lng);
  });
  const options = {
    bounds: new window.google.maps.LatLngBounds(southWest, northEast),
    componentRestrictions: { country: "IND" },
    types: ["address"],
  };
  const autocomplete = new window.google.maps.places.Autocomplete(
    searchInput.current,
    options
  );
  autocomplete.setFields(["address_components", "geometry"]);

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    console.log('place:',place);
    
    if (place) {
      const addressComponent = place.address_components?.find(component =>
        component.types.includes("locality")
      );
      if (addressComponent) {
        searchInput.current!.value = addressComponent.long_name;
      } else {
        // Handle cases where "locality" is not found
        console.log("Locality not found in the address components.");
      }
    }
  });
};

// Function to load Google Maps API script asynchronously
function loadAsyncScript(src: string): Promise<HTMLScriptElement> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = src;
    script.onload = () => resolve(script);
    script.onerror = (error) => reject(error);
    document.head.appendChild(script);
  });
}
