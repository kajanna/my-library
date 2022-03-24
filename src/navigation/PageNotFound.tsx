import { Link } from "react-router-dom";

import Button from "../shared/Button";
import PageNotFoundPicture from "../assets/page_not_found.png";

import "./PageNotFound.scss";

function PageNotFound() {
  return (
    <div className="page-not-found">
      <img src={PageNotFoundPicture} />
      <div className="page-not-found__info">
      <p> We can't find the page that you're looking for.</p>
      <p>Take me home</p>
        <Link to= "/">
          <Button buttonText="home"/>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
