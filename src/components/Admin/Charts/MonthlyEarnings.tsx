import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";

interface MonthlyEarningsProps {
  monthlyEarnings: { _id: string; totalAdminProfit: number }[];
}

const MonthlyEarnings: React.FC<MonthlyEarningsProps> = ({
  monthlyEarnings,
}) => {
  console.log("-MonthlyEarnings--", monthlyEarnings);

  // Create a mapping of month numbers to month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Initialize a dataset with all months set to zero
  const dataset = monthNames.map((month, index) => {
    // Find earnings for the current month (index + 1 because month index is 0-based)
    const earning = monthlyEarnings.find(
      (earning) => parseInt(earning._id) === index + 1
    );

    return {
      month: month,
      value: earning ? earning.totalAdminProfit : 0, // Use 0 if no earnings found for the month
    };
  });

  const chartSetting = {
    yAxis: [
      {
        label: "Value",
      },
    ],
    width: 950,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };

  return (
    <>
      <BarChart
        dataset={dataset} // Use the complete dataset with all months
        xAxis={[{ scaleType: "band", dataKey: "month" }]} // Use 'month' as the x-axis
        series={[
          { dataKey: "value", label: "Monthly Profit", color: "#000000" }, // Change the color if necessary
        ]} // Single series for the value
        {...chartSetting}
      />
    </>
  );
};

export default MonthlyEarnings;
