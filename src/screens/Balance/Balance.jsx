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

      const usernftBalance = await Moralis.Web3.getNFTs({ chain: "rinkeby" })

      console.log("metaData", usernftBalance)
      let nftArray = []
      for (let i = 5; i < usernftBalance.length; i++) {
        let neo = {}
        neo['token_id'] = usernftBalance[i].token_id
        neo['token_address'] = usernftBalance[i].token_address
        neo['name'] = usernftBalance[i].name

        nftArray.push(neo);
        console.log("dsdsad", neo)
      
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
