import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Reviews from "./Reviews";
import Bookings from "../bookings/Bookings";

interface CustomTabPanelProps {
  workerId: string;
}
// Define components or content for each tab
function DetailsTabContent({ workerId }: { workerId: string }) {
  return <Reviews workerId={workerId} />;
}

function BookingTabContent() {
  return <Bookings />;
}

export default function CustomTabPanel({ workerId }: CustomTabPanelProps) {
  const [value, setValue] = React.useState("one");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="border-2 border-blue-100 rounded-lg w-full p-4 ">
      <div className="flex justify-center mb-4">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
          className="w-full"
        >
          <Tab value="one" label="Details" className="flex text-center" />
          <Tab value="two" label="Booking" className="flex text-center" />
          {/* Add more tabs if needed */}
        </Tabs>
      </div>

      {/* Conditionally render content based on the selected tab */}
      <div className="">
        {value === "one" && <DetailsTabContent workerId={workerId} />}
        {value === "two" && <BookingTabContent />}
      </div>
    </div>
  );
}
