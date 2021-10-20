import React, { useEffect, useState } from "react";
import Cards from "./card/Cards";
import data from "../dummy";
import Moralis from 'moralis';

import { useStore } from '../../context/GlobalState';

const Balance = () => {
  const [allNftData, setAllNftData] = useState()
  const [{ web3, accounts, apiUrl,contract,colletralContract }, dispatch] = useStore();

  useEffect(async () => {
    const serverUrl = "https://zrgs9ntgp1xg.grandmoralis.com:2053/server";
    const appId = "ehjdZ3SrJBc8mvotS9zIVpJ3ERQ1hXLolg9rJo2d";
    // let t = await Moralis.start({serverUrl,appId})
    Moralis.initialize("ehjdZ3SrJBc8mvotS9zIVpJ3ERQ1hXLolg9rJo2d", "", "sO7IJveC1wGqenEclYGF8He9mdAqkqBASB34l5bp");
    Moralis.serverURL = 'https://zrgs9ntgp1xg.grandmoralis.com:2053/server'
    // console.log("lol",t)
    Moralis.authenticate().then(async function (user) {
      console.log("etherAddress", user.get("ethAddress"))
      const users = Moralis.User.current();
      console.log("user", users)
      Moralis.start({ serverUrl, appId });
      const options = { address: "0x32aa08334e255e8c44b92599e2b43c9587fd5568", chain: "rinkeby" };
      const metaData = await Moralis.Web3API.token.getNFTMetadata(options);
      console.log("metaData", metaData)

      const usernftBalance = await Moralis.Web3.getNFTs({ chain: "rinkeby" })
      console.log("usernftBalance", usernftBalance)
      console.log("metaData", metaData)
      let nftArray = []
      // for(let i = 0;  i < usernftBalance.length; i++) {
      for (let i = 0; i < usernftBalance.length; i++) {
        let fetchData = await fetch(usernftBalance[i].token_uri)
        fetchData = await fetchData.json();
        nftArray.push(fetchData);
        console.log("dsdsad", fetchData)
      
      }
      setAllNftData(nftArray)
      
    })
  }, [])
  console.log("colletralContract", colletralContract)

  return (
    <>
      <div className="row my-5">
        {allNftData?.map((item) => (
          <div className="col-md-4 col-lg-3 col-sm-6">
            <Cards item={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Balance;
