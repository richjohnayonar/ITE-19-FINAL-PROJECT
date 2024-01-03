// main.js
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import VehicleList from "./pages/VehicleList";
import ShowSpecificVehicle from "./pages/ShowSpecificVehicleDeals";
import CarModelByBrand from "./pages/CarModelByBrand";
import DealerProfile from "./pages/DealerProfiles";
import ShowDealerVehicle from "./components/ShowDealerVehicles";
import Manufacturer from "./pages/Manufacturer";
import Sales from "./pages/sales";
import SearchResult from "./pages/searchResult";

function Main({ handleLogout }) {
  return (
    <>
      <Router>
        <Navbar handleLogout={handleLogout} />
        <Switch>
          <Route
            path="/vehicle-By-Brand/:brandId"
            exact
            component={CarModelByBrand}
          />
          <Route path="/vehicle-list" exact component={VehicleList} />
          <Route
            path="/:dealerName-vehicle/:dealerId"
            exact
            component={ShowDealerVehicle}
          />
          <Route
            path="/:modelName-dealers/:modelId"
            component={ShowSpecificVehicle}
          />
          <Route path="/dealer-profile" component={DealerProfile} />
          <Route path="/manufacturer" component={Manufacturer} />
          <Route path="/sales" component={Sales} />
          <Route path="/search-result/:query" component={SearchResult} />
        </Switch>
      </Router>
    </>
  );
}

export default Main;
