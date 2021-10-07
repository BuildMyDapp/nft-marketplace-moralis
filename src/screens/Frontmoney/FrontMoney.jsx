import React from "react";
import Cards from "../../component/card/Cards";
import data from "../dummy";
const FrontMoney = () => {
  return (
    <>
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

export default FrontMoney;
