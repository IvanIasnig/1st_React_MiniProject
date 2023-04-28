import React, { useEffect, useState } from "react";
import Axios from "axios";
import {BiArrowBack} from "react-icons/bi"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,

} from "recharts";
import { useParams, Link } from "react-router-dom";
import "../index.css";
import Loading from "../components/loading";

function CryptoInfo({ id }) {
  const params = useParams();
  console.log(params);
  const [cryptoData, setCryptoData] = useState();

  useEffect(() => {
    Axios.get(
      `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=usd&days=max`
    )
      .then((response) => {
        setCryptoData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!cryptoData) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const data = cryptoData.prices.map((price) => ({
    name: new Date(price[0]).toLocaleDateString(),
    price: price[1],
  }));

  console.log(data);

  return (
    <div>
      <Link to="/" className="home-button">
        <BiArrowBack />
      </Link>
      <h1 className="title">
        {params.id.charAt(0).toUpperCase() + params.id.slice(1)}
      </h1>
      <div className="chart-container">
        <LineChart width={800} height={500} data={data} className="line-chart">
          <XAxis dataKey="name" className="x-axis" />
          <YAxis className="y-axis" />
          <CartesianGrid className="cartesian-grid" />
          <Tooltip className="chart-tooltip" />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#00bcd4"
            yAxisId={0}
            className="chart-line"
            dot={false}
            activeDot={true}
            legendType="circle"
          />
          
        </LineChart>
      </div>
    </div>
  );
}

export default CryptoInfo;
