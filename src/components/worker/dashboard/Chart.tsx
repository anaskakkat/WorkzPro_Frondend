import { BarChart } from "@mui/x-charts/BarChart";

const monthNames: string[] = [
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

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "#1A73E8",
  },
};

interface MonthlyEarning {
  month: number;
  totalEarnings: number;
}

interface ChartData {
  month: string;
  earnings: number;
}

interface ChartProps {
  monthlyEarnings: MonthlyEarning[];
}

export function Chart({ monthlyEarnings }: ChartProps) {
  console.log("earnings----", monthlyEarnings);

  const chartData: ChartData[] = monthNames.map((month) => ({
    month,
    earnings: 0,
  }));

  monthlyEarnings.forEach((item) => {
    const monthIndex = item.month - 1;
    if (monthIndex >= 0 && monthIndex < chartData.length) {
      chartData[monthIndex].earnings = item.totalEarnings || 0;
    }
  });

  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: chartData.map((item) => item.month) }]}
      series={[
        {
          data: chartData.map((item) => item.earnings),
          label: chartConfig.earnings.label,
          color: chartConfig.earnings.color,
        },
      ]}
      width={600}
      height={300}
    />
  );
}
