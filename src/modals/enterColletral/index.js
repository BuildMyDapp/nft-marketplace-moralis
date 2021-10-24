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

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const sendRequest = useCallback(async () => {
    // loadBlockchain(dispatch);
  }, []);

  const onSubmit = async () => {
    let ownerAddress = accounts[0];
    let amount = etherAmount * 10e17
    amount = amount.toString()
    let token_id = data.token_id;
    console.log("token_id", token_id)

    console.log("amount", typeof amount)
    console.log("onSubmitcolletralContract", colletralContract.methods)
    try {
      let handleApiTrigger = () => {
        dispatch(makeApiTrigger(!apiTrigger));
        handleCloseResellModal()
      }
      let nfT_colletral_id = await colletralContract.methods.tradeCounter().call();
      console.log("nfT_colletral_id", nfT_colletral_id)

      let receipt = await liftNftColetralAsync(colletralContract, accounts, amount, paymentPeriod,
        downPaymentPeriod, duration, currencyAddress, data)
      if (receipt) {
        let token_address = data.token_address;

        let currency_address = currencyAddress
        let name = data.name
        let description = data.description;
        let image = data.image;
        let payment_period = paymentPeriod;
        let down_payment_period = downPaymentPeriod;
        let image_uri = data.image;
        let owner_address = accounts[0]
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${process.env.REACT_APP_SIGN}`);
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify({
            name, description,
            image, token_address, token_id,
            payment_period, down_payment_period, duration, amount, image_uri, owner_address, nfT_colletral_id,
            currency_address
          })
        };
        let fetchNftData = await fetch(`${apiUrl}save_nft`, requestOptions);

        fetchNftData = await fetchNftData.json();

      }




    }
    catch (error) {
      console.log("error", error);
      dispatch(makeApiTrigger(!apiTrigger));
    }
  };

  console.log("datadatadatadata", data)




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
          <button className="buy-btn" onClick={onSubmit}
          >
            Collateral now
            </button>


        </div>
      </>

    </div>
  );
};

export default EnterColletral;
