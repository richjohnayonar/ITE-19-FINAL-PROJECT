import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page">
      <Link className="landing-page-link" to="/login">
        <h1>Get Started</h1>
      </Link>
    </div>
  );
}

export default LandingPage;
