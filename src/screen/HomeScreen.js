import React, { useEffect, useState } from "react";
import Axios from "axios";
import Crypto from "../components/crypto";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

function HomeScreen() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [sortedCoins, setSortedCoins] = useState([]);

  useEffect(() => {
    Axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    ).then((response) => {
      setListOfCoins(response.data);
      console.log(response);
    });
  }, []);

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  const sortCoinsByChange = () => {
    const sorted = [...listOfCoins].sort((a, b) => {
      if (a.price_change_percentage_24h > b.price_change_percentage_24h) {
        return -1;
      }
      if (a.price_change_percentage_24h < b.price_change_percentage_24h) {
        return 1;
      }
      return 0;
    });
    const top10 = sorted.slice(0, 10);
    setSortedCoins(top10);
  };

  const allCrypto = () => {
    return setSortedCoins([]);
  };

  return (
    <div>
      <Navbar />
      <div>
        <div>
          <input
            className="crypto-input"
            type="text"
            placeholder="Enter the name of a cryptocurrency"
            onChange={(event) => {
              setSearchWord(event.target.value);
            }}
            onClick={allCrypto}
          />
          <button onClick={sortCoinsByChange} className="topten">
            Top 10 of the day
          </button>
        </div>
        {(sortedCoins.length ? sortedCoins : filteredCoins).map((coin) => {
          return (
            <Link to={`/info/${coin.id}`} className="default-style">
              <Crypto
                key={coin.id}
                name={coin.name}
                price={coin.current_price}
                image={coin.image}
                symbol={coin.symbol}
                change={coin.price_change_percentage_24h}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default HomeScreen;

