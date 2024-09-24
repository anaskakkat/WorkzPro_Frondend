import { BarChart } from "@mui/x-charts/BarChart";

interface YearlyEarning {
  _id: string;
  totalEarnings: number;
}

interface YearlyChartProps {
  yearlyEarnings: YearlyEarning[];
}

const YearlyChart: React.FC<YearlyChartProps> = ({ yearlyEarnings }) => {
  // Default years with 0 earnings
  const defaultYears = [
    { _id: "2025", totalEarnings: 0 },
    { _id: "2026", totalEarnings: 0 },
    { _id: "2027", totalEarnings: 0 },
  ];

  // Merge yearlyEarnings with defaultYears, ensuring no duplicates
  const mergedEarnings = [...yearlyEarnings];
  defaultYears.forEach((year) => {
    if (!mergedEarnings.some((item) => item._id === year._id)) {
      mergedEarnings.push(year);
    }
  });

  // Sort by year to ensure proper ordering
  const sortedEarnings = mergedEarnings.sort((a, b) => Number(a._id) - Number(b._id));

  const years = sortedEarnings.map((item) => item._id);
  const earnings = sortedEarnings.map((item) => item.totalEarnings);

  return (
    <div>
      <BarChart
        xAxis={[{ scaleType: "band", data: years }]}
        series={[{ data: earnings,color:"#49a3f1" }]}
        width={500}
        height={300}
      />
    </div>
  );
};

export default YearlyChart;
