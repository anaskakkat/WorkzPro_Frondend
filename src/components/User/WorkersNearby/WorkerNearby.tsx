import React, { useEffect, useState } from "react";
import { fetchWorkers } from "../../../api/user";
import Loader from "../../Loader/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import IWorker from "../../../types/IWorker";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { getDistance } from "geolib";
import CustomTextField from "@/components/styleComponents/StyledTextField";
import {
  Rating,
  MenuItem,
  Select,
  Pagination,
  FormControl,
} from "@mui/material";
import WorkerCard from "./WorkerCard";

const WorkerNearby: React.FC = () => {
  const [workers, setWorkers] = useState<IWorker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>("distance");

  const queryParams = new URLSearchParams(location.search);
  const serviceID = queryParams.get("service") || "";
  const locationData = useSelector((state: RootState) => state.location);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const workersPerPage = 8;
  console.log("--locationData--", locationData);

  useEffect(() => {
    const fetchWorkerData = async () => {
      setLoading(true);
      try {
        const response = await fetchWorkers(serviceID, locationData);
        const fetchedWorkers = response.data;
        console.log("--fetchedWorkers--", fetchedWorkers);

        // Check if locationData is available
        if (locationData && locationData.coordinates) {
          const workersWithDistance = fetchedWorkers.map((worker: any) => {
            const distance = getDistance(
              {
                latitude: locationData.coordinates[1],
                longitude: locationData.coordinates[0],
              },
              {
                latitude: worker.location.coordinates[1],
                longitude: worker.location.coordinates[0],
              }
            );
            return {
              ...worker,
              distance: (distance / 1000).toFixed(2),
            };
          });
          console.log("--workersWithDistance--", workersWithDistance);
          setWorkers(workersWithDistance);
        } else {
          // Set all workers if locationData is null
          setWorkers(fetchedWorkers);
        }
      } catch (error) {
        console.error("Failed to fetch workers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerData();
  }, [serviceID, locationData]);

  const handleDetails = (workerId: string) => {
    navigate(`/WorkerDetails/${workerId}`);
  };

  const filteredWorkers = workers
    .filter((worker) => {
      const matchesSearch = worker.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRating = ratingFilter
        ? worker.averageRating >= ratingFilter
        : true;

      return matchesSearch && matchesRating;
    })
    .sort((a, b) => {
      if (sortOption === "distance") {
        const distanceA = a.distance !== undefined ? a.distance : Infinity;
        const distanceB = b.distance !== undefined ? b.distance : Infinity;

        return distanceA - distanceB;
      } else if (sortOption === "rating") {
        return b.averageRating - a.averageRating;
      }
      return 0;
    });

  if (loading) {
    return <Loader />;
  }

  const totalPages = Math.ceil(filteredWorkers.length / workersPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col md:flex-row lg:h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-full flex flex-col px-2 md:w-64 bg-gray-50 md:p-5 lg:pt-12 md:pt-12">
        <div className="">
          <CustomTextField
            fullWidth
            label="Search workers"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            margin="normal"
            sx={{
              width: "90%",
            }}
          />
        </div>

        <div className="flex flex-col gap-1 mx-aut">
          <p className="w-fit block">Filter by Rating:</p>
          <Select
            value={ratingFilter || ""}
            onChange={(e) => setRatingFilter(Number(e.target.value) || null)}
            className="border rounded-lg"
            displayEmpty
            sx={{
              width: "90%",
              height: "40px",
            }}
          >
            <MenuItem value="">
              <em>All Ratings</em>
            </MenuItem>
            <MenuItem value="5">
              <Rating value={5} readOnly />
            </MenuItem>
            <MenuItem value="4">
              <Rating value={4} readOnly />
            </MenuItem>
            <MenuItem value="3">
              <Rating value={3} readOnly />
            </MenuItem>
            <MenuItem value="2">
              <Rating value={2} readOnly />
            </MenuItem>
            <MenuItem value="1">
              <Rating value={1} readOnly />
            </MenuItem>
          </Select>
        </div>

        {/* Sort Option */}
        <div className="flex flex-col mt-4 w-ful">
          <label className="w-fit" htmlFor="sort-option">
            Sort by:
          </label>
          <FormControl sx={{ width: "90%", height: "40px" }} variant="outlined">
            <Select
              id="sort-option"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              sx={{ height: "40px" }}
            >
              <MenuItem value="distance">Distance</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Heading */}
        <h2 className="text-xl w-fit font-bold mb-4 text-custom_navyBlue">
          Workers Nearby
        </h2>

        {/* Worker Cards */}
        {filteredWorkers.length === 0 ? (
          <div className="flex min-h-full mx-auto align-middle justify-center">
            No Workers available
          </div>
        ) : (
          <div className="grid sm:w-auto mx-auto sm:mx-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 capitalize">
            {filteredWorkers.map((worker) => (
              <WorkerCard
                key={worker._id}
                worker={worker}
                onDetailsClick={handleDetails}
              />
            ))}
          </div>
        )}

        {/* Pagination Component */}
        <div className="flex justify-center mt-8">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_event, page) => handlePageChange(page)}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default WorkerNearby;
