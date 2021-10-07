import React from "react";
import "./cards.css";
import { Card, Menu, Dropdown, Tooltip } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import cardIcon from "../../images/cardIcon.gif";
import cardIcon2 from "../../images/cardIcon2.gif";
import cardIcon3 from "../../images/cardIcon3.gif";
import cardImg from "../../images/cardImg1.svg";
const Cards = ({ item }) => {
  console.log(item);

  const menu = () => (
    <>
      <Menu className="cardMenu">
        <Menu.Item className="cardMenuItem">
          <a target="_blank" rel="noopener noreferrer">
            Refresh
          </a>
        </Menu.Item>
        <Menu.Item className="cardMenuItem">
          <a target="_blank" rel="noopener noreferrer">
            Share
          </a>
        </Menu.Item>
        <Menu.Item className="cardMenuItem">
          <a target="_blank" rel="noopener noreferrer">
            Report
          </a>
        </Menu.Item>
      </Menu>
    </>
  );
  return (
    <>
      <Card
        title={
          <>
            <ul className="mainCardIcon">
              <li>
                <Tooltip
                  // className="tooltipsImg"
                  placement="topLeft"
                  title={"Collection :" + item?.creator_name}
                  overlayInnerStyle={{
                    width: "170px",
                    background: "white",
                    color: "black",
                    // marginBottom: "0.5rem",
                    borderRadius: "5px",
                    textAlign: "center",
                    fontSize: "1rem",
                    fontWeight: "650",
                  }}
                >
                  <img src={cardIcon} alt="" height="35" />
                </Tooltip>
              </li>

              <li>
                <Tooltip
                  placement="topLeft"
                  title={"Owner :" + item?.creator_name}
                  overlayInnerStyle={{
                    width: "170px",
                    background: "white",
                    color: "black",

                    borderRadius: "5px",
                    textAlign: "center",
                    fontSize: "1rem",
                    fontWeight: "650",
                  }}
                >
                  <img src={cardIcon2} alt="" height="35" />
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  placement="topLeft"
                  title={"Collection :" + item?.creator_name}
                  overlayInnerStyle={{
                    width: "170px",
                    background: "white",
                    color: "black",
                    // marginBottom: "0.5rem",
                    borderRadius: "5px",
                    textAlign: "center",
                    fontSize: "1rem",
                    fontWeight: "650",
                  }}
                >
                  <img src={cardIcon3} alt="" height="35" />
                </Tooltip>
              </li>
            </ul>
          </>
        }
        extra={
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            placement="bottomCenter"
            arrow
          >
            <EllipsisOutlined className="menuIcon" />
          </Dropdown>
        }
      >
        <img alt="card " className="cardImg" src={cardImg} />
        <p className="cardName">#15881- {item?.description}</p>
        <p className="etherium">
          {item?.price} ETH <span>1/1</span>
        </p>
        <div className="placeBid">
          <p>Place a bid</p>
          <div>
            <i className="fas fa-heart"></i>&nbsp; 6
          </div>
        </div>
      </Card>
    </>
  );
};

export default Cards;
