// import React from 'react'

import Card from "../worker/dashboard/Card";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { Chart } from "../worker/dashboard/Chart";

const DashboardAdmin = () => {
  return (
    <div className="">
      {" "}
      <p className="text-xl p-1 font-semibold">Welcome name</p>
      <div className=" flex flex-row px-3 justify-evenly ">
        <Card
          icon={PendingActionsIcon}
          title="Bookings"
          value={84}
          backgroundColor="linear-gradient(195deg, #49a3f1, #1A73E8)"
          boxShadow="0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(0, 187, 212, 0.4)"
        />
        <Card
          icon={PendingActionsIcon}
          title="Bookings"
          value={84}
          backgroundColor="linear-gradient(195deg, #42424a, #191919)"
          boxShadow=" 0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(64, 64, 64, 0.4)"
        />
        <Card
          icon={PendingActionsIcon}
          title="Bookings"
          value={84}
          backgroundColor="linear-gradient(195deg, #66BB6A, #43A047)"
          boxShadow="0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(76, 175, 79, 0.4)"
        />
        <Card
          icon={PendingActionsIcon}
          title="Bookings"
          value={84}
          backgroundColor="linear-gradient(195deg, #EC407A, #D81B60)"
          boxShadow="0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(233, 30, 98, 0.4)"
        />
      </div>
      <div>
        <p className="p-5 text-xl font-semibold">Details</p>
        <Chart />
      </div>
    </div>
  );
};

export default DashboardAdmin;
