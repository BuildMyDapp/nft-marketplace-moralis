import React from "react";
import slide1 from "../../images/slide1.png";
import video1 from "../../images/1.webm";
import video2 from "../../images/2.webm";
import video3 from "../../images/3.webm";
import video4 from "../../images/4.webm";
import video5 from "../../images/5.webm";
// import video3 from "../images/3.webm";
import "./home.css";
const HomeScreen = () => {
  return (
    <>
      <div className="row mt-5">
        <div className="col-lg-4 col-sm-12  col-md-6">
          <div className="card">
            <img src={slide1} alt="" className="imgslideLeft img-fluid " />
          </div>
        </div>
        <div className="col-lg-8 col-sm-12 col-md-6">
          <div className="row">
            <div className="col-lg-4  col-md-6  col-sm-12 padClass rightHeroVid">
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
            <div className="col-lg-4    col-md-6 col-sm-12  padClass rightHeroVid">
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
            <div className="col-lg-4     col-md-6 col-sm-12  padClass rightHeroVid">
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
            <div className="col-lg-4     col-md-6 col-sm-12  padClass rightHeroVid">
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
            <div className="col-lg-4     col-md-6 col-sm-12 padClass rightHeroVid">
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
            <div className="col-lg-4     col-md-6 col-sm-12 padClass rightHeroVid">
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
    </>
  );
};

export default HomeScreen;
