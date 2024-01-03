import React from "react";
import styles from "./Vehicle.module.css";
import { FaLongArrowAltRight } from "react-icons/fa";

function ShowDealerVehicle({ vehicle }) {
  const handleContactClick = () => {
    window.location.href = `mailto:${vehicle.dealer.dealerEmail}`;
  };

  return (
    <>
      <div className={styles["card-container"]}>
        <img
          className={styles["card-image"]}
          src={vehicle.modelInfo.image}
          alt={vehicle.modelInfo.modelName}
        />

        <div className={styles["card-text-content"]}>
          <h2>
            {vehicle.modelInfo.modelName}
            <FaLongArrowAltRight className={styles["arrow"]} />
            <span>{vehicle.brandInfo.brandName}</span>
          </h2>
          <div className={styles["vehicle-status-price"]}>
            <h4 className={styles["status"]}>{vehicle.vehicleStatus}</h4>
            <h4> $ {vehicle.price}</h4>
          </div>
          <div className={styles["dealer-info"]}>
            <h4>{vehicle.dealerInfo.dealerName}</h4>
            <h4>{vehicle.dealer.dealerAddr}</h4>
            <h4>{vehicle.dealerInfo.dealerPhone}</h4>
          </div>

          <div className={styles["center-button"]}>
            <button
              className={styles["contact-me"]}
              onClick={handleContactClick}
            >
              Email Me
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowDealerVehicle;
