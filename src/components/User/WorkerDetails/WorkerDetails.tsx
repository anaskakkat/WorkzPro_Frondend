import { useParams } from "react-router-dom";
import { fetchWorkerDatabyId } from "../../../api/user";
import { useEffect, useState } from "react";
import Loader from "../../loader/Loader";
import IWorker from "../../../types/IWorker";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CustomTabPanel from "./CustomTabPanel";

const WorkerDetails = () => {
  const [worker, setWorker] = useState<IWorker | null>(null);
  const { workerId } = useParams();
  const fetchWorkerData = async () => {
    try {
      const response = await fetchWorkerDatabyId(workerId!);
      console.log(response);

      setWorker(response);
    } catch (error) {
      console.error("Failed to fetch worker data:", error);
    }
  };

  useEffect(() => {
    fetchWorkerData();
  }, [workerId]);

  if (!worker) return <Loader />;

  return (
    <>
      <div className="">
        <h4 className="text-center font-semibold my-4 text-xl text-custom_navyBlue">
          Worker Details
        </h4>
      </div>
      <div className=" container mx-auto flex gap-2 my-2 rounded-lg overflow-hidden  ">
        <div className=" ">
          <div className="py-2 px-6 border-2 max-w-full ">
            <div>
              <img
                className="rounded-xl  shadow-md shadow-slate-200"
                width={180}
                src={worker.profilePicture}
                alt={worker.name}
              />
            </div>
            <div className="my-2 text-center">
              <h2 className="font-semibold text-lg capitalize">
                {worker.name}
              </h2>

              <div className="flex justify-between  text-[15px] mt-1 font-semibold">
                {worker.service.name || "Pinter"} <p>#{worker.workerId}</p>
              </div>
              <div className="flex">
                <p className="font-medium">{worker.locationName}</p>
                <LocationOnIcon
                  className="text-custom_buttonColor  "
                  style={{ fontSize: "15px", marginTop: "6px" }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-around font-medium text-custom_navyBlue bg-blue-200  p-3">
            <p className="">
              Exp: <br /> {worker.experience} yrs
            </p>
            <p className="">
              Rating <br /> 4.6
            </p>
          </div>
        </div>
        <div>
          <CustomTabPanel />
        </div>
      </div>
    </>
  );
};

export default WorkerDetails;
