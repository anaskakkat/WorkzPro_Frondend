import React from 'react';
import { SearchBox } from '@mapbox/search-js-react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const MyComponent = () => {
  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <SearchBox
        accessToken='pk.eyJ1IjoiYW5hc2tha2thdCIsImEiOiJjbHpiMWFlbWQwYmx2MmpvZmowcXR6ZmpnIn0.t6srvrN_0HcwvCsAsniAGQ'
        options={{
          language: 'en',
          country: 'US'
        }}
        customInput={({ getInputProps }) => (
          <TextField
            {...getInputProps()}
            variant="outlined"
            fullWidth
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: { borderRadius: '8px' } // Example styling, adjust as needed
            }}
          />
        )}
      />
    </Box>
  );
};

export default MyComponent;
