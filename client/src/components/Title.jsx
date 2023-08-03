import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({ children }) => {
  return (
    <>
      <Helmet>
        <title>{children}</title>
      </Helmet>
    </>
  );
};

export default Title;
