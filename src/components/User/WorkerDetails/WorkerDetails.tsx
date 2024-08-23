import { useNavigate, useParams } from "react-router-dom";
import { fetchWorkerDatabyId } from "../../../api/user";
import { useEffect, useState } from "react";
import Loader from "../../loader/Loader";
import IWorker from "../../../types/IWorker";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const WorkerDetails = () => {
  const [worker, setWorker] = useState<IWorker | null>(null);
  const { workerId } = useParams();
  const navigate = useNavigate();
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
        <h4 className="text-center my-10 font-medium text-xl text-custom_navyBlue">
          Worker Details
        </h4>
      </div>
      <div className="container p-4  flex gap-2 mx-auto  mb-16 rounded-lg overflow-hidden">
        <div className="p-4 border-2 max-w-full min-w-60 text-custom_navyBlue">
          <div>
            <img
              className="mx-auto border-2  border-custom_lightBlue"
              width={100}
              src={worker.profilePicture}
              alt={worker.name}
            />
          </div>
          <div className="my-2 text-[18px]">
            <div className="flex justify-between">
              <h2 className="font-normal">{worker.name}</h2>
              <p>#{worker.workerId}</p>
            </div>

            <div className="flex justify-between mt-1">
              {worker.service.name || "Pinter"}{" "}
              <div className="flex">
                <LocationOnIcon
                  className="text-custom_buttonColor  "
                  style={{ fontSize: "18px", marginTop: "6px" }}
                />
                <p>{worker.locationName}</p>
              </div>
            </div>
            <div className="flex flex-row justify-between bg-blue-100 p-2 mt-1">
              <p className="">Exp: {worker.experience} yrs</p>
              <p className="">Rating 4.6</p>
            </div>
          </div>
        </div>
        <div className="border-2 w-full  p-4 ">
          <div className="text-wrap  text-xl ">
            <p className="text-2xl text-custom_navyBlue ">Service</p>
            <div className="m-1">
              {" "}
              <p className="text-custom_navyBlue  ">{worker.service.name}</p>
              <p
                className="text-gray-800 text-[16px] font-normal capitalize
               "
              >
                {worker.service.description}
              </p>
              <p className="text-gray-700 text-[17px]">{worker.wageDay}/Day</p>
            </div>
          </div>
          <div className="">
            <h4 className="text-xl text-custom_navyBlue mt-2">
              Project Images
            </h4>

            <div className="flex gap-1">
              {worker.images?.length > 0 ? (
                worker.images.map((image, index) => (
                  <img key={index} src={image} alt={`Project ${index + 1}`} />
                ))
              ) : (
                <p className="text-custom_buttonColor font-montserrat m-1">
                  No project images available.
                </p>
              )}
            </div>
          </div>
          <div className=" justify-center flex">
            {" "}
            <button
              onClick={() => navigate(`/workerCheckout/${workerId}`)}
              className=" bg-custom_buttonColor text-white p-4 py-2 rounded hover:bg-custom_navyBlue "
            >
              <CalendarTodayIcon className="mr-2" />
              Check Availability
            </button>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkerDetails;
