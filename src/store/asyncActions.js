import { setupWeb3, setupContract, setupColletralContract, setNetwork, addEthereumAccounts, addTransaction, web3LoadingError } from "./actions";
import Web3 from "web3";
import { ERC721_ABI, ERC721_ADDRESS } from '../contract/ERC721';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { COLLECTRAL_ABI, COLLECTRAL_ADDRESS } from '../contract/colletral';

export const loadBlockchain = async (dispatch) => {
    try {
        console.log("Web3 = ", Web3);
        console.log("Web3.givenProvider = ", Web3.givenProvider);
        dispatch(setNetwork(Web3.givenProvider.chainId));
        if (Web3.givenProvider) {

            // if (Web3.givenProvider && Web3.givenProvider.chainId == 0x38	) {
            window.ethereum.on('accountsChanged', function (accounts) {
                dispatch(addEthereumAccounts(accounts));
            });

            const web3 = new Web3(Web3.givenProvider);
            await Web3.givenProvider.enable();
            dispatch(setupWeb3(web3));
            const contract = new web3.eth.Contract(ERC721_ABI, ERC721_ADDRESS);
            dispatch(setupContract(contract));
            const colletralContract = new web3.eth.Contract(COLLECTRAL_ABI, COLLECTRAL_ADDRESS);
            dispatch(setupColletralContract(colletralContract))
            const accounts = await web3.eth.getAccounts();
            dispatch(addEthereumAccounts(accounts));
            console.log("contract", contract);
            console.log("contract", contract.methods)
        }
        else {
            dispatch(web3LoadingError("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"))
        }
    }
    catch (error) {
        console.log("Error in loading Web3 = ", error);
        if (error.code === 4001) {

            dispatch(web3LoadingError(error.message));
        }
    }
}

export const loadWalletConnect = async (dispatch) => {
    try {
        const provider = new WalletConnectProvider({

            rpc: {
                56: "https://bsc-dataseed.binance.org/",
            },
            rpcUrl: "https://bsc-dataseed.binance.org/",
            chainId: 56
        });
        if (provider) {
            await provider.enable();

            const web3 = new Web3(provider);
            console.log(web3)

            // await Web3.givenProvider.enable();
            dispatch(setupWeb3(web3));
            const contract = new web3.eth.Contract(ERC721_ABI, ERC721_ADDRESS);
            console.log("this is for contract", contract)

            dispatch(setupContract(contract));
            const accounts = await web3.eth.getAccounts();
            console.log("this is for accounts", accounts)
            dispatch(addEthereumAccounts(accounts));
            console.log("contract = ", contract);
            console.log("contract.methods = ", contract.methods);
        }
        else {
            dispatch(web3LoadingError("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"))
        }
    }
    catch (error) {
        console.log("Error in loading Web3 = ", error);
        if (error.code === 4001) {

            dispatch(web3LoadingError(error.message));
        }
    }
}



export const liftNftColetralAsync = async (colletralContract, accounts, amount, paymentPeriod,
    downPaymentPeriod, duration, currency_address, NFTdata) => {
    try {
        let token_id = NFTdata.token_id;
        let token_address = NFTdata.token_address;
        paymentPeriod = paymentPeriod.toString();
        downPaymentPeriod = downPaymentPeriod.toString();
        duration = duration.toString()
        let receipt = await colletralContract.methods.listNftCollateral(token_id, amount, paymentPeriod,
            downPaymentPeriod, duration, token_address,
            currency_address).send({ from: accounts[0] })
        return receipt;
    }
    catch (error) {
        console.log("error", error)
    }
}


export const unLiftNftColetralAsync = async (colletralContract,
    accounts, tradeId) => {
    try {
        let receipt = await colletralContract.methods.unListNftCollateral(tradeId).send({ from: accounts[0] })
        return receipt

    }
    catch (error) {
        console.log("error", error)
    }
}


export const payDownPaymentAndFeeAsync = async (colletralContract,
    accounts, tradeId, price, currencyAddress) => {
        console.log("price",price)
    try {
        let receipt = await colletralContract.methods.payDownPaymentAndFee(tradeId, currencyAddress, price).send({ from: accounts[0] })
        return receipt

    }
    catch (error) {
        console.log("error", error)
    }
}


export const sendPeriodicPaymentAsync = async (colletralContract,
    accounts, tradeId, price, currencyAddress) => {


    console.log(tradeId, price, currencyAddress)
    try {
        let receipt = await colletralContract.methods.sendPeriodicPayment(tradeId, currencyAddress, price).send({ from: accounts[0] })
        return receipt
    }
    catch (error) {
        console.log("error", error)
    }
}



export const claimNftAsync = async (colletralContract,
    accounts, tradeId) => {
    try {
        let receipt = await colletralContract.methods.claimNft(tradeId).send({ from: accounts[0] })
        return receipt
    }

    catch (error) {
        console.log("error", error)
    }
}



export const ownerClaimNftAsync = async (colletralContract,
    accounts, tradeId) => {
    try {
        let receipt = await colletralContract.methods.ownerClaimNft(tradeId).send({ from: accounts[0] })
        return receipt
    }

    catch (error) {
        console.log("error", error)
    }
}