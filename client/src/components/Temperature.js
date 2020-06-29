import React from "react";

const Temperature = (props) => {
  const { temperature } = props;
  return (
    <div className="sensor">
      <div className="sensor__name">Temperatura</div>
      <div className="sensor__data">{temperature}</div>
    </div>
  );
};

export default Temperature;
