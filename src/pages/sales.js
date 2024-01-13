import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Loader from "../components/loader";
import AxiosUtilsConfig from "../utils/utils";

function SalesLastThreeYears() {
  // backend api base url
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [sales, setSales] = useState([]);
  const [salesLastThreeYears, setsalesLastThreeYears] = useState([]);
  const [getTopTwo, setGetTopTwo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // all sales
    const getSales = async () => {
      try {
        setIsLoading(true);

        const url = `${BASE_URL}/api/car/sales`;
        // Retrieve the token from local storage

        const response = await axios.get(url, AxiosUtilsConfig());

        setSales(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getSales();

    //sales 3 years ago
    const getSalesLastThreeYears = async () => {
      try {
        setIsLoading(true);
        const url = `${BASE_URL}/api/car/sales-past-three-years`;
        // Retrieve the token from local storage

        const response = await axios.get(url, AxiosUtilsConfig());
        setsalesLastThreeYears(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getSalesLastThreeYears();

    //top 2 brannds
    const topTwoBrand = async () => {
      try {
        setIsLoading(true);
        const url = `${BASE_URL}/api/car/top-brand-sales`;

        const response = await axios.get(url, AxiosUtilsConfig());
        const { data } = response;
        setGetTopTwo(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    topTwoBrand();
  }, [BASE_URL]);

  const AllSale = [
    {
      name: "Customer",
      selector: "customerInfo.customerName", // Replace with your data key
      sortable: true,
    },
    {
      name: "Dealer",
      selector: "dealerInfo.dealerName", // Replace with your data key
      sortable: true,
    },
    {
      name: "VIN",
      selector: "manufacturerVehicleInfo.vin", // Replace with your data key
      sortable: true,
    },
    {
      name: "Brand",
      selector: "brandInfo.brandName", // Replace with your data key
      sortable: true,
    },
    {
      name: "Model",
      selector: "modelInfo.modelName", // Replace with your data key
      sortable: true,
    },
    {
      name: "Price",
      selector: "dealerVehicleInfo.price", // Replace with your data key
      sortable: true,
    },
    {
      name: "Date Created",
      selector: "createdAt", // Replace with your data key
      sortable: true,
    },
    // Add more columns as needed...
  ];

  const salesThreeYears = [
    {
      name: "Customer",
      selector: "customerInfo.customerName", // Replace with your data key
      sortable: true,
    },
    {
      name: "Gender",
      selector: "customerInfo.customerGender", // Replace with your data key
      sortable: true,
    },
    {
      name: "Income",
      selector: "customerInfo.customerAnnualIncome", // Replace with your data key
      sortable: true,
    },
    {
      name: "Brand",
      selector: "brandInfo.brandName", // Replace with your data key
      sortable: true,
    },
    {
      name: "Model",
      selector: "modelInfo.modelName", // Replace with your data key
      sortable: true,
    },
    {
      name: "Price",
      selector: "dealerVehicleInfo.price", // Replace with your data key
      sortable: true,
    },
    {
      name: "Date Created",
      selector: "createdAt", // Replace with your data key
      sortable: true,
    },
    // Add more columns as needed...
  ];

  const topTwoSale = [
    {
      name: "Brand",
      selector: "_id",
    },
    {
      name: "Total Sale Amount",
      selector: "totalSalesAmount",
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#060b26", // Background color for column headers
        color: "#fff", // Text color for column headers
        borderBottom: "2px solid #ddd", // Bottom border for column headers
      },
    },
    cells: {
      style: {
        backgroundColor: "#f7f7f7", // Background color for cells
        color: "#333", // Text color for cells
        border: "1px solid #ddd", // Bottom border for cells
      },
    },
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
        <div>
          {/* all sales */}
          <div className="table-container">
            <h1 style={{ fontWeight: "900", color: " rgb(102, 98, 98)" }}>
              SALES
            </h1>
            <DataTable
              columns={AllSale}
              data={sales}
              pagination // Enable pagination if needed
              customStyles={customStyles} // Apply the custom styles to the table
              // Additional DataTable props can be added as needed
            />
          </div>

          {/* sales last three years */}
          <div className="table-container">
            <h1 style={{ fontWeight: "900", color: " rgb(102, 98, 98)" }}>
              SALES FOR THE PAST THREE YEARS
            </h1>
            <DataTable
              columns={salesThreeYears}
              data={salesLastThreeYears}
              pagination // Enable pagination if needed
              customStyles={customStyles} // Apply the custom styles to the table
              // Additional DataTable props can be added as needed
            />
          </div>

          {/* top two brand by sale amount */}
          <div className="table-container">
            <h1 style={{ fontWeight: "900", color: " rgb(102, 98, 98)" }}>
              Top Two Brand
            </h1>
            <DataTable
              columns={topTwoSale}
              data={getTopTwo}
              pagination // Enable pagination if needed
              customStyles={customStyles} // Apply the custom styles to the table
              // Additional DataTable props can be added as needed
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SalesLastThreeYears;
