import React from "react";
import { Alert } from "react-bootstrap";

const MessageBox = ({ children, variant }) => {
  return (
    <>
      <Alert className="text-center" variant={variant || "info"}>
        {children}
      </Alert>
    </>
  );
};

export default MessageBox;
