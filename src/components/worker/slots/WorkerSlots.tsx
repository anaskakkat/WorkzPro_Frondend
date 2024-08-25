import React, { useEffect, useState } from "react";
import {
  addProblem,
  fetchCommonProblams,
  fetchWorker,
} from "../../../api/worker";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import toast from "react-hot-toast";
import { IFormErrors } from "../../../types/formError";
import WorkeDays from "./WorkeDays";
import IWorker from "../../../types/IWorker";
const WorkerSlots: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [problemName, setProblemName] = useState("");
  const [problems, setProblems] = useState<IFormErrors[]>([]);
  const [estimatedHours, setEstimatedHours] = useState("");
  const [errors, setErrors] = useState<IFormErrors>({});
  const workerId = useSelector(
    (state: RootState) => state.workerInfo.workerInfo._id
  );
  const [worker, setWorker] = useState<IWorker | null>(null);

  // console.log(workerId);
  useEffect(() => {
    const getWorkerData = async () => {
      try {
        const response = await fetchWorker(workerId);
        console.log("rep;--", response);

        setWorker(response.worker);
      } catch (error) {
        console.error("Failed to fetch worker data", error);
      }
    };

    getWorkerData();
  }, [workerId]);
  const handleModalSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formErrors: IFormErrors = validate();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      console.log("Problem Name:", problemName);
      console.log("Estimated Hours:", estimatedHours);
      try {
        const response = await addProblem({
          problemName,
          estimatedHours,
          workerId,
        });
        // console.log("res:,", response);
        toast.success(response);
      } catch (error) {
        console.log(error);
      }

      closeModal();
    }
  };
  const getCommonProblams = async () => {
    try {
      const response = await fetchCommonProblams(workerId);
      console.log("resp--problems--", response.commonProblams);
      setProblems(response.commonProblams);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };
  const validate = () => {
    const newErrors: IFormErrors = {};

    if (!/^(?!\s*$)[a-zA-Z\s]+$/.test(problemName.trim())) {
      newErrors.problemName =
        "Problem name should only contain letters and spaces and cannot be empty or just whitespace.";
    }

    if (!/^[1-8]$/.test(estimatedHours)) {
      newErrors.estimatedHour =
        "Estimated hours should be a number between 1 and 8.";
    }

    return newErrors;
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setProblemName("");
    setEstimatedHours("");
    setErrors({});
  };
  return (
    <div className="w-full h-full">
      <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex-grow">
          {worker ? (
            <WorkeDays
              workingDaysProp={worker.configuration?.workingDays ?? []}
              slotSizeProp={worker.configuration?.slotSize ?? 1}
              bufferTimeProp={worker.configuration?.bufferTime ?? 30}
              setWorker={setWorker}
            />
          ) : (
            <div className="flex items-center justify-center h-64">
              <span>Loading...</span>
            </div>
          )}
        </div>

        <div className="w-full lg:w-64 flex flex-col items-center border-2 border-gray-200 p-4">
          <h3 className="text-center font-semibold text-custom_navyBlue">
            Common Problems
          </h3>
          <button
            className="bg-transparent max-w-32 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded mt-2"
            onClick={() => setIsModalOpen(true)}
          >
            Add{" "}
          </button>
          {problems &&
            problems.map((problem) => (
              <div
                key={problem._id}
                className="bg-blue-50 border-2 border-gray-400 w-full h-fit px-3"
              >
                <p>name:{problem.problemName}</p>
                <p>{problem.estimatedHour}hrs</p>
              </div>
            ))}
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">
                Add Problem Details
              </h2>
              <form onSubmit={handleModalSubmit}>
                {/* Problem Name Input */}
                <div className="mb-4">
                  <label className="block text-gray-700">Problem Name</label>
                  <input
                    type="text"
                    value={problemName}
                    onChange={(e) => setProblemName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-300"
                    placeholder="Enter problem name"
                    required
                  />
                  {errors.problemName && (
                    <p className="text-red-500 text-sm font-light">
                      {errors.problemName}
                    </p>
                  )}
                </div>

                {/* Estimated Hours Input */}
                <div className="mb-4">
                  <label className="block text-gray-700">Estimated Hours</label>
                  <input
                    type="number"
                    value={estimatedHours}
                    onChange={(e) => setEstimatedHours(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-300"
                    placeholder="Enter estimated hours"
                    required
                  />
                  {errors.estimatedHour && (
                    <p className="text-red-500 text-sm font-light">
                      {errors.estimatedHour}
                    </p>
                  )}
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    onClick={close}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerSlots;
