import React from "react";
import { Alert } from "react-bootstrap";

const ErrorList = (props) => {
  if (props && props.error) {
    if (typeof props.error === "string") {
      return (
        <Alert variant="danger">
          <span>{props.error}</span>
        </Alert>
      );
    }
    if (Array.isArray(props.error) && props.error.length > 0) {
      return (
        <Alert variant="danger">
          {props.error.map((e, i) => (
            <span key={i} className="d-block">
              {e}
            </span>
          ))}
        </Alert>
      );
    }
    if (
      typeof props.error === "object" &&
      Object.keys(props.error).length > 0
    ) {
      return (
        <Alert variant="danger">
          {Object.values(props.error).map((e, i) => (
            <span key={i} className="d-block">
              {e}
            </span>
          ))}
        </Alert>
      );
    }
  }
  return null;
};

export default ErrorList;
