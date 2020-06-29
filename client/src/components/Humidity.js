import React from "react";

const Humidity = (props) => {
  const { humidity } = props;
  return (
    <div className="sensor">
      <div className="sensor__name">Wilgotność</div>
      <div className="sensor__data">{humidity}</div>
    </div>
  );
};

export default Humidity;
