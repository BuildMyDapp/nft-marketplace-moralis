import React from "react";
import "./listnft.css";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";

const ListNft = () => {
  const { Search } = Input;

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );
  const onSearch = (value) => console.log(value);

  return (
    <>
      <div className="row">
        <div className="col-lg-6  offset-lg-3   ">
          <Search
            placeholder="Enter Token id"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            className="NftSearch"
          />
        </div>
      </div>
    </>
  );
};

export default ListNft;
