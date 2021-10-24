import React, { useEffect, useState } from "react";
import "./cards.css";
import { Card, Menu, Dropdown, Tooltip } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import cardIcon from "../../../images/cardIcon.gif";
import Modal from '@material-ui/core/Modal';
import cardImg2 from "../../../images/cardImg2.webp";
import ApproveToken from '../../../modals/approve'

import EnterDownPayment from '../../../modals/downPayment/index';

const Cards = ({ item }) => {
  console.log(item);
  const [resellModal, setResellModal] = useState(false);
  const [approveModal, setapproveModal] = useState(false);

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


  const handleApproveOpen = () => {
    setapproveModal(true);
  };

  const handleApproveClose = () => {
    setapproveModal(false);
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
        <img alt="card " className="cardImg" src={cardImg2} />
        <p className="cardName">#15881- {item ?.description}</p>
      
      
        <div className="nft-btn-cont">
            <button className="nft-approve" onClick={handleApproveOpen}>Approve</button>
        
            <button className="nft-approve" onClick={handleOpenResellModal}>DownPayment</button>
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

      <Modal
        open={approveModal}
        onClose={handleApproveClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ApproveToken data={item} />
      </Modal>
    </>
  );
};

export default Cards;
