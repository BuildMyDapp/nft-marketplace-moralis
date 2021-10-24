import React, { useCallback, useState } from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import { useStore } from "../../context/GlobalState";
import TextField from "@material-ui/core/TextField";
import { claimNftAsync } from '../../store/asyncActions';
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

const ClaimNft = ({ data }) => {
  const [{ web3, accounts, contract, colletralContract }, dispatch] = useStore();
  let [etherAmount, setEtheAmount] = useState("");
  let [tradeId, settradeId] = useState("");
  let [currencyAddress, setcurrencyAddress] = useState("");

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);


  const onSubmit = async () => {
    // let price = etherAmount * 10e17
    let price = web3.utils.toWei(etherAmount, 'ether');

    price = price.toString()
    console.log("price", typeof price)
    try {


      let receipt = await claimNftAsync(colletralContract, accounts, tradeId
      )


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
          <h1 style={{ color: "black" }}>Claim Nft </h1>
 
          <TextField type="text"
            className="text-field" placeholder="Amount" label="Enter trade id" type="text" value={tradeId} onChange={(e) => settradeId(e.target.value)}
          />
          <button className="buy-btn" onClick={onSubmit}
          >
            Claim
            </button>


        </div>
      </>

    </div>
  );
};

export default ClaimNft;
