let selectedTab = 0;
let vesting = false;
let account = null;
let provider = null;
let balance = 0;

function onLoad() {
  onClickTab(0).then()
  init().then();
  onVestingChange()
}


async function init() {
  try {
    if (!window.ethereum) return;
    document.getElementById("metamask").onclick = async function () {
      await window.ethereum.request({method: 'eth_requestAccounts'})
      onload();
    }
    await window.ethereum.request({method: 'eth_requestAccounts'})
    
    document.getElementById("send").style.display = "block";
    document.getElementById("metamask").style.display = "none";
    const accounts = await ethereum.request({method: 'eth_requestAccounts'});
    account = accounts[0];
    document.getElementById("account").innerText = "Ваш кошелек: " + account;
    
    provider = new ethers.providers.Web3Provider(window.ethereum);
    
    onChangeTokenAddress().then();
  } catch (err) {
    alert(err)
    document.getElementById("send").style.display = "none";
    
  }
}

async function onClickTab(tab = 0) {
  selectedTab = tab;
  document.getElementById("tab0").classList.remove('selected');
  document.getElementById("tab1").classList.remove('selected');
  document.getElementById("block0").style.display = "none"
  document.getElementById("block1").style.display = "none"
  
  document.getElementById("tab" + selectedTab).classList.add('selected');
  document.getElementById("block" + selectedTab).style.display = "block"
  onChangeValueOrAddresses();
}

function onVestingChange() {
  vesting = document.getElementById("vesting").checked;
  document.getElementById("vesting-params").style.display = vesting ? "block" : "none"
  console.log()
}

async function onChangeTokenAddress() {
  
  const tokenAddress = document.getElementById("token-address").value;
  if(tokenAddress.length!==42)return;
  
  console.log("onChangeAddress")
  const balanceOf = {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function",
    "payable": false,
    "constant": true,
  }
  const contract = new ethers.Contract(tokenAddress, [balanceOf], provider.getSigner())
  console.log("balanceOf", tokenAddress, account, provider)
  balance = await contract.balanceOf(account)
  document.getElementById("balance").innerText = "Ваш баланс: " + balance;
  
}

function getAddressesAndValues(){
  let addresses = [];
  let values = [];
  if(selectedTab===0){
    addresses = document.getElementById("input-address0").value.split("\n")
    values = addresses.map(()=>Number(document.getElementById("input-value").value))
  } else if(selectedTab===1){
    addresses = document.getElementById("input-address1").value.split("\n").map(x=>x.split(":")[0])
    values = document.getElementById("input-address1").value.split("\n").map(x=>x.split(":")[1])
  }
  return {addresses, values}
}

function onChangeValueOrAddresses(){
  let totalTokens = getAddressesAndValues().values.reduce((a,b)=>Number(a)+Number(b),0) || 0;
  document.getElementById("total-tokens").innerText="Общая сумма токенов: "+totalTokens;
}

async function onClickSend() {
  const tokenAddress = document.getElementById("token-address").value;
  if (tokenAddress.length !== 42) return alert("Неверный адрес токена!")
  const now = Math.floor(new Date().getTime() / 1000)
  const vestingStart = new Date(document.getElementById("vesting-start").value).getTime() / 1000;
  const vestingCliff = new Date(document.getElementById("vesting-cliff").value).getTime() / 1000;
  const vestingVesting = new Date(document.getElementById("vesting-vesting").value).getTime() / 1000;
  const vestingRevocable = document.getElementById("vesting-revocable").checked;
  console.log({now, vestingStart, vestingCliff, vestingVesting, vestingRevocable})
  
  
  if(vesting) {
    if (!vestingStart || !vestingCliff || !vestingVesting || vestingStart < now || vestingCliff < now || vestingVesting < now) {
      return alert("Проверьте даты!")
    }
  }
  
 
  let {addresses, values} = getAddressesAndValues();
  let totalTokens = values.reduce((a,b)=>Number(a)+Number(b),0);
  if(totalTokens>balance)return alert("Недостаточно токенов на вашем кошельке")
  if(addresses.find(x=>x.length!==42))return alert("Один из адресов содержит неверный формат!")
  if(addresses.find((x,i)=>addresses.find((y,j)=>j!==i && x===y))) return alert("Некоторые адреса дублируются! Удалите повторы и попробуйте заново!")
  if(values.findIndex(x=>(x===0))>-1)return alert("Нельзя отправлять 0");
  console.log(addresses,values)
  
  const distribute = {"inputs": [{"internalType": "address[]", "name": "receivers", "type": "address[]"}, {"internalType": "uint256[]", "name": "amounts", "type": "uint256[]"}], "name": "distribute", "outputs": [], "stateMutability": "nonpayable", "type": "function"};
  const distributeVesting = {"inputs": [{"internalType": "address[]", "name": "receivers", "type": "address[]"}, {"internalType": "uint256[]", "name": "amounts", "type": "uint256[]"}, {"internalType": "uint64", "name": "start", "type": "uint64"}, {"internalType": "uint64", "name": "cliff", "type": "uint64"}, {"internalType": "uint64", "name": "vesting", "type": "uint64"}, {"internalType": "bool", "name": "revokable", "type": "bool"}], "name": "distributeVesting", "outputs": [], "stateMutability": "nonpayable", "type": "function"};
  
  
  const contract = new ethers.Contract(tokenAddress, [distribute,distributeVesting], provider.getSigner());
  const valuesParsed= values.map(x=>ethers.utils.parseEther(x+''));
  if(!vesting){
    await contract.distribute(addresses, valuesParsed)
  }else{
    await contract.distributeVesting(addresses,valuesParsed, vestingStart, vestingCliff, vestingVesting, vestingRevocable);
  }
  
}
