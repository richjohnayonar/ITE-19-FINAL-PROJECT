import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowDealerProfile from "../components/ShowDealerProfile";

function DealerProfile() {
  const [dealerProfiles, setDealerProfiles] = useState([]);

  const getDealerProfiles = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/dealer");
      // console.log(response.data); // Check to ensure you're receiving data
      setDealerProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDealerProfiles();
  }, []);

  return (
    <div className="specific-dealer-container">
      {dealerProfiles.map((vehicle) => (
        <ShowDealerProfile key={vehicle._id} vehicle={vehicle} />
      ))}
    </div>
  );
}

export default DealerProfile;
