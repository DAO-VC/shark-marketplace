const {ethers} = require("ethers")
const config = require('dotenv').config()
const {ADMIN_PRIVATE_KEY, TOKEN_ADDRESS} = config.parsed;
const abi = [{"inputs": [{"internalType": "address[]", "name": "receivers", "type": "address[]"}, {"internalType": "uint256[]", "name": "amounts", "type": "uint256[]"}, {"internalType": "uint64", "name": "start", "type": "uint64"}, {"internalType": "uint64", "name": "cliff", "type": "uint64"}, {"internalType": "uint64", "name": "vesting", "type": "uint64"}, {"internalType": "bool", "name": "revokable", "type": "bool"}], "name": "distributeVesting", "outputs": [], "stateMutability": "nonpayable", "type": "function"}]
const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org");
const signer = new ethers.Wallet(ADMIN_PRIVATE_KEY, provider)
const token = new ethers.Contract(TOKEN_ADDRESS, abi, signer)

// Вестинг
const start = Math.floor(new Date("2022-02-22 11:11").getTime() / 1000);
const cliff = Math.floor(new Date("2022-02-22 11:11").getTime() / 1000);
const vesting = Math.floor(new Date("2022-02-22 11:11").getTime() / 1000);
const revokable = true;

// Массив кошельков получателей и сумм для них
const receivers = [
  {
    address: "0x3aEbB461954E39e3bEf44022bA534a35704dcF0F",
    tokens: 1
  }
];

token.distributeVesting(
  receivers.map(x => x.address),
  receivers.map(x => ethers.utils.parseEther(x.tokens.toString())),
  start,
  cliff,
  vesting,
  revokable
).then(result => {
  console.log("Distribute result:", result)
})

