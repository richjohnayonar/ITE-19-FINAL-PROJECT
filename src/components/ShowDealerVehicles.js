import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ShowVehicleDeals from "../components/ShowVehicleDeals";
import styles from "../components/Vehicle.module.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FaChevronLeft } from "react-icons/fa";
import DataTable from "react-data-table-component";
import Loader from "./loader";

function ShowAllDealersVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [dealerInfo, setDealerInfo] = useState({}); // State for dealer information
  const vehiclesPerPage = 8; // Define the number of vehicles per page
  const [isLoading, setIsLoading] = useState(false);
  const [dealerVehicles, setdealerVehicles] = useState([]);

  const { dealerId } = useParams();

  const getVehicles = useCallback(async () => {
    try {
      setIsLoading(true);
      let url = `http://localhost:8000/api/dealerVehicles/${dealerId}?page=${currentPage}&limit=${vehiclesPerPage}`;
      const response = await axios.get(url);
      const { data } = response;
      if (!data.dealerVehicles || data.dealerVehicles.length === 0) {
        setVehicles([]);
        setCurrentPage(1);
        setTotalPages(0);
      } else {
        const { dealerVehicles, currentPage, totalPages } = data; // Destructure from data

        setVehicles(dealerVehicles);
        setCurrentPage(currentPage);
        setTotalPages(totalPages);
        setDealerInfo(
          dealerVehicles.length > 0 ? dealerVehicles[0].dealerInfo : {}
        ); // Set dealer information
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [dealerId, currentPage]);

  const getDealerVehicle = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/salesByDealer/${dealerId}`
      );
      console.log(response.data);
      setdealerVehicles(response.data); // Assuming setDealerVehicles is a state setter function
    } catch (error) {
      console.log(error);
    }
  }, [dealerId]);

  const columns = [
    {
      name: "Customer",
      selector: "customerInfo.customerName", // Replace with your data key
      sortable: true,
    },
    {
      name: "Customer Address",
      selector: "customerInfo.customerAddr", // Replace with your data key
      sortable: true,
    },
    {
      name: "Vehicle Model",
      selector: "modelInfo.modelName", // Replace with your data key
      sortable: true,
    },
    {
      name: "Brand",
      selector: "brandInfo.brandName", // Replace with your data key
      sortable: true,
    },
    {
      name: "Price",
      selector: "dealerVehicleInfo.price", // Replace with your data key
      sortable: true,
    },
    {
      name: "Date",
      selector: "createdAt", // Replace with your data key
      sortable: true,
    },
  ];

  useEffect(() => {
    getVehicles();
    getDealerVehicle();
  }, [getVehicles, getDealerVehicle]);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#060b26", // Adjust this color to your desired dark background
        color: "#fff", // Text color for column headers
      },
    },
  };
  return (
    <>
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
          <div className={styles["dealers-vehicle-profile"]}>
            <img src={dealerInfo.image} alt={vehicles.dealerName} />
          </div>
          <h1>{dealerInfo.dealerName}'s Vehicle</h1>

          <Link className={styles["dealer-deal"]} to={"/dealer-profile"}>
            <span>
              <FaChevronLeft className={styles["dealer-deal-arrow"]} />
              back
            </span>
          </Link>
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

          <div className="table-container">
            <h2>{dealerInfo.dealerName}'s Customer Deals</h2>
            <DataTable
              columns={columns}
              data={dealerVehicles}
              pagination // Enable pagination if needed
              customStyles={customStyles} // Apply the custom styles to the table
              // Additional DataTable props can be added as needed
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ShowAllDealersVehicles;
