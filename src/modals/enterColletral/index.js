import React, { useEffect, useCallback, useState } from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import { Fade, Modal, Backdrop } from "@material-ui/core";
import { useStore } from "../../context/GlobalState";
import TextField from "@material-ui/core/TextField";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { liftNftColetralAsync } from '../../store/asyncActions';
import { makeApiTrigger } from '../../store/actions';
import 'dotenv'
import { ERC721_ABI } from '../../contract/ERC721'
import { COLLECTRAL_ADDRESS } from '../../contract/colletral'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 440,
    height: 400,
    backgroundColor: "white",
    border: "2px none #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
    borderRadius: "30px 30px 30px 30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    '@media (max-width: 420px)': {
      width: '370px',
      height: '380px'
    },

    '@media (max-width: 380px)': {
      width: '330px',
      height: '365px'
    },

  },
  textField: {
    width: "100%"
  },
  btn: {
    background: "#1077b3",
    borderRadius: "20px",
    color: "white",
    width: "100%",
    padding: "10px 10px",
    fontSize: "22px",
    marginTop: "10px",
    cursor: "pointer"
  }
}));

const EnterColletral = ({ data, handleCloseResellModal }) => {
  const [qrCode, setQrCode] = useState(false);
  const [{ web3, accounts, contract, apiUrl, apiTrigger, colletralContract }, dispatch] = useStore();
  let [etherAmount, setEtheAmount] = useState("");
  let [paymentPeriod, setPaymentPeriod] = useState("");
  let [downPaymentPeriod, setDownPaymentPeriod] = useState("");
  let [duration, setDuration] = useState("");
  let [currencyAddress, setcurrencyAddress] = useState("");
  const [approveToggle, setApproveToggle] = useState(false)
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const sendRequest = useCallback(async () => {
    // loadBlockchain(dispatch);
  }, []);

  const onSubmit = async () => {
    let price = etherAmount * 10e17
    price = price.toString()
    let token_id = data.token_id;


    console.log("onSubmitcolletralContract", colletralContract.methods)
    try {

      let nfT_colletral_id = await colletralContract.methods.tradeCounter().call();
      console.log("nfT_colletral_id", nfT_colletral_id)

      let receipt = await liftNftColetralAsync(colletralContract, accounts, price, paymentPeriod,
        downPaymentPeriod, duration, currencyAddress, data)

        if (receipt && receipt.status) {
      let token_address = data.token_address;
      let currency_address = currencyAddress
      let name = data.name
      let payment_period = paymentPeriod;
      let down_payment_period = downPaymentPeriod;
      let owner_address = accounts[0]
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${process.env.REACT_APP_SIGN}`);
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          name, token_address, token_id,
          payment_period, down_payment_period, duration, price, owner_address, nfT_colletral_id,
          currency_address
        })
      };
      let fetchNftData = await fetch(`${apiUrl}save_collateral_nft`, requestOptions);

      fetchNftData = await fetchNftData.json();

      }


    }
    catch (error) {
      console.log("error", error);
      dispatch(makeApiTrigger(!apiTrigger));
    }
  };

  console.log("datadatadatadata", data)


  const handleApprove = async () => {
    try {
      let token_address = data.token_address;
      let token_id = data.token_id;
      const contractErc721 = new web3.eth.Contract(ERC721_ABI, token_address);
      let receipt = await contractErc721.methods.approve(COLLECTRAL_ADDRESS, token_id).send({ from: accounts[0] })
      setApproveToggle(true);
    }
    catch (error) {

    }
  }

  return (
    <div>
      <>
        <div style={modalStyle} className={classes.paper}>
          <h1 style={{ color: "black" }}>Collateral your NFT </h1>

          <TextField type="number"
            className="text-field" placeholder="Amount" label="Enter Amount" type="number" value={etherAmount} onChange={(e) => setEtheAmount(e.target.value)}
          />
          <TextField type="number"
            className="text-field" placeholder="paymentPeriod" label="paymentPeriod" type="number" value={paymentPeriod} onChange={(e) => setPaymentPeriod(e.target.value)}
          />
          <TextField type="number"
            className="text-field" placeholder="downPaymentPercent" label="downPaymentPercent" type="number" value={downPaymentPeriod} onChange={(e) => setDownPaymentPeriod(e.target.value)}
          />
          <TextField type="number"
            className="text-field" placeholder="duration" label="duration" type="number" value={duration} onChange={(e) => setDuration(e.target.value)}
          />
          <TextField type="text"
            className="text-field" placeholder="currencyAddress" label="currencyAddress" type="text" value={currencyAddress} onChange={(e) => setcurrencyAddress(e.target.value)}
          />
          {
            approveToggle ?
              <button className="buy-btn" onClick={onSubmit}
              >
                Collateral now
              </button>
              :
              <button className="buy-btn" onClick={handleApprove}
              >
                Approve
                </button>
          }



        </div>
      </>

    </div>
  );
};

export default EnterColletral;
