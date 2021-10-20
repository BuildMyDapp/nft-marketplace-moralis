import React, { useEffect, useState } from "react";
import "./cards.css";
import { Card, Menu, Dropdown, Tooltip } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import cardIcon from "../../../images/cardIcon.gif";
import Modal from '@material-ui/core/Modal';

import EnterDownPayment from '../../../modals/downPayment/index';

const Cards = ({ item }) => {
  console.log(item);
  const [resellModal, setResellModal] = useState(false);

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

  const handleOpenResellModal = () => {
    setResellModal(true);
  };

  const handleCloseResellModal = () => {
    setResellModal(false);
  };

  return (
    <>
      <Card
        title={
          <>
            <ul className="mainCardIcon">
              <li>
                <Tooltip
                  placement="topLeft"
                  title={"Collection :" + item ?.creator_name}
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
                  title={"Owner :" + item ?.creator_name}
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
                  <img src={item.image} alt="" height="35" />
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
        <img alt="card " className="cardImg" src={item.image} />
        <p className="cardName">#15881- {item ?.description}</p>
        <p className="etherium">
          {item ?.price} ETH <span>1/1</span>
        </p>
        <div className="placeBid">
          <p>Place a bid</p>
          <div>
            <i className="fas fa-heart"></i>&nbsp; 6
          </div>
          <div>
            <button onClick={handleOpenResellModal}>DownPayment</button>
          </div>
        </div>
      </Card>
      <Modal
        open={resellModal}
        onClose={handleCloseResellModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <EnterDownPayment data={item} handleCloseResellModal={handleCloseResellModal} />
      </Modal>
    </>
  );
};

export default Cards;
