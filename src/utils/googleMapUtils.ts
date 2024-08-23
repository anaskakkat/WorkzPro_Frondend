export const initAutocomplete = (
  searchInput: React.RefObject<HTMLInputElement>,
  setLocationCoords: (coords: { lat: number; lng: number }) => void,
  setLocation: (location: string) => void // Added this line
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
    types: ["geocode"],
  };

  const autocomplete = new window.google.maps.places.Autocomplete(
    searchInput.current,
    options
  ); 

  autocomplete.setFields(["address_components", "geometry", "formatted_address"]);
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();

    if (place && place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setLocationCoords({ lat, lng });

      if (place.formatted_address) {
        // console.log('place.formatted_address---',place.formatted_address);
        const addressParts = place.formatted_address.split(',');
        const cityName = addressParts[0].trim();
        // console.log('City name:', cityName);
        setLocation(cityName); 
        searchInput.current!.value = place.formatted_address; 
      }
    }
  });
};
