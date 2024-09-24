import { useState, useEffect } from "react";
import Card from "../worker/dashboard/Card";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EngineeringIcon from "@mui/icons-material/Engineering";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { fetchDashbordData } from "@/api/admin";

import ChartDashboard from "./Charts/ChartDashboard";
import YearlyChart from "./Charts/YearlyChart";
import MonthlyEarnings from "./Charts/MonthlyEarnings";

interface MonthlyData {
  _id: string;
  totalUsers: number;
  totalWorkers: number;
}
interface YearlyEarning {
  _id: string;
  totalEarnings: number;
}
interface MonthlyEarning {
  _id: string;
  totalAdminProfit: number;
}
const chartConfig = {
  users: {
    label: "Users",
    color: "#49a3f1",
  },
  workers: {
    label: "Workers",
    color: "",
  },
} as const;

const DashboardAdmin = () => {
  const [dashboardData, setDashboardData] = useState({
    blockedWorkers: 0,
    blockedUsers: 0,
    totalServices: 0,
    pendingRequests: 0,
    userMonthlyData: [] as MonthlyData[],
    workerMonthlyData: [] as MonthlyData[],
  });
  const [yearlyEarnings, setYearlyEarnings] = useState<YearlyEarning[]>([]);
  const [monthlyEarnings, setMonthlyEarnings] = useState<MonthlyEarning[]>([]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Prepare data for the chart
  const chartData = months.map((month, index) => {
    const userData = dashboardData.userMonthlyData.find(
      (data) => parseInt(data._id) === index + 1
    );
    const workerData = dashboardData.workerMonthlyData.find(
      (data) => parseInt(data._id) === index + 1
    );

    return {
      month,
      users: userData ? userData.totalUsers : 0,
      workers: workerData ? workerData.totalWorkers : 0,
    };
  });

  useEffect(() => {
    handleDashboard();
  }, []);

  const handleDashboard = async () => {
    try {
      const response = await fetchDashbordData();
      console.log("resp-----", response);

      setDashboardData({
        blockedWorkers: response.blockedWorkers || 0,
        blockedUsers: response.blockedUsers || 0,
        totalServices: response.totalServices || 0,
        pendingRequests: response.pendingRequests || 0,
        userMonthlyData: response.userMonthlyData || [],
        workerMonthlyData: response.workerMonthlyData || [],
      });
      setYearlyEarnings(response.yearlyEarnings || []);
      setMonthlyEarnings(response.monthlyEarnings || []);
    } catch (error) {
      console.error("Dashboard fetching error:", error);
    }
  };

  const { blockedWorkers, blockedUsers, totalServices, pendingRequests } =
    dashboardData;

  return (
    <div>
      <p className="text-xl px-1 py-2 font-semibold">Welcome Anas</p>
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
          boxShadow="0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(64, 64, 64, 0.4)"
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
      <div className="flex">
        <div className="w-full">
          <p className="text-xl font-semibold my-4 mx-2">All Counts</p>
          <ChartDashboard chartData={chartData} config={chartConfig} />
        </div>
        <div className="">
          <p className="text-xl font-semibold mt-5 mx-2">Yearly Profit</p>
          <YearlyChart yearlyEarnings={yearlyEarnings} />
        </div>
      </div>
      <div className="my-6">
        <MonthlyEarnings monthlyEarnings={monthlyEarnings} />{" "}
      </div>
    </div>
  );
};

export default DashboardAdmin;
