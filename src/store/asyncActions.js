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
// export const buyTokensAsync = async (beneficiary, accounts, contract, etherValue, dispatch) => {
//     console.log("before transaction");
//     const price = etherValue.toString(); //change it
//     const receipt = await contract.methods
//         .buyTokens(beneficiary)
//         .send({ from: accounts[0], value: price });
//     console.log("after  transaction ", receipt);
// }
export const buyNft = async (web3, contract, accounts, amount, id, handleNavigate,
    nftDetails, apiUrl) => {
    console.log("before transaction", contract, accounts, amount, id);
    const myHeaders = new Headers();
    console.log("handleNftBuy", nftDetails.owner_address)
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${process.env.REACT_APP_SIGN}`);
    try {
        const price = amount.toString();
        const receipt = await contract.methods
            .buy(id)
            .send({ from: accounts[0], value: price }).on('transactionHash', async (hash) => {
                console.log('Received txHash: ', hash);

                let det = await web3.eth.getTransaction(hash);
                console.log('Receiveddeth: ', det);
                let ownerAddress = accounts[0];
                let id = nftDetails.id
                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify({
                        id, ownerAddress
                    })
                };
                let fetchNftData = await fetch(`${apiUrl}buy_nft`, requestOptions);
                handleNavigate()
            });

        console.log("receipt", receipt);
        return true;
    }
    catch (error) {
        console.log("error", error)
        return false;

    }
}


export const mintNft = async (web3, contract, accounts, amount, token_id,
    apiUrl, name) => {
    console.log("before transaction", contract, accounts, amount, token_id, name);

    try {
        const price = amount.toString();
        let txhashes;
        let tokenIdSupply = await contract.methods
            .totalSupply().call();

        const receipt = await contract.methods
            .mint(token_id, price, 1)
            .send({ from: accounts[0] }).on('transactionHash', async (hash) => {
                // ...
                console.log('Received txHash: ', hash);

                let det = await web3.eth.getTransaction(hash);
                console.log('Receiveddeth: ', det);

                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Authorization', `Bearer ${process.env.REACT_APP_SIGN}`);
                let token_id = tokenIdSupply
                console.log("tokenIdSupply", tokenIdSupply)

                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify({
                        token_id, name
                    })
                };
                let submitForm = await fetch(`${apiUrl}update_nft_mint_status`, requestOptions)
                submitForm = await submitForm.json();
                console.log("submitForm", submitForm);

            })
        console.log("receiptsss", receipt)
        return receipt;
    }
    catch (error) {
        console.log("error", error)
        return false;
    }
}



export const liftNftColetralAsync = async (web3, colletralContract, accounts, amount, paymentPeriod,
    downPaymentPeriod, duration, currency_address, apiUrl, NFTdata) => {
    try {
        let nfT_colletral_id = await colletralContract.methods.tradeCounter().call();
        console.log("nfT_colletral_id", nfT_colletral_id)
        let token_id = NFTdata.token_id;
        let token_address = NFTdata.token_address;
        console.log("token_address", token_address, "token_id", token_id)
        paymentPeriod = paymentPeriod.toString();
        downPaymentPeriod = downPaymentPeriod.toString();
        duration = duration.toString()
        let receipt = await colletralContract.methods.listNftCollateral(token_id, amount, paymentPeriod,
            downPaymentPeriod, duration, token_address,
            currency_address).send({ from: accounts[0] }).on('transactionHash', async (hash) => {
                let name = NFTdata.name
                let description = NFTdata.description;
                let image = NFTdata.image;
                let payment_period = paymentPeriod;
                let down_payment_period = downPaymentPeriod;
                let image_uri = NFTdata.image;
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
            });

        return receipt;
    }
    catch (error) {
        console.log("error", error)
    }
}


export const unLiftNftColetralAsync = async (web3, colletralContract,
    accounts, tradeId, handleApiTrigger, apiUrl, data) => {
    try {
        let receipt = await colletralContract.methods.unListNftCollateral(tradeId).send({ from: accounts[0] }).on('transactionHash', async (hash) => {
            let id = data.id
            let ownerAddress = accounts[0];
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', `Bearer ${process.env.REACT_APP_SIGN}`);
            // const requestOptions = {
            //     method: 'POST',
            //     headers: myHeaders,
            //     body: JSON.stringify({
            //         id, ownerAddress, price
            //     })
            // };
            // let fetchNftData = await fetch(`${apiUrl}save_nft`, requestOptions);
            handleApiTrigger()

            // fetchNftData = await fetchNftData.json();
        });
    }
    catch (error) {
        console.log("error", error)
    }
}


export const payDownPaymentAndFeeAsync = async (web3, colletralContract,
    accounts, tradeId, apiUrl, data, price, currencyAddress) => {
    try {
        let receipt = await colletralContract.methods.payDownPaymentAndFee(tradeId, currencyAddress, price).send({ from: accounts[0] }).on('transactionHash', async (hash) => {
            // let id = data.id
            // console.log("data",data)
            // let dp_address = accounts[0];
            // const myHeaders = new Headers();
            // myHeaders.append('Content-Type', 'application/json');
            // myHeaders.append('Authorization', `Bearer ${process.env.REACT_APP_SIGN}`);
            // const requestOptions = {
            //     method: 'POST',
            //     headers: myHeaders,
            //     body: JSON.stringify({
            //         id, dp_address, price
            //     })
            // };
            // let fetchNftData = await fetch(`${apiUrl}pay_down_payment`, requestOptions);
 

            // fetchNftData = await fetchNftData.json();
        });
    }
    catch (error) {
        console.log("error", error)
    }
}


export const sendPeriodicPayment = async (web3, colletralContract,
    accounts, tradeId, handleApiTrigger, apiUrl, data, price, currencyAddress) => {
    try {
        let receipt = await colletralContract.methods.sendPeriodicPayment(tradeId, currencyAddress, price).on('transactionHash', async (hash) => {
            let id = data.id
            let ownerAddress = accounts[0];
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', `Bearer ${process.env.REACT_APP_SIGN}`);
            // const requestOptions = {
            //     method: 'POST',
            //     headers: myHeaders,
            //     body: JSON.stringify({
            //         id, ownerAddress, price
            //     })
            // };
            // let fetchNftData = await fetch(`${apiUrl}resell_nft`, requestOptions);
            handleApiTrigger()

            // fetchNftData = await fetchNftData.json();
        });
    }
    catch (error) {
        console.log("error", error)
    }
}



export const claimNftAsync = async (web3, colletralContract,
    accounts, tradeId, handleApiTrigger, apiUrl, data) => {
    try {
        let receipt = await colletralContract.methods.claimNft(tradeId).on('transactionHash', async (hash) => {
            let id = data.id
            let ownerAddress = accounts[0];
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', `Bearer ${process.env.REACT_APP_SIGN}`);
            // const requestOptions = {
            //     method: 'POST',
            //     headers: myHeaders,
            //     body: JSON.stringify({
            //         id, ownerAddress, price
            //     })
            // };
            // let fetchNftData = await fetch(`${apiUrl}resell_nft`, requestOptions);
            handleApiTrigger()

            // fetchNftData = await fetchNftData.json();
        });
    }
    catch (error) {
        console.log("error", error)
    }
}
