import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ShowVehicleDeals from "../components/ShowVehicleDeals";
import styles from "../components/Vehicle.module.css";
import Brandlist from "../components/Brandlist";
import { useParams } from "react-router-dom";

function ShowSpecificVehicleDeals() {
  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const vehiclesPerPage = 8; // Define the number of vehicles per page

  const { modelId } = useParams();

  const getVehicles = useCallback(async () => {
    try {
      let url = `http://localhost:8000/api/dealerVehicle/${modelId}?page=${currentPage}&limit=${vehiclesPerPage}`;
      const response = await axios.get(url);
      const { models, currentPage: page, totalPages } = response.data;

      if (models.length === 0) {
        setVehicles([]);
        setCurrentPage(1);
        setTotalPages(0);
      } else {
        setVehicles(models);
        setCurrentPage(page);
        setTotalPages(totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  }, [modelId, currentPage]);

  useEffect(() => {
    getVehicles();
  }, [getVehicles]);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className={styles["home-page"]}>
      <h1>List of dealers who have this Vehicle </h1>
      {/* Consider rendering a specific vehicle's image */}
      {/* <img src={vehicles.modelName} alt={vehicles.modelName} /> */}

      <Brandlist />
      <div className={styles["vehicle-grid"]}>
        {vehicles.map((vehicle) => (
          <ShowVehicleDeals key={vehicle._id} vehicle={vehicle} />
        ))}
      </div>
      <div className={styles["pagination-container"]}>
        <span>Page: {currentPage}</span>
        <div className={styles["pagination-buttons"]}>
          <button onClick={prevPage} disabled={currentPage === 1}>
            Prev Page
          </button>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowSpecificVehicleDeals;
