// import web3
// connect with ganache
// get balance of an account
// convert wei into ether
// transfer ether from one account to another

let Web3 = require('web3');
let web3 = new Web3('HTTP://127.0.0.1:7545');    // connect with ganache RPC

// get account balance of Account 1
web3.eth.getBalance("0x31113887DB1b5Fe58765B1d79318d06814E3877f").then(function(result) {
    console.log(result);
})

// convert account balance to ether 
web3.eth.getBalance("0x31113887DB1b5Fe58765B1d79318d06814E3877f").then(function(result) {
    console.log(web3.utils.fromWei(result,"ether"));
})


// doing in other way

let main = async function() {
    // show account 1 balance
   let balance =  await web3.eth.getBalance("0x31113887DB1b5Fe58765B1d79318d06814E3877f")
   console.log('balance of account1: ', web3.utils.fromWei(balance,"ether"),"ether")
   // show account 2 balance
   balance =  await web3.eth.getBalance("0x2522670571EC9DAD7F11b71e26D75c34bd589B7d")
   console.log('balance of account2: ', web3.utils.fromWei(balance,"ether"),"ether")

   // transfer ether from account 2 to account 1
   await web3.eth.sendTransaction({
       from: "0x2522670571EC9DAD7F11b71e26D75c34bd589B7d",
       to: "0x31113887DB1b5Fe58765B1d79318d06814E3877f",
       value: web3.utils.toWei('5',"ether")
   })

    // show account 1 balance after transaction
    balance =  await web3.eth.getBalance("0x31113887DB1b5Fe58765B1d79318d06814E3877f")
    console.log('balance of account1: ', web3.utils.fromWei(balance,"ether"),"ether")
    // show account 2 balance after transaction
    balance =  await web3.eth.getBalance("0x2522670571EC9DAD7F11b71e26D75c34bd589B7d")
    console.log('balance of account2: ', web3.utils.fromWei(balance,"ether"),"ether")
}

main()