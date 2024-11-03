import axios from 'axios';
import { MAPBOX_ACCESS_TOKEN } from '../constants/constant_env';

export const initMapboxAutocomplete = (
  searchInput: React.RefObject<HTMLInputElement>,
  setLocationCoords: React.Dispatch<React.SetStateAction<{ lat: number; lng: number } | null>>,
  setLocation: React.Dispatch<React.SetStateAction<string>>
) => {
  let timeoutId: NodeJS.Timeout;

  // Bounding box coordinates for Kerala
  // Format: [minLng, minLat, maxLng, maxLat]
  const keralaBbox = '74.8520,8.2791,77.4174,12.7947';

  const handleInput = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const searchText = input.value;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (!searchText) return;

    timeoutId = setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchText)}.json`,
          {
            params: {
              access_token: MAPBOX_ACCESS_TOKEN,
              bbox: keralaBbox, // Restrict to Kerala
              types: 'place,locality,neighborhood,address',
              country: 'IN', // Restrict to India
              language: 'en',
              limit: 5 // Limit results for better performance
            }
          }
        );

        if (response.data.features && response.data.features.length > 0) {
          // Filter results to ensure they are from Kerala
          const keralaResults = response.data.features.filter((feature: any) => {
            const context = feature.context || [];
            return context.some((ctx: any) => 
              ctx.id.startsWith('region') && ctx.text === 'Kerala'
            );
          });

          showSuggestions(keralaResults, searchInput, setLocationCoords, setLocation);
        }
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
      }
    }, 300);
  };

  const showSuggestions = (
    features: any[],
    searchInput: React.RefObject<HTMLInputElement>,
    setLocationCoords: React.Dispatch<React.SetStateAction<{ lat: number; lng: number } | null>>,
    setLocation: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const existingSuggestions = document.getElementById('location-suggestions');
    if (existingSuggestions) {
      existingSuggestions.remove();
    }

    if (features.length === 0) return;

    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.id = 'location-suggestions';
    suggestionsDiv.className = 
      'absolute z-50 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto mt-1';

    features.forEach((feature) => {
      const suggestion = document.createElement('div');
      suggestion.className = 
        'px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700';
      
      // Extract district name from the context
      const district = feature.context?.find((ctx: any) => 
        ctx.id.startsWith('district')
      )?.text || '';

      // Format the display text: Place name, District, Kerala
      const displayText = district 
        ? `${feature.text}, ${district}, Kerala`
        : `${feature.text}, Kerala`;
        
      suggestion.textContent = displayText;

      suggestion.addEventListener('click', () => {
        if (searchInput.current) {
          searchInput.current.value = displayText;
          setLocation(displayText);
          setLocationCoords({
            lng: feature.center[0],
            lat: feature.center[1],
          });
        }
        suggestionsDiv.remove();
      });

      suggestionsDiv.appendChild(suggestion);
    });

    if (searchInput.current) {
      // Position the suggestions below the input
      const inputRect = searchInput.current.getBoundingClientRect();
      suggestionsDiv.style.width = `${inputRect.width}px`;
      searchInput.current.parentNode?.appendChild(suggestionsDiv);
    }
  };

  // Add event listeners
  if (searchInput.current) {
    searchInput.current.addEventListener('input', handleInput);

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
      const suggestions = document.getElementById('location-suggestions');
      if (suggestions && !suggestions.contains(e.target as Node) && 
          searchInput.current && !searchInput.current.contains(e.target as Node)) {
        suggestions.remove();
      }
    });
  }

  // Cleanup function
  return () => {
    if (searchInput.current) {
      searchInput.current.removeEventListener('input', handleInput);
    }
  };
};