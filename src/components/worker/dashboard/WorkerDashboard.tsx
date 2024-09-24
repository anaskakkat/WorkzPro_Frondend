import { useEffect, useState } from "react";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CancelIcon from "@mui/icons-material/Cancel";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Card from "./Card";
import { Chart } from "./Chart";
import { useWorkerDetails } from "@/redux/hooks/userSelectors";
import { fetchDashbordData } from "@/api/worker";

const WorkerDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    completedCount: 0,
    canceledCount: 0,
    pendingCount: 0,
    requestCount: 0,
    monthlyEarnings: [],
  });
  const worker = useWorkerDetails();

  useEffect(() => {
    fetchDashboardDetails();
  }, []);

  const fetchDashboardDetails = async () => {
    try {
      const response = await fetchDashbordData(worker._id);
      console.log("response-----", response);
      setDashboardData({
        completedCount: response.completedCount || 0,
        canceledCount: response.canceledCount || 0,
        pendingCount: response.pendingCount || 0,
        requestCount: response.requestCount || 0,
        monthlyEarnings: response.monthlyEarnings || [],
      });
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  return (
    <>
      <div>
        <p className="p-4 text-xl font-semibold capitalize">
          Welcome {worker.name}
        </p>
        <div className="flex flex-row px-3 justify-evenly">
          <Card
            icon={AssignmentTurnedInIcon}
            title="Completed"
            value={dashboardData.completedCount || 0}
            backgroundColor="linear-gradient(195deg, #49a3f1, #1A73E8)"
            boxShadow="0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(0, 187, 212, 0.4)"
          />
          <Card
            icon={CancelIcon}
            title="Canceled"
            value={dashboardData.canceledCount || 0}
            backgroundColor="linear-gradient(195deg, #42424a, #191919)"
            boxShadow="0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(64, 64, 64, 0.4)"
          />
          <Card
            icon={PendingActionsIcon}
            title="Pendings"
            value={dashboardData.pendingCount || 0}
            backgroundColor="linear-gradient(195deg, #66BB6A, #43A047)"
            boxShadow="0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(76, 175, 79, 0.4)"
          />
          <Card
            icon={AddTaskIcon}
            title="Request"
            value={dashboardData.requestCount || 0}
            backgroundColor="linear-gradient(195deg, #EC407A, #D81B60)"
            boxShadow="0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(233, 30, 98, 0.4)"
          />
        </div>
        <div className="flex flex-row">
          <div>
            {" "}
            <p className="p-5 text-xl font-semibold">Details</p>
            <Chart monthlyEarnings={dashboardData.monthlyEarnings} />
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default WorkerDashboard;
