import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import Loader from "../components/loader";
import AxiosUtilsConfig from "../utils/utils";

function SearchResult() {
  // backend api base url
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { query } = useParams();
  const [searchResult, setSearchResult] = useState([]);
  const [getCarAndDealer, setGetCarAndDealer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setIsLoading(true);
        if (!query.trim()) {
          setIsLoading(false);
          return;
        }

        const url = `${BASE_URL}/api/car/sales-by-vin?query=${query}`;

        const response = await axios.get(url, AxiosUtilsConfig());
        const { data } = response;

        if (data && data.length > 0) {
          setSearchResult(data);
        } else {
          setSearchResult([]);
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchSearchResults();

    const fetchCarAndDealerSearchResult = async () => {
      try {
        setIsLoading(true);
        if (!query.trim()) {
          setIsLoading(false);
          return;
        }

        const url = `${BASE_URL}/api/car/dealerVehicle?query=${query}`;

        const response = await axios.get(url, AxiosUtilsConfig());
        const { data } = response;

        if (data && data.length > 0) {
          setGetCarAndDealer(data);
        } else {
          setGetCarAndDealer([]);
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchCarAndDealerSearchResult();
  }, [BASE_URL, query]);

  const vehicle = [
    {
      name: "Model",
      selector: "modelInfo.modelName",
    },
    {
      name: "Brand",
      selector: "brandInfo.brandName",
    },
    {
      name: "Manufacturer",
      selector: "manufacturerInfo.manufacturerName",
    },
    {
      name: "VIN",
      selector: "manufacturerVehicleInfo.vin",
    },
    {
      name: "Price",
      selector: "price",
    },
  ];

  const customer = [
    // Define your table columns here
    // Example:
    {
      name: "Name",
      selector: "customerInfo.customerName",
    },
    {
      name: "Address",
      selector: "customerInfo.customerAddr",
    },
    {
      name: "Gender",
      selector: "customerInfo.customerGender",
    },
    {
      name: "Phone",
      selector: "customerInfo.customerPhone",
    },
    {
      name: "Annual Income",
      selector: "customerInfo.customerAnnualIncome",
    },
  ];

  const dealer = [
    // Define your table columns here
    // Example:
    {
      name: "Name",
      selector: "dealerInfo.dealerName",
    },
    {
      name: "Address",
      selector: "dealerInfo.dealerAddr",
    },
    {
      name: "Email",
      selector: "dealerInfo.dealerEmail",
    },
    {
      name: "Phone",
      selector: "dealerInfo.dealerPhone",
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
        <div>
          {searchResult.length === 0 && getCarAndDealer.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                fontSize: "50px",
                fontWeight: "900",
                color: " rgb(102, 98, 98)",
                marginTop: "20vh",
                wordWrap: "break-word",
              }}
            >
              No result for "{query}"
            </div>
          ) : (
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
                <div style={{ paddingBottom: "50px" }}>
                  <h1
                    style={{
                      textAlign: "center",
                      fontWeight: "900",
                      color: " rgb(102, 98, 98)",
                      margin: "50px 0",
                    }}
                  >
                    Search Results for vin "{query}"
                  </h1>

                  {/* vehicle */}
                  <div className="table-container">
                    <h2
                      style={{
                        textTransform: "upperCase",
                        fontWeight: "600",
                      }}
                    >
                      Vehicle
                    </h2>
                    {getCarAndDealer.length > 0 ? (
                      <DataTable
                        columns={vehicle}
                        data={getCarAndDealer}
                        customStyles={customStyles}
                      />
                    ) : (
                      <p>No results found</p>
                    )}
                  </div>

                  {/* dealer */}
                  <div className="table-container">
                    <h2
                      style={{
                        textTransform: "upperCase",
                        fontWeight: "600",
                      }}
                    >
                      Dealer
                    </h2>
                    {getCarAndDealer.length > 0 ? (
                      <DataTable
                        columns={dealer}
                        data={getCarAndDealer}
                        customStyles={customStyles}
                      />
                    ) : (
                      <p>No results found</p>
                    )}
                  </div>

                  {/* Customer */}
                  <div className="table-container">
                    <h2
                      style={{
                        textTransform: "upperCase",
                        fontWeight: "600",
                      }}
                    >
                      Customer
                    </h2>
                    {searchResult.length > 0 ? (
                      <DataTable
                        columns={customer}
                        data={searchResult}
                        customStyles={customStyles}
                      />
                    ) : (
                      <p>No results found</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default SearchResult;
