import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowDealerProfile from "../components/ShowDealerProfile";
import Loader from "../components/loader";
import AxiosUtilsConfig from "../utils/utils";

function DealerProfile() {
  // backend api base url
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [dealerProfiles, setDealerProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDealerProfiles = async () => {
      try {
        setIsLoading(true);
        const url = `${BASE_URL}/api/car/dealer`;
        const response = await axios.get(url, AxiosUtilsConfig());
        setDealerProfiles(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getDealerProfiles();
  }, [BASE_URL]);

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
        <div className="specific-dealer-container">
          <h1 style={{ fontWeight: "900", color: " rgb(102, 98, 98)" }}>
            Dealer Profile
          </h1>
          {dealerProfiles.map((vehicle) => (
            <ShowDealerProfile key={vehicle._id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DealerProfile;
