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
  
    types: ["geocode"], 
  };

  const autocomplete = new window.google.maps.places.Autocomplete(
    searchInput.current,
    options
  );
  
  autocomplete.setFields(["address_components", "geometry"]);
  
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    // console.log('Full place object:', place); 

    if (place) {
      // Try to find the locality from several possible types
      const addressComponent = place.address_components?.find(component =>
        component.types.includes("locality") ||
        component.types.includes("sublocality") ||
        component.types.includes("administrative_area_level_2")
      );

      // console.log('addressComponent:', addressComponent); 

      if (addressComponent) {
        searchInput.current!.value = addressComponent.long_name;
      } else {
        console.log("Locality not found in the address components.");
      }
    }
  });
};
