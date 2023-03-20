const {ethers} = require("ethers")
const config = require('dotenv').config()
const {ADMIN_PRIVATE_KEY, TOKEN_ADDRESS} = config.parsed;
const abi = [{"inputs": [{"internalType": "address[]", "name": "receivers", "type": "address[]"}, {"internalType": "uint256[]", "name": "amounts", "type": "uint256[]"}], "name": "distribute", "outputs": [], "stateMutability": "nonpayable", "type": "function"}]
const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org");
const signer = new ethers.Wallet(ADMIN_PRIVATE_KEY, provider)
const token = new ethers.Contract(TOKEN_ADDRESS, abi, signer)

// Массив кошельков получателей и сумм для них
const receivers = [
  {
    address: "0x3aEbB461954E39e3bEf44022bA534a35704dcF0F",
    tokens: 1
  }
];

token.distribute(receivers.map(x => x.address), receivers.map(x => ethers.utils.parseEther(x.tokens.toString())))
  .then(result => {
    console.log("Distribute result:", result)
  })

