import React from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";

function Crypto({ name, price, image, symbol, change }) {
  const navigate = useNavigate();

  const goToCrypto = () => {
    navigate(`/info`);
  };

  return (
    <div className="crypto-container">

        <p>{name}</p>

      <p>{price} $</p>
      <p
        className={change.toFixed(2) > 0 ? "positive-value" : "negative-value"}
      >
        {change.toFixed(2)}%
      </p>
      <img src={image} alt={symbol} />
    </div>
  );
}

export default Crypto;
