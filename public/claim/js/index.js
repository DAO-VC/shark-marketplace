
const abiNFT = [
  {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {
      "internalType": "uint256",
      "name": "index",
      "type": "uint256"
    }],
    "name": "tokenOfOwnerByIndex",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
  ]
  
const abiGameNFTSeller = [ {
  "inputs": [
    {
      "components": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "string[]",
          "name": "uris",
          "type": "string[]"
        }
      ],
      "internalType": "struct GameNFTSeller.ClaimTokenMeta[]",
      "name": "claimTokenMetas",
      "type": "tuple[]"
    },
    {
      "internalType": "bytes",
      "name": "signature",
      "type": "bytes"
    }
  ],
  "name": "claim",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}]

const addresses = {
  nft: "0xdC0d03700ba7e85fDc94BC1804Ed59B3b582c12E",
  artifact: "0x8f16a8C14c9C5680bC38CB2B62634008aFb96208",
  gameNft: "0xC906995c9e7Da6F7d43aD49b41f07fad911B4681",
  gameNftSeller: "0x68CbB6d95446eF1CA0b6C47ce9795a7C8EB3a845",
  
}

async function claimIt(ids){
  const res = (await fetch("/api/nft/meta/claim/approve",{
    method: "POST", headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }, body: JSON.stringify({
      buyerAddress: account,
      tokenIds: ids
    })
  }))
  const {claimTokensMeta, signature} = await res.json();
  
  console.log({claimTokensMeta, signature})
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const seller = new ethers.Contract(addresses.gameNftSeller, abiGameNFTSeller, await provider.getSigner());
  const fin = await seller.connect(await provider.getSigner()).claim(claimTokensMeta, signature);
  console.log(fin)
}

async function start() {
  await window.ethereum.request({method: 'eth_requestAccounts'})
  const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
  account = accounts[0];
  console.log('account',account)
  
  const tokens = await first10UserTokens(account);
  console.log(tokens)
  let code = ''
  for(let token of tokens){
    code+=(`<input type="button" style="margin: 5px; padding: 5px;" value="claim game tokens from collectible token ${token}" onclick="claimIt([${token}])"><br>`)
  }
  document.getElementById("nfts").innerHTML=code+`<input type="button" style="margin: 5px; padding: 5px; background: #ff8888" value="claim game tokens from  ALL collectible tokens" onclick="claimIt([${tokens}])"><br>`
}


async function balanceOf(address) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const nft = new ethers.Contract(addresses.nft, abiNFT, provider.getSigner());
  return await nft.balanceOf(address)
}

// Получение 10 первых токенов
async function first10UserTokens(address) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  console.log(addresses.nft, abiNFT)
  const nft = new ethers.Contract(addresses.nft, abiNFT, provider.getSigner());
  
  const balance = Number(await balanceOf(address));
  console.log("balance", balance)
  return await Promise.all(
    Array.from(new Array(balance).keys()).slice(0, 10).map(x => nft.tokenOfOwnerByIndex(address, x))
  )
}
