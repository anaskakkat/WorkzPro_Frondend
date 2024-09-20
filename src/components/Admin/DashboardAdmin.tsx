import { useState, useEffect } from "react";
import Card from "../worker/dashboard/Card";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EngineeringIcon from "@mui/icons-material/Engineering";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { Chart } from "../worker/dashboard/Chart";
import { fetchDashbordData } from "@/api/admin";

const DashboardAdmin = () => {
  // State to store the dashboard data
  const [dashboardData, setDashboardData] = useState({
    blockedWorkers: 0,
    blockedUsers: 0,
    totalServices: 0,
    pendingRequests: 0,
    userMonthlyData: [],
    workerMonthlyData: [],
  });

  // Fetch dashboard data on component mount
  useEffect(() => {
    handleDashboard();
  }, []);

  const handleDashboard = async () => {
    try {
      const response = await fetchDashbordData();
      console.log("resp-----", response);

      // Update the state with the response data
      setDashboardData({
        blockedWorkers: response.blockedWorkers || 0,
        blockedUsers: response.blockedUsers || 0,
        totalServices: response.totalServices || 0,
        pendingRequests: response.pendingRequests || 0,
        userMonthlyData: response.userMonthlyData || [],
        workerMonthlyData: response.workerMonthlyData || [],
      });
    } catch (error) {
      console.error("dashboard fetching error:", error);
    }
  };

  const {
    blockedWorkers,
    blockedUsers,
    totalServices,
    userMonthlyData,
    workerMonthlyData,
    pendingRequests,
  } = dashboardData;

  return (
    <div className="">
      <p className="text-xl p-1 font-semibold">Welcome Anas</p>
      <div className="flex flex-col md:flex-row justify-evenly gap-3">
        <Card
          icon={EngineeringIcon}
          title="Blocked Workers"
          value={blockedWorkers}
          backgroundColor="linear-gradient(195deg, #49a3f1, #1A73E8)"
          boxShadow="0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(0, 187, 212, 0.4)"
        />
        <Card
          icon={PeopleAltIcon}
          title="Blocked Users"
          value={blockedUsers}
          backgroundColor="linear-gradient(195deg, #42424a, #191919)"
          boxShadow=" 0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(64, 64, 64, 0.4)"
        />
        <Card
          icon={MiscellaneousServicesIcon}
          title="Total Service"
          value={totalServices}
          backgroundColor="linear-gradient(195deg, #66BB6A, #43A047)"
          boxShadow="0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(76, 175, 79, 0.4)"
        />
        <Card
          icon={PendingActionsIcon}
          title="Requests Pending"
          value={pendingRequests}
          backgroundColor="linear-gradient(195deg, #EC407A, #D81B60)"
          boxShadow="0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(233, 30, 98, 0.4)"
        />
      </div>
      <div className="">
        <p className="p-5 text-xl font-semibold">Details</p>
        <Chart
          userMonthlyData={userMonthlyData}
          workerMonthlyData={workerMonthlyData}
        />
      </div>
    </div>
  );
};

export default DashboardAdmin;
