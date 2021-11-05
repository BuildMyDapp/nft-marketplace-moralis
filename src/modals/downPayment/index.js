import React, { useCallback, useState } from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import { useStore } from "../../context/GlobalState";
import TextField from "@material-ui/core/TextField";
import { payDownPaymentAndFeeAsync } from '../../store/asyncActions';
import { makeApiTrigger } from '../../store/actions';
import 'dotenv'
import { ERC20 } from '../../contract/ERC20';
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

const EnterDownPayment = ({ data, handleCloseResellModal }) => {
  const [qrCode, setQrCode] = useState(false);
  const [{ web3, accounts, contract, apiUrl, apiTrigger, colletralContract }, dispatch] = useStore();
  let [etherAmount, setEtheAmount] = useState("");
  const [approveToggle, setApproveToggle] = useState(false)
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const sendRequest = useCallback(async () => {
    // loadBlockchain(dispatch);
  }, []);
  let currencyAddress = data.currency_address;
  let tradeId = data.nfT_collateral_id

  console.log("data", data)

  const onSubmit = async () => {
    let ownerAddress = accounts[0];
    let price = web3.utils.toWei(etherAmount, 'ether');
    price = price.toString()
    console.log("price", typeof price)
    console.log("onSubmitcolletralContract", colletralContract.methods)
    try {


      let receipt = await payDownPaymentAndFeeAsync(colletralContract, accounts, tradeId, price,
        currencyAddress)
      if (receipt && receipt.status) {
        let dp_address = accounts[0];
        let id = data.id;
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${process.env.REACT_APP_SIGN}`);
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify({
            dp_address, id
          })
        };
        let fetchNftData = await fetch(`${apiUrl}dp_update`, requestOptions);

        fetchNftData = await fetchNftData.json();

      }

    }
    catch (error) {
      console.log("error", error);
      dispatch(makeApiTrigger(!apiTrigger));
    }
  };

  const handleApprove = async () => {
    let amount = 300 * 10 ** 18;
    amount = amount.toString()

    console.log("amount", amount)
    try {

      const contract = new web3.eth.Contract(ERC20, currencyAddress);
      console.log("contract", contract.methods)
      let receipt = await contract.methods.approve(COLLECTRAL_ADDRESS, amount).send({ from: accounts[0] })
      setApproveToggle(true)


    }
    catch (error) {
      console.log("error", error);
    }
  };


  return (
    <div>
      <>
        <div style={modalStyle} className={classes.paper}>
          <h1 style={{ color: "black" }}>Collateral your NFT </h1>

          {
            Math.sign(etherAmount) != "-1" ?
              "" :
              <h6 className="maga-para" style={{ color: "red" }}>*Negative Value not Allowed*</h6>
          }

          <TextField type="number"
            className="text-field" placeholder="Amount" label="Enter Amount" type="number" value={etherAmount} onChange={(e) => setEtheAmount(e.target.value)}
          />

          {
            approveToggle ?
              <button className="buy-btn" onClick={onSubmit}
              >
                Pay Down Payment
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

export default EnterDownPayment;
