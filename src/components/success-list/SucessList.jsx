import React from "react";
import { Alert } from "react-bootstrap";

const SucessList = (props) => {
  if (props && props.success) {
    if (typeof props.success === "string") {
      return (
        <Alert variant="success">
          <span>{props.success}</span>
        </Alert>
      );
    }
    if (Array.isArray(props.success) && props.success.length > 0) {
      return (
        <Alert variant="success">
          {props.success.map((e, i) => (
            <span key={i} className="d-block">
              {e}
            </span>
          ))}
        </Alert>
      );
    }
    if (
      typeof props.success === "object" &&
      Object.keys(props.success).length > 0
    ) {
      return (
        <Alert variant="success">
          {Object.values(props.success).map((e, i) => (
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

export default SucessList;
