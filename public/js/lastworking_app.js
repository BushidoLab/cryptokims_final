// const BN = require('bn.js');

var Cryptokims = {};

Cryptokims.NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
Cryptokims.TX_HASHES = "_Cryptokims_Hashes_";
Cryptokims.TX_DIV_ID = "#pendingTransactions";
Cryptokims.EVENT_START_BLOCK = 3914490;
Cryptokims.ETHER_CONVERSION = {USD: 230.99999};

Cryptokims.currentKimIndex = -1;

Cryptokims.gasPrice = 400000;

Cryptokims.KimState = {
  web3Queried: false,
  web3ready: false,
  web3UsingInfura: false,
  web3NotPresent: false,
  accountQueried: false,
  accountUnlocked: false,
  account: null,
  accountHasBalance: false,
  accountBalanceInWei: 0,
  accountBalanceInEther: 0,
  transactions: [],
  isOwned: true,
  isOwner: false,
  canBuy: false,
  forSale: false,
  hasBid: false,
  ownsBid: false,
  kimData: {
    loadComplete: false,
    kimIndex: -1,
    owner: Cryptokims.NULL_ADDRESS,
    offerValue: 0,
    onlySellTo: Cryptokims.NULL_ADDRESS,
    bidder: Cryptokims.NULL_ADDRESS,
    bidValue: 0,
  },
  events: {
    allSorted: [],
    transfers: [],
    bids: [],
    bidsWithdrawn: [],
    bought: [],
    offeredForSale: [],
    claimed: [],
  },
  loadingDone: {
    owner: false,
    bid: false,
    offer: false,
    eventsClaimed: false
  }
};

Cryptokims.ABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "cfoAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "ceoAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "tokenIndex",
				"type": "uint256"
			},
			{
				"name": "sellPrice",
				"type": "uint256"
			}
		],
		"name": "sellToken",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "kimsCreated",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newCEO",
				"type": "address"
			}
		],
		"name": "setCEO",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newCOO",
				"type": "address"
			}
		],
		"name": "setCOO",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "howMany",
				"type": "uint256"
			}
		],
		"name": "releaseSomeKims",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newCFO",
				"type": "address"
			}
		],
		"name": "setCFO",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdrawBalance",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "kimIndex",
				"type": "uint256"
			}
		],
		"name": "cancelKimAuction",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "tokenIndex",
				"type": "uint256"
			}
		],
		"name": "buyKim",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "kims",
		"outputs": [
			{
				"name": "kimIndex",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "kimsOnAuction",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "averageKimSalePrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "cooAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "sellerCut",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tokenToOwner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tokenAuction",
		"outputs": [
			{
				"name": "isForSale",
				"type": "bool"
			},
			{
				"name": "tokenIndex",
				"type": "uint256"
			},
			{
				"name": "seller",
				"type": "address"
			},
			{
				"name": "sellPrice",
				"type": "uint256"
			},
			{
				"name": "startedAt",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "pendingWithdrawals",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "tokenIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "sellPrice",
				"type": "uint256"
			}
		],
		"name": "TokenAuctionCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "tokenIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "sellPrice",
				"type": "uint256"
			}
		],
		"name": "TokenAuctionCompleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdrawal",
		"type": "event"
	}
]

window.addEventListener('load', function() {
  console.log("LOAD EVENT");
  var width = $(window).width();
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    console.log("- Found web3");
    // window.web3 = new Web3(web3.currentProvider);
    web3 = new Web3(web3.currentProvider);
    window.web3 = web3;
  } else {
    console.log("- Didn't find web3, using fallback");
    window.web3 = new Web3(new Web3.providers.HttpProvider("https://localhost:8545"));
    Cryptokims.KimState.web3UsingInfura = true;
  }
  Cryptokims.KimState.web3Queried = true;

  startApp();
  init();
});

