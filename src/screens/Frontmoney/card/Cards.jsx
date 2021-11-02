import React, { useState } from "react";
import "./cards.css";
import { Card, Menu, Dropdown, Tooltip } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import cardIcon from "../../../images/cardIcon.gif";
import cardImg2 from "../../../images/cardImg2.webp";

import Modal from '@material-ui/core/Modal';
import { claimNftAsync, unLiftNftColetralAsync } from '../../../store/asyncActions';
import { useStore } from "../../../context/GlobalState";

import SentPeriodicPayment from '../../../modals/periodicPayment/index';
import OwnerClaimNft from '../../../modals/ownerClaim/index';
import ClaimNft from '../../../modals/claim/index';

const Cards = ({ item }) => {
  const [{ web3, accounts, contract, colletralContract }, dispatch] = useStore();

  console.log(item);
  const [resellModal, setResellModal] = useState(false);
  const [claimModal, setclaimModal] = useState(false);
  const [ownerClaimModal, setownerClaimModal] = useState(false);

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


  //claim
  const ClaimOpen = () => {
    setclaimModal(true);
  };

  const ClaimClose = () => {
    setclaimModal(false);
  };


  //owner claim
  const ownerClaimOpen = () => {
    setownerClaimModal(true);
  };

  const ownerClaimClose = () => {
    setownerClaimModal(false);
  };


  // const ClaimNft = async () => {
  //   try {
  //     let receipt = await claimNftAsync(colletralContract, accounts, 4,
  //       item
  //     )
  //   }
  //   catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const handleUnlistNft = async () => {
    try {
      let tradeId = item.nfT_colletral_id;
      let receipt = await unLiftNftColetralAsync(colletralContract, accounts, tradeId)
    }
    catch (error) {
      console.log("error", error)
    }
  }
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
                  <img src={cardImg2} alt="" height="35" />
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

        <div className="placeBid">


          <div>
            <button className="nft-btn-2" onClick={handleOpenResellModal}>Send Periodic</button>
            <button className="nft-btn-2" onClick={ClaimOpen}
            >
              Claim Nft
            </button>
          </div>

          <br />
          <button className="nft-btn-2" onClick={handleUnlistNft}
          >
            Unlist Nft
            </button>
        </div>
      </Card>
      <Modal
        open={resellModal}
        onClose={handleCloseResellModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <SentPeriodicPayment data={item} handleCloseResellModal={handleCloseResellModal} />
      </Modal>

      {/* claim */}
      <Modal
        open={claimModal}
        onClose={ClaimClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ClaimNft data={item} />
      </Modal>

      {/* owner claim */}
      <Modal
        open={ownerClaimModal}
        onClose={ownerClaimClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <OwnerClaimNft data={item} ownerClaimClose={ownerClaimClose} />
      </Modal>
    </>
  );
};

export default Cards;
