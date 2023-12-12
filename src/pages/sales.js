import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

function SalesLastThreeYears() {
  const [salesLastThreeYears, setsalesLastThreeYears] = useState([]);

  const getSalesLastThreeYears = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/sales");
      console.log(response.data);
      setsalesLastThreeYears(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSalesLastThreeYears();
  }, []);

  const columns = [
    {
      name: "Customer",
      selector: "customer.customerName", // Replace with your data key
      sortable: true,
    },
    {
      name: "Dealer",
      selector: "dealer.dealerName", // Replace with your data key
      sortable: true,
    },
    {
      name: "Brand",
      selector: "brand.brandName", // Replace with your data key
      sortable: true,
    },
    {
      name: "Model",
      selector: "vehicleModel.modelName", // Replace with your data key
      sortable: true,
    },
    {
      name: "Price",
      selector: "vehiclePrice", // Replace with your data key
      sortable: true,
    },
    {
      name: "Date Created",
      selector: "createdAt", // Replace with your data key
      sortable: true,
    },
    // Add more columns as needed...
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#060b26", // Adjust this color to your desired dark background
        color: "#fff", // Text color for column headers
      },
    },
  };

  return (
    <div className="table-container">
      <h1>SALES</h1>
      <DataTable
        columns={columns}
        data={salesLastThreeYears}
        pagination // Enable pagination if needed
        customStyles={customStyles} // Apply the custom styles to the table
        // Additional DataTable props can be added as needed
      />
    </div>
  );
}

export default SalesLastThreeYears;
