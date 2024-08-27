import React, { useEffect, useState } from "react";
import { fetchWorker } from "../../../api/worker";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import WorkeDays from "./WorkeDays";
import IWorker from "../../../types/IWorker";
import Services from "./Services";
import WeekDays from "./WeekDays";

const WorkerSlots: React.FC = () => {
  const workerId = useSelector(
    (state: RootState) => state.workerInfo.workerInfo._id
  );
  const [worker, setWorker] = useState<IWorker | null>(null);

  // console.log(workerId);
  useEffect(() => {
    const getWorkerData = async () => {
      try {
        const response = await fetchWorker(workerId);
        // console.log("rep;--", response);

        setWorker(response.worker);
      } catch (error) {
        console.error("Failed to fetch worker data", error);
      }
    };

    getWorkerData();
  }, [workerId]);

  return (
    <div className="w-full  h-fit">
      <div className="flex flex-col lg:flex-row gap-2 h-screen">
        {" "}
        <div className="">
          {worker && (
            <WorkeDays
              workingDaysProp={worker.configuration?.workingDays ?? []}
              slotSizeProp={worker.configuration?.slotSize ?? 1}
              bufferTimeProp={worker.configuration?.bufferTime ?? 30}
              setWorker={setWorker}
            />
          )}
        </div>
        <div className="flex  flex-1 flex-col h-fit gap-10 p-0 m-0">
          <div className="h-full">
            <Services />
          </div>

          <div className="h-full">
            <WeekDays />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerSlots;
