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
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

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
    color: "#",
  },
} satisfies ChartConfig;

interface ChartProps {
  userMonthlyData: MonthlyData[];
  workerMonthlyData: MonthlyData[];
}

export const Chart = ({ userMonthlyData, workerMonthlyData }: ChartProps) => {
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
    const userData = userMonthlyData.find(
      (data) => parseInt(data._id) === index + 1
    );
    const workerData = workerMonthlyData.find(
      (data) => parseInt(data._id) === index + 1
    );

    return {
      month,
      users: userData ? userData.totalUsers : 0,
      workers: workerData ? workerData.totalWorkers : 0,
    };
  });

  return (
    <ChartContainer config={chartConfig} className="h-80 mt-1 mx-5 p-5">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="" />
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
  );
};