var init = function() {
  // $.getJSON('../kims.json', function(data) {
  //   console.log(data);
  //   var kimsRow = $('#kimsRow');
  //   var kimTemplate = $('#kimTemplate');
  //
  //   for (i = 0; i < data.length; i ++) {
  //     kimTemplate.find('.panel-title').text(data[i].name);
  //     kimTemplate.find('img').attr('src', data[i].picture);
  //     kimTemplate.find('.btn-adopt').attr('data-id', data[i].id);
  //
  //     kimsRow.append(kimTemplate.html());
  //   }
  // });

}
var startApp = function () {

    if (web3) {
      console.log("Found web3.");
      // var contractAddress = "0x1a6e1cea86dd2e64cabd19e427e3ba0f1e9ed9e3";
      // var contractAddress = "0x9cdeb2fb357f11b54553861d43549ab132c4eee5"; // OLD WORKING ONE
      var contractAddress = "0x4c45f1e8e9367d744c993d8cc123ee110325b24f"
      var MyContract = web3.eth.contract(Cryptokims.ABI);
      Cryptokims.kimContract = MyContract.at(contractAddress);
      Cryptokims.KimState.web3ready = true;

      if (typeof CryptokimsContractLoadedCallback !== 'undefined' && Cryptokims.KimState.web3UsingInfura) {
        CryptokimsContractLoadedCallback();
      }
      youOwnTheseKims();
      getAllKims();
      getAllKimsOnAuction();
      getUserKimsOnSale();
      whoOwnsThatKim();
      currentUserKims();
      getUserAccount();
      ethereumPanel();
      hideAccountTab()


      // var test = Cryptokims.kimContract.totalSupply(function(error, result){
      //   if(!error) {
      //     console.log(result.toString());
      //     // setData('total_supply', result);
      //   } else {
      //     console.log(error);
      //   }
      // });
      //
      // var test2 = Cryptokims.kimContract.kimsRemainingToAssign(function(error, result){
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log(result);
      //     // setData('kims_remaining', result);
      //   }
      // })

      let events = Cryptokims.kimContract.allEvents({fromBlock: 1615044, toBlock: 'latest'});
      events.watch(function(error, result){
        if (!error) {
          let v = JSON.parse(JSON.stringify(result))['transactionHash'];

          //------------------------------------YO THIS PART IS IMPORTANT
          // console.log(`HERE IT IS: ${result}`);
          // console.log(result);
          // setData('kim_transaction', v);
        } else {
          console.log(error);
        }
      });


      var accountInterval = setInterval(function() {
        web3.eth.getAccounts(function(err, accounts) {
          // console.log(accounts);
          if (accounts[0] !== Cryptokims.KimState.account) {
            console.log("Metamask account changed: "+accounts[0]);
            Cryptokims.KimState.account = accounts[0];
            web3.eth.defaultAccount = accounts[0];
            if (Cryptokims.KimState.account === undefined) {
              Cryptokims.KimState.accountUnlocked = false;
            } else {
              // Cryptokims.refreshPendingWidthdrawals();
              // Cryptokims.showKimActions(${kimIndex});

              Cryptokims.KimState.accountUnlocked = true;
            }

            if (typeof CryptokimsContractLoadedCallback !== 'undefined') {
              CryptokimsContractLoadedCallback();
            }
          }
          Cryptokims.KimState.accountQueried = true;
        });
      }, 100);

      // Cryptokims.restoreTransactions();
      setInterval(Cryptokims.checkTransactions, 1000);

      $.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD', function(data) {
        Cryptokims.ETHER_CONVERSION.USD = data.USD;
        console.log("Value of ether now " + Cryptokims.ETHER_CONVERSION.USD);
      })
    }
  }

function setInitialOwner(identifier) {

    let index = $(identifier).data('id');
    console.log(index);
    let currentUser = web3.eth.coinbase;

    let txnObject = {
      from: currentUser,
      gas: '400000'
    }

    Cryptokims.kimContract.setInitialOwner.sendTransaction(currentUser, index, txnObject, function(error, result){
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        // setData('get_kim1', result);
      }
    })

    markClaimed(index);
  }
function markClaimed(index) {
    Cryptokims.kimContract.kimNoLongerForSale.call(index);
    $('.panel-pet').eq(index).find('button').text('Success').attr('disabled', true);
  }
function transferToSam() {
    let currentUser = web3.eth.coinbase;

    let txnObject = {
      from: currentUser,
      gas: '400000'
    }

    Cryptokims.kimContract.transferKim.sendTransaction("0x7A7700800778527C6B0A73955F57ecBaD0A9e646", txnObject, 1, function(error, result){
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        console.log("SUCCESSFULLY SENT TOKEN");
      }
    })
  }
function createKim(){
    // console.log($("#kim_name").text());
    let kim_name = $('#kim_name').val();
    let currentUser = web3.eth.coinbase;
    console.log(kim_name);

    let txnObject = {
      from: currentUser,
      gas: '400000'
    };

    Cryptokims.kimContract._createKim.sendTransaction(kim_name, txnObject, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        // setData('get_kim1', result);
      }
    });
  }
function sellKim() {
    // let kim_sell_id = id;
    let kim_sell_id = $('#kim_sell_index').val();
    // let kim_sell_price = new BN($('#kim_sell_price').val);
    let kim_sell_price = $('#kim_sell_price').val();
    kim_sell_price = kim_sell_price*1000000000000000000
    // let kim_sell_price = sellPrice;
    let currentUser = web3.eth.coinbase;
    let txnObject = {
      from: currentUser,
      gas: '400000'
    };

    Cryptokims.kimContract.kimAuction.sendTransaction(kim_sell_id, kim_sell_price, txnObject, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    });
  }
