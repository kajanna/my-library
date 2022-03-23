import React from "react";
import { Link } from "react-router-dom";
import Button from "../shared/Button";
import PageNotFoundPicture from "../assets/page_not_found.png";

import "./PageNotFound.scss";

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <img src={PageNotFoundPicture} />
      <div className="page-not-found__info">
      We can't find the page that you're looking for. Check the URL and try again or go to My Library
        <Link to="/my-library">
          <Button buttonText="go to My Library" />
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
