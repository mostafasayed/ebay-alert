import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => (
  <div>
    <h1>404 - Page Not Found!</h1>
    <Link to="/" className="btn btn-primary mt-2">
      Back to Home
    </Link>
  </div>
);

export default PageNotFound;
