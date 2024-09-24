import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Reviews from "./Reviews";
import Bookings from "../bookings/Bookings";

interface CustomTabPanelProps {
  workerId: string;
}

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
    <div className="container border-2 border-blue-100 rounded-lg w-auto p-4 lg:p-8 sm:p-6 ">
      <div className="flex justify-center mb-4">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
          className="w-full"
        >
          <Tab
            value="one"
            label="Reviews"
            className="flex text-center text-xs sm:text-sm md:text-base"
          />
          <Tab
            value="two"
            label="Booking"
            className="flex text-center text-xs sm:text-sm md:text-base"
          />
        </Tabs>
      </div>

      {/* Conditionally render content based on the selected tab */}
      <div className="mt-4">
        {value === "one" && <DetailsTabContent workerId={workerId} />}
        {value === "two" && <BookingTabContent />}
      </div>
    </div>
  );
}
