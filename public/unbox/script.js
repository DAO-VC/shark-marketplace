const revealBatch = {
  "inputs": [
    {
      "internalType": "uint256[]",
      "name": "tokenIds",
      "type": "uint256[]"
    },
    {
      "internalType": "string[]",
      "name": "uris",
      "type": "string[]"
    }
  ],
  "name": "revealBatch",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}
let list = [];
let provider = null;
let contract = null;

// filters
setInterval(()=>{
  const ids = document.getElementById("filters").value.split(",").map(x=>Number(x));
  for(let id of ids){
    let item = list.find(x=>x.id===id);
    if(item) item.checked = false;
  }
  updateList();
},1000)

async function onLoad() {
  await window.ethereum.request({method: 'eth_requestAccounts'});
  provider = new ethers.providers.Web3Provider(window.ethereum);
  
  console.log("connected")
}

async function onClickLoad(all=false) {
  const skip = document.getElementById("skip").value
  const limit = document.getElementById("limit").value
  const server = ""
  list = (await axios.get(`${server}/api/nft/shark/boxes/list?limit=${limit}&skip=${skip}`)).data;
  console.log(list)
  if(!list.length) {
    list=[];
    document.getElementById("button_load").style.display="none"
    document.getElementById("list").innerHTML = "<div style='color:red'>Нет нераспакованных сундуков! Попробуйте через несколько часов...</div>"
  } else this.updateList();
}


function updateList(){
  if(!list.length)return;
  document.getElementById("list").innerHTML = `
<input id='checkAll' onchange='checkAll()' ${list[0].checked===true?'checked':''} type="checkbox">
    Выбрать все <br/><br/>
    <div>ДАТА | ID | КОШЕЛЕК </div>`
    +list.map((item, i) => `
        <div id="line${i}" style="display: flex; overflow: hidden; min-width: 420px">
            <div style="width: 110px; display: flex; overflow: hidden">${i+1}
            <input type="checkbox" onchange='checkOne(${i})'  ${item?.checked===true?'checked':''}> `
            + " <b>"+item.id + "</b></div> <a target='_blank' href='https://ipfs.io/ipfs/" + item?.metaURI?.split("ipfs://")[1] + "'>" + item?.owner + "</a></div>").join("");
}

function checkOne(i){
  list[i].checked = !list[i].checked;
  this.updateList();
}

function checkAll(){
  const oneSelected = list.find(x=>x.checked);
  const allLines = document.querySelectorAll('[id^=line]')
  if(oneSelected){
    for(let line of allLines)line.checked=false;
    for(let i=0;i<list.length;i++) list[i].checked=false;
  }else{
    for(let line of allLines)line.checked=true;
    for(let i=0;i<list.length;i++) list[i].checked=true;
  }
  // console.log(list)
  this.updateList();
}

async function upload() {
  if (!list.length) return alert("Список пустой...")
  const filtredList =  [list.filter((x,i)=>list[i].checked).map(x=>x.id),list.filter((x,i)=>x.checked).map(x=>x.metaURI.replace("ipfs://",""))]
  if (!filtredList[0].length) return alert("Ничего не выбрано...")
  const tokenAddress = document.getElementById("token-address").value;
  if (tokenAddress.length !== 42) return alert("Неверный адрес токена!")
  contract = new ethers.Contract(tokenAddress, [revealBatch], provider.getSigner());
  
  try {
    console.log(filtredList[0], filtredList[1])
    await contract.revealBatch(filtredList[0], filtredList[1])
  } catch (err) {
    console.log(err);
    document.location.reload();
  }
}
