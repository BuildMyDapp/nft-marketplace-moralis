import React, { useEffect, useState } from "react";
import "./cards.css";
import { Card, Menu, Dropdown, Tooltip } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import cardIcon from "../../../images/cardIcon.gif";
import Modal from '@material-ui/core/Modal';
import cardImg2 from "../../../images/cardImg2.webp";
import {ERC721_ABI} from '../../../contract/ERC721';
import EnterColletral from '../../../modals/enterColletral/index';
import {COLLECTRAL_ADDRESS} from '../../../contract/colletral'
import { useStore } from '../../../context/GlobalState';

const Cards = ({ item }) => {
  console.log(item);
  const [resellModal, setResellModal] = useState(false);
  const [{ web3, accounts }, dispatch] = useStore();

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
    console.log("this nft",item)
    setResellModal(true);
  };

  const handleCloseResellModal = () => {
    setResellModal(false);
  };

  const handleApprove = async() => {
    try{
      const contract = new web3.eth.Contract(ERC721_ABI, item.token_address);
      console.log("contractcontract",contract)
      console.log("contractcontract",item.token_id,COLLECTRAL_ADDRESS)

      let receipt = await contract.methods.approve(COLLECTRAL_ADDRESS,item.token_id).send({ from: accounts[0] })

    }
    catch(error){
      console.log("error",error)
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
        <p className="cardName">address- {item ?.token_address}</p>
        <p>Token id {item?.token_id}</p>

        <div className="placeBid">
        
{/*         
          <div>
            <button className="nft-btn" onClick={handleApprove}>Approve</button>
          </div> */}

          <div>
            <button className="nft-btn" onClick={handleOpenResellModal}>NFT collateral</button>
          </div>
        </div>
      </Card>
      <Modal
        open={resellModal}
        onClose={handleCloseResellModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <EnterColletral data={item} handleCloseResellModal={handleCloseResellModal} />
      </Modal>
    </>
  );
};

export default Cards;
