import React, { useCallback, useState } from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import { useStore } from "../../context/GlobalState";
import TextField from "@material-ui/core/TextField";
import { sendPeriodicPaymentAsync } from '../../store/asyncActions';
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

const SentPeriodicPayment = ({ data, handleCloseResellModal }) => {
  const [{ web3, accounts, contract, colletralContract }, dispatch] = useStore();
  let [etherAmount, setEtheAmount] = useState("");

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const sendRequest = useCallback(async () => {
    // loadBlockchain(dispatch);
  }, []);

  const onSubmit = async () => {
    let currencyAddress = data.currency_address;
    let tradeId = data.nfT_collateral_id
  
    // let price = etherAmount * 10e17
    let price = web3.utils.toWei(etherAmount, 'ether');

    price = price.toString()
    console.log("price", typeof price)
    try {


      let receipt = await sendPeriodicPaymentAsync(colletralContract, accounts, tradeId,
        price, currencyAddress)
      if (receipt && receipt.status) {

      }


    }
    catch (error) {
      console.log("error", error);
    }
  };

  console.log("datadatadatadata", data)





  return (
    <div>
      <>
        <div style={modalStyle} className={classes.paper}>
          <h1 style={{ color: "black" }}>SEND PERIODIC PAYMENT </h1>

          {
            Math.sign(etherAmount) != "-1" ?
              "" :
              <h6 className="maga-para" style={{ color: "red" }}>*Negative Value not Allowed*</h6>
          }

          <TextField type="number"
            className="text-field" placeholder="Amount" label="Enter Amount" type="number" value={etherAmount} onChange={(e) => setEtheAmount(e.target.value)}
          />
          <button className="buy-btn" onClick={onSubmit}
          >
            sent periodic payment
            </button>


        </div>
      </>

    </div>
  );
};

export default SentPeriodicPayment;
