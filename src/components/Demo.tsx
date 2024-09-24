import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";

const Demo = () => {
  // Sample dataset with a single value for each month
  const dataset = [
    { month: "January", value: 100 },
    { month: "February", value: 200 },
    { month: "March", value: 150 },
    { month: "April", value: 300 },
    { month: "May", value: 250 },
    { month: "June", value: 350 },
    { month: "July", value: 400 },
    { month: "August", value: 450 },
    { month: "September", value: 500 },
    { month: "October", value: 600 },
    { month: "November", value: 700 },
    { month: "December", value: 800 },
  ];

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
        dataset={dataset}
        xAxis={[{ scaleType: "band", dataKey: "month" }]} // Use 'month' as the x-axis
        series={[
          { dataKey: "value", label: "Monthly Value", color: "#FF9F40" },
        ]} // Single series for the value
        {...chartSetting}
      />
    </>
  );
};

export default Demo;
