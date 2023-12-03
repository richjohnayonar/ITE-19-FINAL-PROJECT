import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import styles from "../components/Vehicle.module.css";

function Brandlist() {
  const [brand, setBrand] = useState([]);
  const [activeBrand, setActiveBrand] = useState(null);
  const location = useLocation();

  const getBrand = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/brand");
      setBrand(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBrand();
  }, []);

  useEffect(() => {
    const brandIdFromUrl = location.pathname.split("/").pop();
    setActiveBrand(brandIdFromUrl);
  }, [location]);

  const handleBrandClick = (brandId) => {
    setActiveBrand(brandId);
  };

  return (
    <div className={styles["brand-list-container"]}>
      {brand.map((singleBrand) => (
        <Link
          to={`/vehicle-By-Brand/${singleBrand._id}`}
          key={singleBrand._id}
          className={`${styles["brand-link"]} ${
            activeBrand === singleBrand._id ? styles["active-brand"] : ""
          }`}
          onClick={() => handleBrandClick(singleBrand._id)}
        >
          <h2 className={styles["brand-list-text"]}>{singleBrand.brandName}</h2>
        </Link>
      ))}
    </div>
  );
}

export default Brandlist;
