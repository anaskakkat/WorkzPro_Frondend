import React from "react";
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

interface ChartConfig {
  users: {
    label: string;
    color: string;
  };
  workers: {
    label: string;
    color: string;
  };
}

interface ChartContainerProps {
  chartData: { month: string; users: number; workers: number }[];
  config: ChartConfig;
}

const ChartDashboard: React.FC<ChartContainerProps> = ({ chartData, config }) => {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill={config.users.color} name={config.users.label} />
          <Bar dataKey="workers" fill={config.workers.color} name={config.workers.label} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartDashboard;



