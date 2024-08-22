// import { useState } from "react";
// import { FormControl } from "@mui/material";
// import MapDialog from "./worker/map/MapDialog";
// import CustomTextField from "./styleComponents/StyledTextField";

// export default function Demo() {
//   const [location, setLocation] = useState<string>("");
//   const [mapOpen, setMapOpen] = useState<boolean>(false);

//   const handleOpenMap = () => setMapOpen(true);
//   const handleCloseMap = () => setMapOpen(false);

//   const handleSelectLocation = (latitude: number, longitude: number) => {
//     setLocation(`${latitude}, ${longitude}`);
//     handleCloseMap();
//   };

//   return (
//     <>
//       <FormControl fullWidth sx={{ marginBottom: 1 }}>
//         <CustomTextField
//           label="Location"
//           value={location}
//           onClick={handleOpenMap}
//           required
//         />
//       </FormControl>
//       <MapDialog
//         open={mapOpen}
//         onClose={handleCloseMap}
//         onSelectLocation={handleSelectLocation}
//       />
//     </>
//   );
// }


import React from 'react'

const Demo = () => {
  return (
    <div>
      
    </div>
  )
}

export default Demo
