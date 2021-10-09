import 'dotenv'


export const handleAdminLogin = async(name,password) => {
    try {
        console.log("API_URL", process.env.REACT_APP_API_URL)
        // let m = await getBalance(web3,accounts);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name, description, network, poolId, status, attribute,
            price, image_uri, external_link, slug, owner_address
          })
        };
        fetch(`${process.env.REACT_APP_API_URL}login`, requestOptions)
          .then(response => response.json())
          .then(data => console.log(data));
        // let n = await deployContract(web3,"10000","lol",18,"m",accounts,apiRes.data.bytecode,apiRes.data.abi)
      }
      catch (error) {
        console.log("handle balance error", error)
      }
}