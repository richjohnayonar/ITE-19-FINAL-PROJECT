import React, { useEffect, useState } from "react";
import axios from "axios";
import Vehicle from "../components/Vehicle";
import styles from "../components/Vehicle.module.css";
import Brandlist from "../components/Brandlist";
import Loader from "../components/loader";
import AxiosUtilsConfig from "../utils/utils";

function Home() {
  // backend api base url
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [vehiclesPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getVehicles = async () => {
      try {
        setIsLoading(true);
        let url = `${BASE_URL}/api/car/model?page=${currentPage}&limit=${vehiclesPerPage}`;

        const response = await axios.get(url, AxiosUtilsConfig());
        const { models, currentPage: page } = response.data;
        setVehicles(models);
        setCurrentPage(page);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getVehicles();
  }, [BASE_URL, currentPage, vehiclesPerPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loader />
        </div>
      ) : (
        <div className={styles["home-page"]}>
          <h1 style={{ fontWeight: "900", color: " rgb(102, 98, 98)" }}>
            CAR LIST
          </h1>
          <Brandlist />
          <div className={styles["vehicle-grid"]}>
            {vehicles.map((vehicle, index) => (
              <Vehicle key={index} vehicle={vehicle} />
            ))}
          </div>
          <div className={styles["pagination-container"]}>
            <span>Page: {currentPage}</span>
            <div className={styles["pagination-buttons"]}>
              <button onClick={prevPage} disabled={currentPage === 1}>
                Prev Page
              </button>
              <button
                onClick={nextPage}
                disabled={vehicles.length < vehiclesPerPage}
              >
                Next Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
