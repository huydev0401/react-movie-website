import React from "react";
import { Link } from "react-router-dom";
import Button from "./button/Button";

const Page404 = () => {
  return (
    <div className="page-container pt-20 text-center text-white">
      <h2 className="font-bold text-5xl text-primary mb-5">Sorry...</h2>
      <p className="font-base text-3xl mb-10">
        The Page you were looking for doesn't exist
      </p>
      <Button bgColor="secondary" className="!uppercase">
        <Link to={`/`}>Back to home page</Link>
      </Button>
    </div>
  );
};

export default Page404;
