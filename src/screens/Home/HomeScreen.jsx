import React from "react";
import slide1 from "../../images/slide1.png";
import video1 from "../../images/1.webm";
import video2 from "../../images/2.webm";
import video3 from "../../images/3.webm";
import video4 from "../../images/4.webm";
import video5 from "../../images/5.webm";
// import ExploreSection from "../Explore/ExploreSection";
import Cards from "../../component/card/Cards";
import data from "../dummy";
import "./home.css";
// import { useMoralisWeb3Api } from "react-moralis";
import  Moralis from 'moralis';
const HomeScreen = () => {
  // const { authenticate, isAuthenticated, user } = useMoralis();
  // const Web3Api = useMoralisWeb3Api()

  React.useEffect(async()=>{
const serverUrl = "https://zrgs9ntgp1xg.grandmoralis.com:2053/server";
const appId = "ehjdZ3SrJBc8mvotS9zIVpJ3ERQ1hXLolg9rJo2d";
// let t = await Moralis.start({serverUrl,appId})
Moralis.initialize("ehjdZ3SrJBc8mvotS9zIVpJ3ERQ1hXLolg9rJo2d", "", "sO7IJveC1wGqenEclYGF8He9mdAqkqBASB34l5bp");
Moralis.serverURL = 'https://zrgs9ntgp1xg.grandmoralis.com:2053/server'    
// console.log("lol",t)
    Moralis.authenticate().then(async function (user) {
      console.log("etherAddress",user.get("ethAddress"))
      const users = Moralis.User.current();
      console.log("user",users)
      Moralis.start({ serverUrl, appId });
      const options = { address: "0x6e1283f5f1689f264d6e89956b8653a07ccad100ee05df283c8ee679f87765ce", chain: "rinkeby" };
      const metaData = await Moralis.Web3API.token.getNFTMetadata(options);
      console.log("metaData",metaData)

    })
},[])
  return (
    <>
      <div className="row mt-5">
        <div className="col-lg-4 col-sm-12  col-md-5    ">
          <img
            src={slide1}
            className="imgslideLeft "
            alt="..."
            height="750"
            width="1000"
          />
        </div>
        <div className="col-lg-8 col-sm-12 col-md-7">
          <div className="row">
            <div className="col-lg-6 col-xl-4 col-md-6  col-sm-12 padClass rightHeroVid">
              <div className="card">
                <p className="text-white">PHYGITAL TOY</p>
                <video
                  playsInline
                  autoPlay
                  loop
                  src={video2}
                  className="rightVideo"
                ></video>
              </div>
            </div>
            <div className="col-lg-6  col-xl-4   col-md-6 col-sm-12  padClass rightHeroVid">
              <div className="card">
                <p className="text-white">PHYGITAL TOY</p>
                <video
                  playsInline
                  autoPlay
                  loop
                  src={video3}
                  className="rightVideo"
                ></video>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4     col-md-6 col-sm-12  padClass rightHeroVid">
              <div className="card">
                <p className="text-white">PHYGITAL TOY</p>
                <video
                  autoPlay
                  loop
                  src={video3}
                  className="rightVideo"
                ></video>
              </div>
            </div>
            <div className="col-lg-6  col-xl-4    col-md-6 col-sm-12  padClass rightHeroVid">
              <div className="card">
                <p className="text-white">PHYGITAL TOY</p>
                <video
                  autoPlay
                  loop
                  src={video4}
                  className="rightVideo"
                ></video>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4   col-md-6 col-sm-12 padClass rightHeroVid">
              <div className="card">
                <p className="text-white">PHYGITAL TOY</p>
                <video
                  autoPlay
                  loop
                  src={video5}
                  className="rightVideo"
                ></video>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4   col-md-6 col-sm-12 padClass rightHeroVid">
              <div className="card">
                <p className="text-white">PHYGITAL TOY</p>
                <video
                  autoPlay
                  loop
                  src={video5}
                  className="rightVideo"
                ></video>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-5">
        {data.map((item) => (
          <div className="col-md-4 col-lg-3 col-sm-6">
            <Cards item={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeScreen;
