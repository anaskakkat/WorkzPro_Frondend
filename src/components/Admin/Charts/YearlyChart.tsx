import { BarChart } from "@mui/x-charts/BarChart";
interface YearlyEarning {
  _id: number;
  totalEarnings: number;
}
interface YearlyChartProps {
  yearlyEarnings: YearlyEarning[];
}
const YearlyChart: React.FC<YearlyChartProps> = ({ yearlyEarnings }) => {
  const years = yearlyEarnings.map((item) => item._id);
  const earnings = yearlyEarnings.map((item) => item.totalEarnings);
  return (
    <div> 
      <BarChart
        xAxis={[{ scaleType: "band", data: years }]}
        series={[{ data: earnings }]}
        width={500}
        height={300}
      />
    </div>
  );
};

export default YearlyChart;
