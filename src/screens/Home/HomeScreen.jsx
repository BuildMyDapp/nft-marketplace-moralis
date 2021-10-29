import React, { useEffect, useState } from "react";
import slide1 from "../../images/slide1.png";
import video1 from "../../images/1.webm";
import video2 from "../../images/2.webm";
import video3 from "../../images/3.webm";
import video4 from "../../images/4.webm";
import video5 from "../../images/5.webm";
import Cards from "./card/Cards";
import data from "../dummy";
import "./home.css";
import { useStore } from '../../context/GlobalState';

import Moralis from 'moralis';
const HomeScreen = () => {
  const [{ web3, accounts, apiUrl,contract,colletralContract }, dispatch] = useStore();

  const [NFTData, setNFTData] = useState([])

  useEffect(async () => {

    setNFTData(data)

  }, [])
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

export default HomeScreen;
