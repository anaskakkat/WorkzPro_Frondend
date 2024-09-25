import { useParams } from "react-router-dom";
import { fetchWorkerDatabyId } from "../../../api/user";
import { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import IWorker from "../../../types/IWorker";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CustomTabPanel from "./CustomTabPanel";
import { Container } from "@mui/material";

const WorkerDetails = () => {
  const [worker, setWorker] = useState<IWorker | null>(null);
  const { workerId } = useParams();
  const fetchWorkerData = async () => {
    try {
      const response = await fetchWorkerDatabyId(workerId!);
      // console.log(response);

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
    <Container>
      <div className="flex flex-col md:flex-row py-10 gap-8 ">
        {/* <div className="">
        <h4 className="text-center font-semibold my-4 text-xl text-custom_navyBlue">
          Worker Details
        </h4>
      </div> */}
        <div className=" border rounded-lg border-blue-200 flex flex-col justify-center  h-fit">
        <div className="py-2 px-6 justify-center items-center">
  <div>
    <img
      className="rounded-xl mx-auto shadow-md shadow-slate-200 w-full max-w-[170px] h-auto"
      src={worker.profilePicture}
      alt={worker.name}
    />
  </div>
  <div className="my-2 text-center">
    <h2 className="font-semibold text-lg capitalize">{worker.name}</h2>

    <div className="flex justify-around lg:justify-between text-[15px] mt-1 font-semibold">
      {worker.service.name || "Pinter"} <p>#{worker.workerId}</p>
    </div>
    <div className="flex items-center justify-center mt-1"> 
      <p className="font-medium mr-1">{worker.locationName}</p> 
      <LocationOnIcon
        className="text-custom_buttonColor"
        style={{ fontSize: "15px" }} 
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
        <div className="tab mx-auto md:mx-0">
          <CustomTabPanel workerId={workerId!} />
        </div>
      </div>
    </Container>
  );
};

export default WorkerDetails;
