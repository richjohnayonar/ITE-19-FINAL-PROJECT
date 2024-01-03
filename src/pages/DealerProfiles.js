import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowDealerProfile from "../components/ShowDealerProfile";
import Loader from "../components/loader";
function DealerProfile() {
  const [dealerProfiles, setDealerProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getDealerProfiles = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8000/api/dealer");
      // console.log(response.data); // Check to ensure you're receiving data
      setDealerProfiles(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDealerProfiles();
  }, []);

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
