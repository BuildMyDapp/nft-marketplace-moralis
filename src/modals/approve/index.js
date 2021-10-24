import React, { useCallback, useState } from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import { useStore } from "../../context/GlobalState";
import TextField from "@material-ui/core/TextField";
import { claimNftAsync } from '../../store/asyncActions';
import 'dotenv'
import {ERC20} from '../../contract/ERC20';
import {COLLECTRAL_ADDRESS} from '../../contract/colletral'



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

const ApproveToken = ({ data }) => {
  const [{ web3, accounts }, dispatch] = useStore();
  let [etherAmount, setEtheAmount] = useState("");
  let [address, setaddress] = useState("");

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);


  const onSubmit = async () => {
    let price = web3.utils.toWei(etherAmount, 'ether');

    price = price.toString()
    console.log("price", typeof price)
    try {

      const contract = new web3.eth.Contract(ERC20, address); 
      console.log("contract",contract.methods)
      let receipt = await contract.methods.approve(COLLECTRAL_ADDRESS,price).send({from:accounts[0]})
      


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
          <h1 style={{ color: "black" }}>Approve  </h1>
 
          <TextField type="text"
            className="text-field" placeholder="Amount" label="Enter Currency Address" type="text" value={address} onChange={(e) => setaddress(e.target.value)}
          />
                <TextField type="text"
            className="text-field" placeholder="Amount" label="Enter amount" type="text" value={etherAmount} onChange={(e) => setEtheAmount(e.target.value)}
          />
          <button className="buy-btn" onClick={onSubmit}
          >
            Approve
            </button>


        </div>
      </>

    </div>
  );
};

export default ApproveToken;
