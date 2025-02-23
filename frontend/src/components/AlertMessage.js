import React from "react";

const AlertMessage = ({ type, text }) => {
  return (
    <div className={`alert alert-${type} text-center`} role="alert">
      {text}
    </div>
  );
};

export default AlertMessage;
