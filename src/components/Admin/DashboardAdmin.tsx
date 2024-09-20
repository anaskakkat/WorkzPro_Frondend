import { useState, useEffect } from "react";
import Card from "../worker/dashboard/Card";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EngineeringIcon from "@mui/icons-material/Engineering";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { ChartContainer } from "@/components/ui/chart";
import { fetchDashbordData } from "@/api/admin";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface MonthlyData {
  _id: string;
  totalUsers: number;
  totalWorkers: number;
}

// ChartConfig for the chart configuration
const chartConfig = {
  users: {
    label: "Users",
    color: "#2563eb",
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
      setDashboardData({
        blockedWorkers: response.blockedWorkers || 0,
        blockedUsers: response.blockedUsers || 0,
        totalServices: response.totalServices || 0,
        pendingRequests: response.pendingRequests || 0,
        userMonthlyData: response.userMonthlyData || [],
        workerMonthlyData: response.workerMonthlyData || [],
      });
    } catch (error) {
      console.error("Dashboard fetching error:", error);
    }
  };

  const {
    blockedWorkers,
    blockedUsers,
    totalServices,
    pendingRequests,
  } = dashboardData;

  return (
    <div>
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
      <div>
        <p className="p-5 text-xl font-semibold">Details</p>
        <ChartContainer config={chartConfig} className="h-80 mt-1 mx-5 p-5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="users"
                fill={chartConfig.users.color}
                name={chartConfig.users.label}
              />
              <Bar
                dataKey="workers"
                fill={chartConfig.workers.color}
                name={chartConfig.workers.label}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default DashboardAdmin;
