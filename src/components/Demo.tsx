import React, { useState, useEffect, useRef } from 'react';

interface PlaceAutocompleteProps {
  apiKey: string;
  onPlaceSelected: (place: google.maps.places.AutocompletePrediction) => void;
}

const Demo: React.FC<PlaceAutocompleteProps> = ({ GOOGLE_API, onPlaceSelected }) => {
  const [inputValue, setInputValue] = useState('');
  const autoCompleteRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API}&libraries=places`;
    script.async = true;
    script.onload = () => {
      autoCompleteRef.current = new google.maps.places.AutocompleteService();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [apiKey]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.length > 0 && autoCompleteRef.current) {
      autoCompleteRef.current.getPlacePredictions(
        { input: value },
        (predictions: google.maps.places.AutocompletePrediction[] | null) => {
          setSuggestions(predictions || []);
        }
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: google.maps.places.AutocompletePrediction) => {
    setInputValue(suggestion.description);
    setSuggestions([]);
    onPlaceSelected(suggestion);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a location"
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion) => (
            <li key={suggestion.place_id} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Demo;