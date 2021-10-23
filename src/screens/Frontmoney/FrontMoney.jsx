import React, { useEffect, useState } from "react";
import Cards from "./card/Cards";
import data from "../dummy";
import { useStore } from '../../context/GlobalState';


const FrontMoney = () => {

  const [{ web3, accounts, apiUrl,contract,colletralContract }, dispatch] = useStore();

  const [NFTData, setNFTData] = useState([])

  useEffect(async () => {
    if(web3 && accounts && accounts.length != 0){
      let dp_address = accounts[0];
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        dp_address
      })

      
  };
  let fetchNftData = await fetch(`${apiUrl}list_front_nft`,requestOptions)
  fetchNftData = await fetchNftData.json();
  fetchNftData = fetchNftData ? fetchNftData.data : fetchNftData;
  fetchNftData = fetchNftData.reverse()
  setNFTData(fetchNftData)

}
  }, [web3,accounts])
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
