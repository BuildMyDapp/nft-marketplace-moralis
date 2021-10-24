import React, { useEffect, useState } from "react";
import Cards from "./card/Cards";
import data from "../dummy";
import { useStore } from '../../context/GlobalState';


const FrontMoney = () => {

  const [{ web3, accounts, apiUrl, contract, colletralContract }, dispatch] = useStore();

  const [NFTData, setNFTData] = useState([])

  useEffect(async () => {
    setNFTData(data)
  }, [web3, accounts])
  return (
    <>
      <div className="row my-5">
        {NFTData.map((item) => (
          <div className="col-md-4 col-lg-3 col-sm-6">
            <Cards item={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default FrontMoney;