var our_cut_total = 0;
function buyKim(id, price) {
    let kim_buy_id = id;
    let kim_buy_price = price;
    // let kim_buy_id = $("#kim_buy_index").val();
    // let kim_buy_price = $("#kim_buy_price").val();
    let currentUser = web3.eth.coinbase;

    // let our_cut = kim_buy_price/2;
    // kim_buy_price = kim_buy_price + our_cut;
    //
    // our_cut_total = our_cut_total + our_cut;

    let txnObject = {
      from: currentUser,
      gas: '400000',
      value: price
    };

    Cryptokims.kimContract.buyKim.sendTransaction(kim_buy_id, txnObject, function(error, result){
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    });

  }

  function kimsForSaleModal(index, value){
    var modal = $('.modal-header');
    modal.html("");
    modal.append(
      `
        <div class="modal-header">
          <h2 class="modal-title" id="sellKimModalLabel">You are about to purchase Kim: #${index}</h2>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img class="img-responsive center-block" src="https://gateway.ipfs.io/ipfs/Qmc89pU3J1MkBdnJsaYTii7wHWkavRsSDp43nDr1Dp7q7S/${index}.png"></img>
          <br>
          <p>Selling for: <strong>${(value/1000000000000000000).toPrecision(6)}ETH</strong></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Decline</button>
          <button onClick="buyKim(${index},${value})" type="button" class="btn btn-primary">PURCHASE</button>
        </div>
      `
    );
  }


  function getAllKims() {
      // var kimsRow = $('#my_kims_row');
      // var kimTemplate = $('#kimTemplate');
      let totalKims = totalKimsCreated();
      console.log(totalKims);
      // var kimList = $(".kim-list");
      var kimList = $(".kim-list");
      var kimItems = $(".placeholder-kim");
      // console.log(`total kims: ${totalKims}`);
      for (let i = 0; i < 10; i++){
        Cryptokims.kimContract.kims(i, function(error, result) {
            if (error) {
              // console.log(error);
              // console.log('error in get all kims');
            } else {
              // $('#kim-title').text(result);
              // onclick="logMe(${i});" add that to img for logme fuctuion
              Cryptokims.kimContract.kimsOnSale.call(i, function(error,result) {
                if (error) {
                    console.log(error);
                } else {
                  if (result[0] === true){ //true so the kim is for sale.
                    // add this to the if statement so that users kims are not shown for sale : && result[2] !== currentUser
                    // result[0] -> true or false if for sale or not
                    // result[1] -> index
                    // result[2] -> seller address
                    // result[3] -> sell price in wei
                    // result[4] -> block number???
                    console.log(`here is the result from kimsonSale ${result}`);
                    kimList.append(
                      `
                      <div class="col" style="float: left;width: 250px;margin: 1em;">
                        <div class="panel panel-primary">
                          <div class="panel-heading text-center"><h3>Kim ID: #${result[1]}</h3></div>
                          <div class="panel-body">

                            <img class="img-responsive center-block" onClick="giveModalValueHome(${i})"  data-toggle="modal" data-target="#exampleModalCenter" src="https://gateway.ipfs.io/ipfs/Qmc89pU3J1MkBdnJsaYTii7wHWkavRsSDp43nDr1Dp7q7S/${i}.png" alt="">
                          </div>
                          <div class="panel-footer">
                            <p>Sell Price: ${(result[3]/1000000000000000000).toPrecision(6)} ETH</p>
                          </div>
                        </div>
                      </div>
                      `
                    );
                  } else {
                    if(result[0] === false){ //false means that its not for sale
                      console.log(`here is the result from kimsonSale ${result}`);
                      kimList.append(
                        `
                        <div class="col" style="float: left;width: 250px;margin: 1em;">
                          <div class="panel panel-default">
                            <div class="panel-heading text-center"><h3>Kim ID: #${i}</h3></div>
                            <div class="panel-body">

                              <img class="img-responsive center-block" onClick="giveModalValueHome(${i})"  data-toggle="modal" data-target="#exampleModalCenter" src="https://gateway.ipfs.io/ipfs/Qmc89pU3J1MkBdnJsaYTii7wHWkavRsSDp43nDr1Dp7q7S/${i}.png" alt="">
                            </div>
                            <div class="panel-footer">
                            <p>This Kim is not for sale!</p>
                            </div>
                          </div>
                        </div>
                        `
                      );
                      // <button onclick="logMe(${i})" type="button" class="btn btn-primary center-block">View This Kim</button>
                    }
                  }
                }
            });
        }
      });
    }
  }


  // this function was for debugging the display when clicking on a kim image
  // afterwards I used the modal button in the index.html file and rendered a single image
  // now working on making the modal dynamic to show the right ${i}
  function logMe(index){
    console.log(`meeee! ${index}`);


    var myWindow = window.open("/aKim.html", "_self");
    var kimToDisplay = $('#kim-to-display');

    // i'm definately doing this wrong.

    myWindow.document.write(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Kim Jong Crypto</title>
          <link rel="stylesheet" href="./css/style.css">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        </head>
        <body>
          <nav class="navbar navbar-default">
            <div class="container-fluid">
              <!-- Brand and toggle get grouped for better mobile display -->
              <div class="navbar-header">
                <!-- <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button> -->
                <a class="navbar-brand" href="http://www.kimjongcrypto.com" target="_blank" >KimJongCrypto<sup>*beta</sup></a>
              </div>

              <!-- Collect the nav links, forms, and other content for toggling -->
              <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                  <li><a href="index.html">Home <span class="sr-only">(current)</span></a></li>
                  <!-- <li class="active"><a href="mykims.html">Your Kims</a></li> -->
                  <li><a href="kimsForSale.html">Kims For Sale</a></li>
                  <!-- <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                      <li><a href="#">Action</a></li>
                      <li><a href="#">Another action</a></li>
                      <li><a href="#">Something else here</a></li>
                      <li role="separator" class="divider"></li>
                      <li><a href="#">Separated link</a></li>
                      <li role="separator" class="divider"></li>
                      <li><a href="#">One more separated link</a></li>
                    </ul>
                  </li> -->
                </ul>
                <!-- <form class="navbar-form navbar-right" role="search">
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="Search">
                  </div>
                  <button type="submit" class="btn btn-default">Submit</button>
                </form> -->
                <ul class="nav navbar-nav navbar-right">
                  <li><a href="mykims.html">Your Kims</a></li>
                  <li>
                    <button id="sellbutton" type="button" class="btn btn-primary" data-toggle="modal" data-target="#sellKimModal" style="margin-top: 9px;">
                      Sell a Kim!
                    </button>
                  </li>


                  <!-- <li><a href="#">Link</a></li>
                  <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                      <li><a href="#">Action</a></li>
                      <li><a href="#">Another action</a></li>
                      <li><a href="#">Something else here</a></li>
                      <li role="separator" class="divider"></li>
                      <li><a href="#">Separated link</a></li>
                    </ul>
                  </li> -->
                </ul>
              </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
          </nav>

          <div class="container bordered">
            <h2>Kim: #${index}</h2>
            <img class="img-responsive center-block" src="https://gateway.ipfs.io/ipfs/Qmc89pU3J1MkBdnJsaYTii7wHWkavRsSDp43nDr1Dp7q7S/${index}.png"></img>
            <a href="/index.html"><button class="btn btn-success">back</button></a>
          </div>

        </body>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src="http://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        <script src="js/web3.min.js"></script>
        <script src="js/truffle-contract.js"></script>
        <script src="js/app.js"></script>
        <script src="js/utils.js"></script>
      </html>
      `
    );
  }

function youOwnTheseKims() {
    let currentUser = web3.eth.coinbase;
    let txnObject = {
      from: currentUser,
      gas: '400000'
    };
    Cryptokims.kimContract.balanceOf.call(currentUser, function(error, result) {
        if (error) {
          console.log("this is an error" + error);
        } else {
          $("#kims_owned_by_user").text(`${result}`);
          console.log("this is the result " + result);
          // return result;
          // console.log(result);
        }
    })
  }
function getKimsByOwner() {
  let currentUser = web3.eth.coinbase;
  let txnObject = {
    from: currentUser,
    gas: '400000'
  };
  Cryptokims.kimContract.getKimsByOwner.call(currentUser, function(error,result) {
      if (error) {
          console.log(`there is an error ${error}`);
      } else {
          console.log(`there is a result! ${result}`);
      }
  });
}

function getAllKimsOnAuction() {
  var kimList = $(".kim-list-on-sale");
  var currentUser = web3.eth.coinbase;
  var weiConvert = 1000000000000000000;
  for (let i = 0; i < 100; i++){
    Cryptokims.kimContract.kimsOnSale.call(i, function(error,result) {
      if (error) {
          console.log(error);
      } else {
        if (result[0] === true && result[2] !== currentUser)
        // add this to the if statement so that users kims are not shown for sale : && result[2] !== currentUser
        // result[0] -> true or false if for sale or not
        // result[1] -> index
        // result[2] -> seller address
        // result[3] -> sell price in wei
        // result[4] -> block number???


          kimList.append(
            `
            <div class="col" style="float: left;width: 250px;margin: 1em;">
              <div class="panel panel-primary">
                <div class="panel-heading"><h3 class="text-center">kimid: #${result[1]}</h3></div>
                <div class="panel-body"><img class="img-responsive center-block" onClick="giveModalValueHome(${i})"  data-toggle="modal" data-target="#exampleModalCenter" src="https://gateway.ipfs.io/ipfs/Qmc89pU3J1MkBdnJsaYTii7wHWkavRsSDp43nDr1Dp7q7S/${result[1]}.png" alt=""></img></div>
                <div class="panel-footer">
                  <p class="text-center">
                    price: ${(result[3]/weiConvert).toPrecision(6)} eth
                  </p>
                  <button onClick="kimsForSaleModal(${result[1]},${result[3]})" type="button" class="btn btn-primary center-block" data-toggle="modal" data-target="#exampleModalCenter">Purchase</button>
                </div>
              </div>
            </div>
            `
          )
      }
    });
  }
}

function totalKimsCreated() {
  var totalKims = Cryptokims.kimContract.kimsCreated(function(error, result) {
        if (error) {
          console.log(error);
        } else {
            totalKims = result.c[0];

        }

    });

    return totalKims;
  }


function ownerToKims(owner) {
    // let currentUser = web3.eth.coinbase;
    Cryptokims.kimContract.ownerToKims.call(owner,function(error,result) {
      if (error) {
          console.log(error);
      } else {
          console.log(result);
      }
    });
  }
function whoOwnsThatKim() {
    var kimList = $(".kim-list-by-owners");
    let addressToKimsMap = new Map();
    // var i;
    for (let b = 0; b < 100; b++){
    Cryptokims.kimContract.kimToOwner.call(b, function(error,result) {
      if (error) {
          console.log(error);
      } else {
          // kimList.append("<li class='placeholder-kim'>"+ "Kim # "+ b +" is owned by " +result+ "</li>");
          if (result === '0x0000000000000000000000000000000000000000')
          {
            kimList.append();
          }else{
            console.log(`----------1---${result}`);
            kimList.append(`<li class='placeholder-kim'> owner: ${result}<br>of kim: ${b}<br></li>`);
          }

        }
      });
    }
  }




  function sellKimFromMyKims(id) {
      // let kim_sell_id = id;
      let kim_sell_id = id;
      // let kim_sell_price = new BN($('#kim_sell_price').val);
      let kim_sell_price = $('#kim_sell_price').val();
      let ethconv = 1000000000000000000;
      kim_sell_price = (kim_sell_price * ethconv);
      // let kim_sell_price = sellPrice;
      let currentUser = web3.eth.coinbase;
      let txnObject = {
        from: currentUser,
        gas: '400000'
      };

      Cryptokims.kimContract.kimAuction.sendTransaction(kim_sell_id, kim_sell_price, txnObject, function(error, result) {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
        }
      });
    }

    function currentUserKims() {
      var kimList = $(".current-user-kims");
      currentUser = web3.eth.coinbase;
      for (let b = 0; b < 100; b++){
        Cryptokims.kimContract.kimToOwner.call(b, function(error,result) {
          if (error) {
            console.log(error);
          } else {
            if (result == currentUser){

              Cryptokims.kimContract.kimsOnSale.call(b, function(error, result){
                if(error){
                  console.log(error);
                } else {
                  if (result[0] === true){
                    kimList.append(
                      `
                      <div class="col" style="float: left;width: 250px;margin: 1em;">
                        <div class="panel panel-primary">
                          <div class="panel-heading">
                            <h3 class="text-center">Kim: #${b}</h3>
                          </div>
                          <div class="panel-body">
                            <img onClick="giveModalValueHome(${b})" class="img-responsive center-block" data-toggle="modal" data-target="#showKimModal"src="https://gateway.ipfs.io/ipfs/Qmc89pU3J1MkBdnJsaYTii7wHWkavRsSDp43nDr1Dp7q7S/${b}.png"></img>
                          </div>
                          <div class="panel-footer">
                            <button type="button" class="btn btn-primary center-block" style="margin-top: 9px;">Button</button>
                          </div>
                        </div>
                      </div>
                      `
                    );

                    // <div class="panel-footer"><button onClick="giveModalValueRemoveListing(${b})" type="button" class="btn btn-primary" data-toggle="modal" data-target="#showKimModal" style="margin-top: 9px;">This button doesnt work</button></div>
                    // </div>
                  } else {
                    kimList.append(
                      `
                      <div class="col" style="float: left;width: 250px;margin: 1em;">
                        <div class="panel panel-default">
                          <div class="panel-heading">
                            <h3 class="text-center">Kim: #${b}</h3>
                          </div>
                          <div class="panel-body">
                            <img onClick="giveModalValueHome(${b})" class="img-responsive center-block" data-toggle="modal" data-target="#showKimModal"src="https://gateway.ipfs.io/ipfs/Qmc89pU3J1MkBdnJsaYTii7wHWkavRsSDp43nDr1Dp7q7S/${b}.png"></img>
                          </div>
                          <div class="panel-footer"><button onClick="giveModalValue(${b})" type="button" class="btn btn-primary center-block" data-toggle="modal" data-target="#showKimModal" style="margin-top: 9px;">Sell this Kim!</button>
                          </div>
                        </div>
                      </div>
                      `
                    );
                  }
                }
              });
            }
          }
        });
      }
    }

function giveModalValueRemoveListing(val){
  var modal = $('.modal-header');
  modal.html("");
  modal.append(
    `
      <div class="modal-header">
        <h2 class="modal-title" id="sellKimModalLabel">Would you like to remove Kim: #${val}?</h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <img src="https://gateway.ipfs.io/ipfs/Qmc89pU3J1MkBdnJsaYTii7wHWkavRsSDp43nDr1Dp7q7S/${val}.png"></img>
        <br>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary"  data-dismiss="modal">Remove</button>
      </div>
    `
  );
}

function giveModalValue(val){
  var modal = $('.modal-header');
  modal.html("");
  modal.append(
    `
      <div class="modal-header">
        <h2 class="modal-title" id="sellKimModalLabel">You are about to sell Kim: #${val}</h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <img class="img-responsive center-block" src="https://gateway.ipfs.io/ipfs/Qmc89pU3J1MkBdnJsaYTii7wHWkavRsSDp43nDr1Dp7q7S/${val}.png"></img>
        <br>
        <input id="kim_sell_index" type="hidden" placeholder="${val}" value="${val}">
        <input class="center-block" id="kim_sell_price" type="text" placeholder="sell price in ETH">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" onclick="sellKim()" data-dismiss="modal">Sell</button>
      </div>
    `
  );
}

// how this function works:
// giveModalValueHome is used in the index, it modifies the content inside '.modal-header' and replaces
// it with the following callback information:
// val: index of the kim passed when clicking on an image in index.html
// val then is passed into the kimContract.kims call back and is reassigned to equal the kimName
// once thats assigned, val is used again in the kimToOwner call function to get the owners address.
// its then appended to the modal and displayed on click.
function giveModalValueHome(val){
  var modal = $('.modal-header');
  var kimOwner = '';
  modal.html("");
  Cryptokims.kimContract.kims(val, function(error, result) {
    if (error) {
      console.log(error);
    } else
    {
      var kimName = result;
      Cryptokims.kimContract.kimToOwner.call(val, function(error,result) {
        if (error) {
            console.log(error);
        } else {
            if (result === '0x0000000000000000000000000000000000000000')
            {
              //do nothing
            } else {
              // console.log(`result in toOwner ${result}`);
              kimOwner = result;
              // if statement commented out, hard coded the addresses for personal usability
              // if (kimOwner === "0x4f471c73e01ffdbfeb50598646474c5189a80772"){
              //   kimOwner = 'HARDCODED KEV';
              // } else if (kimOwner === "0x7a7700800778527c6b0a73955f57ecbad0a9e646"){
              //   kimOwner = 'HARDCODED SAM';
              // } else if (kimOwner === "0xf17f52151ebef6c7334fad080c5704d77216b732"){
              //   kimOwner = 'HARDCODED CHRIS';
              // }
              Cryptokims.kimContract.kimsOnSale.call(val, function(error, result){
                if (error){
                  console.log(error);
                }
                else {
                  console.log(result[0]);
                  var saleStatus = result[0];
                  if (saleStatus === true){
                    saleStatus = 'FOR SALE!';
                  } else {
                    saleStatus = `Not for sale :(`;
                  }


                  console.log(`kimOwner in kimsOnSale ${kimOwner}`);
                  modal.append(
                    `
                    <div class="modal-header">
                      <h2 class="modal-title text-center" id="sellKimModalLabel">Kim: #${val}</h2>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                    <h3 class="text-center">Kim Name: ${kimName} </h2>
                    <img class="img-responsive center-block" style="width:40vh; height:40vh;" src="https://gateway.ipfs.io/ipfs/Qmc89pU3J1MkBdnJsaYTii7wHWkavRsSDp43nDr1Dp7q7S/${val}.png"></img>
                    <h3 class="text-center">Kim Owner: ${kimOwner} </h2>
                    <h3 class="text-center">Sale Status: ${saleStatus}</h3>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    `
                  );
                }
              });
             }
          }
        });
      }
    });
  }
// function giveModalValueHome(val){
//   var modal = $('.modal-header');
//   modal.html("");
//   Cryptokims.kimContract.kims(val, function(error, result) {
//     if (error) {
//       console.log(error);
//     } else
//     {
//       var kimName = result;
//       Cryptokims.kimContract.kimsOnSale.call(val, function(error, result) {
//         if (error) {
//             console.log(error);
//         } else {
//             if (result[2] === '0x0000000000000000000000000000000000000000')
//             {
//               modal.append('');
//             } else {
//               var kimOwner = result[2];
//               var saleStatus = result[0];
//               var blockNumber = result[4]["c"];
//               console.log(result[4]["c"]);
//               // if statement commented out, hard coded the addresses for personal usability
//               // if (kimOwner === "0x4f471c73e01ffdbfeb50598646474c5189a80772"){
//               //   kimOwner = 'HARDCODED KEV';
//               // } else if (kimOwner === "0x7a7700800778527c6b0a73955f57ecbad0a9e646"){
//               //   kimOwner = 'HARDCODED SAM';
//               // } else if (kimOwner === "0xf17f52151ebef6c7334fad080c5704d77216b732"){
//               //   kimOwner = 'HARDCODED CHRIS';
//               // }
//
//               modal.append(
//                 `
//                 <div class="modal-header">
//                   <h2 class="modal-title text-center" id="sellKimModalLabel">Kim: #${val}</h2>
//                   <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                     <span aria-hidden="true">&times;</span>
//                   </button>
//                 </div>
//                 <div class="modal-body">
//                   <h3 class="text-center">Kim Name: ${kimName} </h2>
//                   <img class="img-responsive center-block" style="width:40vh; height:40vh;" src="https://gateway.ipfs.io/ipfs/Qmc89pU3J1MkBdnJsaYTii7wHWkavRsSDp43nDr1Dp7q7S/${val}.png"></img>
//                   <h3 class="text-center">Kim Owner: ${kimOwner} </h2>
//                   <h3 class="text-center">Sale Status: <strong>${saleStatus}</strong></h2>
//                 </div>
//                 <div class="modal-footer">
//                   <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//                 </div>
//                 `
//               );
//              }
//           }
//         });
//       }
//     });
//   }

function thisGuyOwnsTheseKims(owner) {
  var kimList = $("a-kim-owner-profile-kims");
  for (let b = 0; b < 100; b++){
    Cryptokims.kimContract.kimToOwner.call(b, function(error,result) {
      if (error) {
          console.log(error);
      } else
      {
        if (result == owner)
          kimList.append("<li class='placeholder-kim'>"+ "Kim # "+ b +" is owned by " +result+ "</li>");
          // console.log(`${result}`);
          // kimList.append("<li class='placeholder-kim'>"+ " You own Kim # " + b + "</li>");
          // counter++;
          // console.log("Kim # "+ i + " is owned by "+ result);
          // console.log(b);
        }
      });
    }
}
function createPromoKim() {
  Cryptokims.kimContract.createPromoKim(function(error,result) {
    if (error) {
      console.log(error);
    }
    else {
      console.log(result);
    }
  });
  }
function transferKim() {
  reciever = "0x3e22c64A16a063485A6870b3D4fadC8EA7BB6225"
  kimIndex = 0;
  Cryptokims.kimContract.transferKim(reciever, kimIndex, function(error,result) {
    if (error) {
      console.log(error);
    }
    else {
      console.log(result);
    }
  });
}
function sendThatMoney(money){
  // moneyToSend = msg.value;

  let txnObject = {
    from: currentUser,
    gas: '400000',
    value: money
  };

  Cryptokims.kimContract.sendThatMoney.sendTransaction(money, txnObject, function(error, result){
    if (error) {
      console.log(error);
    }
    else {
      console.log(`RESULT FROM SEND THAT MONEY: ${result}`);
    }
  });
}
function transferFunds(value){
  // web3.eth.sendTransaction({from: "", value,})

  let our_cut = value/2;
  let new_value = value - our_cut;

  let kev = "0x4f471c73e01ffdbfeb50598646474c5189a80772";
  let sam = "0x7A7700800778527C6B0A73955F57ecBaD0A9e646";
  let theHouse = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";


  web3.eth.sendTransaction({from: kev, to: sam, value:new_value}, function(error, result){
    if (error) {
      console.log(error);
      // console.log('error in get all kims');
    } else {
      console.log(result);
      web3.eth.sendTransaction({from: kev, to: theHouse, value: our_cut}, function(error, result){
        if (error) {
          console.log(error);
          // console.log('error in get all kims');
        } else {
          console.log(result);
        }
      });
    }
  });


  // eth.sendTransaction({from:eth.coinbase, to:“0xd60e64afb753583941e1ab42f836ced0d23af2db”, value: web3.toWei(1, “ether”)})
}

function getUserKimsOnSale() {
  var kimList = $(".user-kims-on-sale");
  var currentOwner = web3.eth.coinbase;
  console.log(currentOwner);
  for (let i = 0; i < 100; i++){
    Cryptokims.kimContract.kimsOnSale.call(i, function(error,result) {
      if (error) {
          console.log(error);
      } else {
        if (result[0] === true && result[2] === currentOwner)
          kimList.append(
            `
            <div class="col" style="float: left;width: 250px;margin: 1em;">
              <div class="panel panel-primary">
                <div class="panel-heading">
                  <h3 class="text-center">Kim: #${result[1]}</h3>
                </div>
                <div class="panel-body">
                  <img class="img-responsive center-block" src="https://gateway.ipfs.io/ipfs/Qmc89pU3J1MkBdnJsaYTii7wHWkavRsSDp43nDr1Dp7q7S/${result[1]}.png">
                  </img>
                </div>
              </div>
            </div>
            `
          )
          // console.log(`WWWWWWWW ${result}`);
          // console.log(result);
      }
    });
  }
}

function getUserAccount(){
  var accDisplay = $(".user-account");
  var currentUser = web3.eth.coinbase;
  // console.log(`accDisplay = ${accDisplay}`);
  // console.log(`currentUser = ${currentUser}`);

  if(currentUser == null)
  {
    accDisplay.append(
      `<h2>You are not signed in!</h2>`
    );
  } else {
    accDisplay.append(
      `<h2>${currentUser}</h2>`
    );
  }

}

function hideAccountTab(){
  var currentUser = web3.eth.coinbase;
  // console.log(`accDisplay = ${accDisplay}`);
  // console.log(`currentUser = ${currentUser}`);
  var kimTab = $('#your-kims-tab');

  if(currentUser == null)
  {
    kimTab.removeClass('visible');
    kimTab.addClass('hidden');
  } else {
    kimTab.removeClass('hidden');
    kimTab.addClass('visible');
  }
}


function searchForKim(){
  var searchQuery = $('#searchQuery').val();
  // console.log(`SEARCHING FOR: ${searchQuery}`);
  var searchResult = $('#kim-searched-for');
  var kimName = "";

  Cryptokims.kimContract.kimsOnSale.call(searchQuery, function(error,result) {
      if (error) {
        // console.log(error);
        console.log('error in get all kims probably wrong input');
      } else {
        kimName = result;
        console.log(`++S+e+a+r+c+h+e+d+ +f+o+r++ ${searchQuery}`);
        console.log(`++R+E+S+U+L+T+++ ${kimName}`);
        console.log(`result[]`);
        console.log(`${result[0]} -> true or false if for sale or not`);
        console.log(`${result[1]} -> index`);
        console.log(`${result[2]} -> seller address`);
        console.log(`${result[3]} -> sell price in wei`);
        console.log(`${result[4]} -> block number???`);
        searchResult.append(
          `
          <div class="col" style="float: left;width: 250px;margin: 1em;">
            <div class="panel panel-primary">
              <div class="panel-heading">
                <h3 class="text-center">Kim: #${result[1]}</h3>
              </div>
              <div class="panel-body">
                <img class="img-responsive center-block" onClick="giveModalValueHome(${result[1]})"  data-toggle="modal" data-target="#exampleModalCenter" src="https://gateway.ipfs.io/ipfs/Qmc89pU3J1MkBdnJsaYTii7wHWkavRsSDp43nDr1Dp7q7S/${result[1]}.png">
                </img>
                <p>${result}</p>
              </div>
            </div>
          </div>
          `
        );
      }
    });
}

// display the side panel thing on index.
// use the <div id="ethereum-panel"></div> anywhere in an html doc to display this
function ethereumPanel(){
  let currentUser = web3.eth.coinbase;
  console.log(`here is current user ${currentUser}`);
  var ethPanel = $('#ethereum-panel');

  if (currentUser == null ){
    ethPanel.append(
      `
      <div class="panel panel-default" style="position:fixed; top:10%; right:0%;">
        <div class="panel-body" style="height:13vh; width:20vh">
          <!-- make this part dynamic -->
          <h4>You are not connected! </h4>
          <a href="https://metamask.io/" target="_blank"><h4>Download MetaMask!</h4></a>
        </div>
      </div>
      `
    );
  } else {
    var shortUser = currentUser.substring(0,10);
    ethPanel.append(
      `
      <div class="panel panel-default" style="position:fixed; top:10%; right:0%;">
        <div class="panel-body" style="height:13vh; width:20vh">
          <!-- make this part dynamic -->
          <h4>Connected To Ethereum </h4>
          <a href="myKims.html"><h3>${shortUser}</h3></a>
        </div>
      </div>
      `
    );
  }
}

//   Cryptokims.kimContract.kims.length.call(function(error,result) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(result);
//     }
// });

// 0x627306090abaB3A6e1400e9345bC60c78a8BEf57
// 0x7a7700800778527c6b0a73955f57ecbad0a9e646

  // $('#kim_name').click(function(){
  //   let kim_name = $('#kim_name').value;
  //   console.log(kim_name);
  // })

  // function getKim() {
  //  let index = document.getElementById('get_kim').value;
  //
  //  let txnObject = {
  //     from: web3.eth.coinbase,
  //     gas: '400000'
  //   }
  //
  //  Cryptokims.kimContract.getKim.sendTransaction(index, txnObject, function(error, result) {
  //    if (error) {
  //      console.log(error);
  //    } else {
  //      console.log(result);
  //      setData('kim_transaction', result);
  //    }
  //  })
  // }
  //
