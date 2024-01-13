import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import styles from "../components/Vehicle.module.css";
import Searchbar from "./searchbar";
import Loader from "./loader";
import AxiosUtilsConfig from "../utils/utils";

function Brandlist() {
  const [brand, setBrand] = useState([]);
  const [activeBrand, setActiveBrand] = useState(null);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const getBrand = async () => {
    try {
      setIsLoading(true);
      const url = "http://localhost:8000/api/car/brand";
      const response = await axios.get(url, AxiosUtilsConfig());
      setBrand(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
          <Searchbar />
          <div className={styles["brand-list-container"]}>
            {brand.map((singleBrand) => (
              <Link
                to={`/vehicle/vehicle-By-Brand/${singleBrand._id}`}
                key={singleBrand._id}
                className={`${styles["brand-link"]} ${
                  activeBrand === singleBrand._id ? styles["active-brand"] : ""
                }`}
                onClick={() => handleBrandClick(singleBrand._id)}
              >
                <h2 className={styles["brand-list-text"]}>
                  {singleBrand.brandName}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Brandlist;
