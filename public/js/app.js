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
  // Cryptokims ABI, copied after generation of contract.
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



  function sayHi(){
    console.log('hi');
    var html = $('html');
    html.html("");   window.location.replace('/nometa');
  }
  // Add event listener to window, and run startApp() function
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
      // sayHi();
      // window.location.replace('/nometa');
      console.log("- Didn't find web3, using fallback");
      window.web3 = new Web3(new Web3.providers.HttpProvider("https://localhost:8545"));
      Cryptokims.KimState.web3UsingInfura = true;


    }
    Cryptokims.KimState.web3Queried = true;
    startApp();
  });

  // Start app function, runs all the functions necessary, and connects to web3.
  var startApp = function () {

    if (web3) {
      console.log("Found web3.");
      var contractAddress = "0x82C7a0C5e9c8c435dF21e00EecEa76106054FBf8"
      var MyContract = web3.eth.contract(Cryptokims.ABI);
      Cryptokims.kimContract = MyContract.at(contractAddress);
      Cryptokims.KimState.web3ready = true;

      if (typeof CryptokimsContractLoadedCallback !== 'undefined' && Cryptokims.KimState.web3UsingInfura) {
        CryptokimsContractLoadedCallback();
      }
      getAllKims();
      getAllKimsOnAuction();
      getUserKimsOnSale();
      currentUserKims();
      ethereumPanel();
      totalKimsCreated();
      totalKimsOnAuction();
      getUserAccount();
      kimPagination();
      // hideAccountTab();

      let events = Cryptokims.kimContract.allEvents({fromBlock: 1615044, toBlock: 'latest'});
        events.watch(function(error, result){
          if (!error) {
            let v = JSON.parse(JSON.stringify(result))['transactionHash'];
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
      });
    }
  }


  // Kevin approved and functioning sell kim function
  // sell kim function
  // WORKING
  function sellKim() {
    let kim_sell_id = $('#kim_sell_index').val();
    let kim_sell_price = $('#kim_sell_price').val();
    let kim_sell_price_wei = web3.toWei(kim_sell_price, 'ether');
    let currentUser = web3.eth.coinbase;

    console.log(`Requesting sale on kim #${kim_sell_id} for ${kim_sell_price} ether`);

    Cryptokims.kimContract.sellToken.sendTransaction(kim_sell_id, kim_sell_price_wei, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(`Sale confirmed, transaction hash: ${result}`);
      }
    });
  }


  // Kevin approved and functioning buy kim function
  // buy kim function.
  // WORKING
  function buyKim(id, price) {
    let kim_buy_id = id;
    let kim_buy_price = price;

    // convert price to wei
    let toWei = 1000000000000000000;
    kim_buy_price = kim_buy_price * toWei;
    // kim_buy_price = web3.toWei(kim_buy_price, 'ether');
    // let kim_buy_price_wei = web3.toWei(kim_buy_price, 'ether');

    let currentUser = web3.eth.coinbase;

    console.log(`BUY KIM ID: ${kim_buy_id}`);
    console.log(`BUY KIM PRICE: ${kim_buy_price}`);

    console.log(`Requesting purchase on kim: #${kim_buy_id} for ${kim_buy_price} wei`);

    let txnObject = {
      from: currentUser,
      gas: '4000000',
      value: kim_buy_price
    };


    Cryptokims.kimContract.buyKim.sendTransaction(kim_buy_id, txnObject, function(error, result){
      if (error) {
        // console.log(error);
        console.log('rejected transaction');
      } else {
        console.log(`Purchase confirmed, transaction hash: ${result}`);
        ga('send', 'event', 'order_placed', 'buy_kim');
        //add confirmation that kim was purchased and display it to the user
      }
    });
  }

  // WORKING
  function clearModal(){
    var modal = $('.modal-content');
    modal.html("");
  }

  // Kevin approved
  // function to append information to the kim for sale modal.
  // WORKING
  function kimsForSaleModal(index, value){
    var modal = $('.modal-content');
    console.log(value);
    clearModal();
    modal.append(
      `
      <div class="modal-header">
        <h5 class="modal-title" id="centralModalInfo">Kim: #${index}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <img class="img-responsive center-block" src="https://gateway.ipfs.io/ipfs/QmNmCUgvsDKzQiqNFTyQR9cBFQyoJ1iG5p35eLJDorLAER/${index}.png"></img>
       <h3 class="text-center">Price: ${value} ETH</h3>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Decline</button>
        <button onClick="buyKim(${index},${value}), clearModal()" type="button" class="btn btn-primary" data-dismiss="modal">PURCHASE</button>
      </div>
      `
    );
  }

  // Kevin approved
  // function used for the display of all the kims
  // WORKING NOT IN USE
  function totalKimsCreated() {
    let totalKims;
    var totalKimsDisplay = $('#total-kims-created');

    Cryptokims.kimContract.kimsCreated(function(error, result) {
      if (error) {
        console.log(error);
      } else {
        totalKims = result;
        console.log(`Current total Kims: ${result}`);
        totalKimsDisplay.append(
          `
          <a>Total Kims: <strong>${totalKims}</strong></a>
          `
        );

      }
    });
  }

  // Kevin approved
  // function used to display all kims avaliable for purchase
  // WORKING NOT IN USE
  function totalKimsOnAuction() {
    let totalKims;
    var totalKimsDisplay = $('#total-kims-on-auction');
    Cryptokims.kimContract.kimsOnAuction(function(error, result) {
      if (error) {
        console.log(error);
      } else {
        totalKims = result;
        totalKimsDisplay.append(
          `
          <a>Total Kims on Sale: <strong>${totalKims}</strong></a>
          `
        );

      }
    });
  }


  // Kevin approved
  // Function to get all Kims
  // WORKING
  function getAllKims() {
    var kimsToLoop;
    // var kimCardDeck = $(".card-deck");
    var kimItems = $(".placeholder-kim");
    var kimCardDeck = $('#kim_template')
    Cryptokims.kimContract.kimsCreated(function(error, result) {
      if (error) {
        console.log(error);
      } else {
        kimsToLoop = result.c[0];
        for (let i = 0; i < 24; i++){
          Cryptokims.kimContract.tokenAuction(i, function(error, result) {
            if (error) {
              console.log(error);
            } else {
              var saleStatus = result[0];
              var kimIndex = result[1];
              var ownerAddress = result[2];
              var priceETH = result[3];

              priceETH = web3.fromWei(priceETH, 'ether');
              console.log('hey'+priceETH);

              var blockNum = result[4]['c'][0];

              Cryptokims.kimContract.tokenToOwner.call(i, function(error,result) {
                if (error) {
                    console.log(error);
                } else {
                  // CREATE THE OBJECTS IN A SET OF 4 CARD DECK
                    // console.log(`KIMINDEX: SALE STATUS ${saleStatus}. INDEX ${kimIndex}, ownerADDRESS ${ownerAddress}, blockNumber: ${blockNum}`);
                    if (saleStatus === true){ //true so the kim is for sale.
                      kimCardDeck.append(
                        `
                        <div class="card text-center" >
                          <div class="card-header bg-light">
                            Kim # ${kimIndex}
                          </div>
                          <img class="card-img-top" onClick="giveModalValueHome(${kimIndex})"  data-toggle="modal" data-target="#centralModalInfo"src="https://gateway.ipfs.io/ipfs/QmNmCUgvsDKzQiqNFTyQR9cBFQyoJ1iG5p35eLJDorLAER/${kimIndex}.png" alt="Card image cap">
                          <div class="card-body">
                            <p class="card-text">Price: ${priceETH} ETH</p>
                            <button onClick="kimsForSaleModal(${kimIndex},${priceETH})" type="button" class="btn btn-primary btn-small center-block" data-toggle="modal" data-target="#centralModalInfo">Purchase</button>
                          </div>
                        </div>
                        `
                        );
                    } else {
                      if(saleStatus === false){ //false means that its not for sale
                          kimCardDeck.append(
                        `
                        <div class="card text-center" >
                          <div class="card-header bg-light">
                            Kim # ${kimIndex}
                          </div>
                          <img class="card-img-top" onClick="giveModalValueHome(${i})"  data-toggle="modal" data-target="#centralModalInfo" src="https://gateway.ipfs.io/ipfs/QmNmCUgvsDKzQiqNFTyQR9cBFQyoJ1iG5p35eLJDorLAER/${kimIndex}.png" alt="Card image cap">
                          <div class="card-body">
                            <p class="card-text">Price: ${priceETH} ETH</p>
                            <a href="#" class="btn btn-danger disabled">Kim is not for sale</a>
                          </div>
                        </div>
                        `
                        );
                      }
                    }
                }
              });
            }
          });
        }
      }
    });


  }

  // Kevin approved
  // Display all kims on sale
  // NOT WORKING, NOT IN USE
  function getAllKimsOnAuction() {
    var kimList = $(".kim-list-on-sale");
    var currentUser = web3.eth.coinbase;

    let kimsToLoop;
    Cryptokims.kimContract.kimsCreated(function(error, result) {
      if (error) {
        console.log(error);
      } else {
        kimsToLoop = result.c[0];


        for (let i = 0; i < kimsToLoop; i++){
          Cryptokims.kimContract.tokenAuction.call(i, function(error,result) {
            if (error) {
              console.log(error);
            } else {
              if (result[0] === true){

                var saleStatus = result[0];
                var kimIndex = result[1];
                var ownerAddress = result[2];
                var priceETH = result[3];
                priceETH = web3.fromWei(priceETH, 'ether');

                var blockNum = result[4]['c'][0];

                Cryptokims.kimContract.tokenToOwner.call(i, function(error,result) {
                  if (error) {
                      console.log(error);
                  } else {
                    if (saleStatus === true){
                      kimList.append(
                        `
                        <div class="col" style="float: left;width: 250px;margin: 1em;">
                          <div class="panel panel-primary">
                            <div class="panel-heading"><h3 class="text-center">kimid: #${kimIndex}</h3></div>
                            <div class="panel-body"><img class="img-responsive center-block" onClick="giveModalValueHome(${kimIndex})"  data-toggle="modal" data-target="#exampleModalCenter" src="https://gateway.ipfs.io/ipfs/QmNmCUgvsDKzQiqNFTyQR9cBFQyoJ1iG5p35eLJDorLAER/${kimIndex}.png" alt=""></img></div>
                            <div class="panel-footer">
                              <p class="text-center" style="overflow:hidden">
                                price: ${priceETH} eth
                              </p>
                              <button onClick="kimsForSaleModal(${kimIndex},${priceETH})" type="button" class="btn btn-primary center-block" data-toggle="modal" data-target="#exampleModalCenter">Purchase</button>
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
    });
  }


  // Kevin approved
  // Display a current users kims
  // WORKING
  function currentUserKims() {
    var kimList = $("#current_user_kim_template");
    currentUser = web3.eth.coinbase;

    var kimsToLoop;
    Cryptokims.kimContract.kimsCreated(function(error, result) {
      if (error) {
        console.log(error);
      } else {
        kimsToLoop = result.c[0];


        for (let b = 0; b < kimsToLoop; b++){
          Cryptokims.kimContract.tokenAuction.call(b, function(error,result) {
            if (error) {
              console.log(error);
            } else {

              var saleStatus = result[0];
              var sellerAddress = result[2];
              var kimIndex = result[1]['c'][0];

              if (sellerAddress === currentUser && saleStatus === true){
                console.log(`You are selling kimIndex # ${kimIndex}`);
                kimList.append(
                  `
                    <div class="card text-center" >
                      <div class="card-header bg-light">
                        Kim # ${kimIndex}
                      </div>
                      <img class="card-img-top" onClick="giveModalValueHome(${kimIndex})"  data-toggle="modal" data-target="#centralModalInfo" src="https://gateway.ipfs.io/ipfs/QmNmCUgvsDKzQiqNFTyQR9cBFQyoJ1iG5p35eLJDorLAER/${kimIndex}.png" alt="Card image cap">
                      <div class="card-body">
                          <button onClick="cancelKimAuction(${kimIndex})"type="button" class="btn btn-primary center-block" style="margin-top: 9px;">Remove Listing</button>
                      </div>
                    </div>
                  `
                );
              } else {
                // console.log(`You are not selling kimIndex # ${kimIndex}, but you own it`);
                Cryptokims.kimContract.tokenToOwner(kimIndex, function(error, result){
                  if(error){
                    console.log(error);
                  } else {
                    var sellerAddress2 = result;
                    if (sellerAddress2 === currentUser && saleStatus === false){
                      console.log(sellerAddress2);
                      kimList.append(
                        `
                          <div class="card text-center" >
                            <div class="card-header bg-light">
                              Kim # ${kimIndex}
                            </div>
                            <img class="card-img-top" onClick="giveModalValueHome(${kimIndex})"  data-toggle="modal" data-target="#centralModalInfo" src="https://gateway.ipfs.io/ipfs/QmNmCUgvsDKzQiqNFTyQR9cBFQyoJ1iG5p35eLJDorLAER/${kimIndex}.png" alt="Card image cap">
                            <div class="card-body">
                              <button onClick="giveModalValue(${kimIndex})" type="button" class="btn btn-primary center-block" data-toggle="modal" data-target="#centralModalInfo" style="margin-top: 9px;">Sell this Kim!</button>
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
    });
  }


  /*THE OLD FUNCTION*/
  // Kevin approved
  // Display a current users kims
  // function currentUserKims() {
  //   var kimList = $(".current-user-kims");
  //   currentUser = web3.eth.coinbase;

  //   var kimsToLoop;
  //   Cryptokims.kimContract.kimsCreated(function(error, result) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       kimsToLoop = result.c[0];


  //       for (let b = 0; b < kimsToLoop; b++){
  //         Cryptokims.kimContract.tokenAuction.call(b, function(error,result) {
  //           if (error) {
  //             console.log(error);
  //           } else {

  //             var saleStatus = result[0];
  //             var sellerAddress = result[2];
  //             var kimIndex = result[1]['c'][0];

  //             if (sellerAddress === currentUser && saleStatus === true){
  //               console.log(`You are selling kimIndex # ${kimIndex}`);
  //               kimList.append(
  //                 `
  //                 <div class="col" style="float: left;width: 250px;margin: 1em;">
  //                   <div class="panel panel-primary">
  //                     <div class="panel-heading">
  //                       <h3 class="text-center">Kim: #${kimIndex}</h3>
  //                     </div>
  //                     <div class="panel-body">
  //                       <img onClick="giveModalValueHome(${kimIndex})" class="img-responsive center-block" data-toggle="modal" data-target="#showKimModal"src="https://gateway.ipfs.io/ipfs/QmNmCUgvsDKzQiqNFTyQR9cBFQyoJ1iG5p35eLJDorLAER/${kimIndex}.png"></img>
  //                     </div>
  //                     <div class="panel-footer">
  //                       <button onClick="cancelKimAuction(${kimIndex})"type="button" class="btn btn-primary center-block" style="margin-top: 9px;">Remove Listing</button>
  //                     </div>
  //                   </div>
  //                 </div>
  //                 `
  //               );
  //             } else {
  //               // console.log(`You are not selling kimIndex # ${kimIndex}, but you own it`);
  //               Cryptokims.kimContract.tokenToOwner(kimIndex, function(error, result){
  //                 if(error){
  //                   console.log(error);
  //                 } else {
  //                   var sellerAddress2 = result;
  //                   if (sellerAddress2 === currentUser && saleStatus === false){
  //                     console.log(sellerAddress2);
  //                     kimList.append(
  //                       `
  //                       <div class="col" style="float: left;width: 250px;margin: 1em;padding:100px;">
  //                         <div class="panel panel-default">
  //                           <div class="panel-heading">
  //                             <h3 class="text-center">Kim: #${kimIndex}</h3>
  //                           </div>
  //                           <div class="panel-body">
  //                             <img onClick="giveModalValueHome(${kimIndex})" class="img-responsive center-block" data-toggle="modal" data-target="#showKimModal"src="https://gateway.ipfs.io/ipfs/QmNmCUgvsDKzQiqNFTyQR9cBFQyoJ1iG5p35eLJDorLAER/${kimIndex}.png"></img>
  //                           </div>
  //                           <div class="panel-footer"><button onClick="giveModalValue(${kimIndex})" type="button" class="btn btn-primary center-block" data-toggle="modal" data-target="#showKimModal" style="margin-top: 9px;">Sell this Kim!</button>
  //                           </div>
  //                         </div>
  //                       </div>
  //                       `
  //                     );
  //                   }
  //                 }
  //               });
  //             }
  //           }
  //         });
  //       }
  //     }
  //   });
  // }

  // Kevin approved
  // Cancel kim sale and remove from auction
  // WORKING
  function cancelKimAuction(index){
    var kimToRemove = index;

    Cryptokims.kimContract.cancelKimAuction.sendTransaction(kimToRemove, function(error,result){
      if(error){
        console.log(error);
      } else {
        console.log(`result from cancelKimAuction${result}`);
      }
    });
  }

  // Kevin approved
  // Modal to confirm removal of kim
  // NOT SURE IF WORKING OR NOT
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
          <img class="img-responsive center-block" style="height:400px; width:373px;" src="https://gateway.ipfs.io/ipfs/QmNmCUgvsDKzQiqNFTyQR9cBFQyoJ1iG5p35eLJDorLAER/${val}.png"></img>
          <br>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary"  data-dismiss="modal">Remove</button>
        </div>
      `
    );
  }

  // Kevin approved
  // give modal value for sell kim function
  // WORKING
  function giveModalValue(val){
    var modal = $('.modal-content');
    console.log('giveModalValue clicked');
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
        <form>
          <div class="form-group">
            <img class="img-responsive center-block" style="height:400px; width:373px;" src="https://gateway.ipfs.io/ipfs/QmNmCUgvsDKzQiqNFTyQR9cBFQyoJ1iG5p35eLJDorLAER/${val}.png"></img>
            <br>
            <input class="form-control" id="kim_sell_index" type="hidden" placeholder="${val}" value="${val}">
            <input class="form-control" class="center-block" id="kim_sell_price" type="number" placeholder="sell price in ETH">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" onclick="sellKim() " data-dismiss="modal">Sell</button>
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
  // WORKING
  function giveModalValueHome(val){
    var modal = $('.modal-content');
    var kimOwner = '';
    modal.html("");

    Cryptokims.kimContract.tokenAuction(val, function(error, result) {
      if (error) {
        console.log(error);
      } else
      {
        var kimName = result;
        var saleStatus = result[0];
        var kimIndex = result[1]['c'][0];
        var salePrice = result[3];
        // salePrice = salePrice.toPrecision(6);

        var value = web3.fromWei(salePrice, 'ether');
        // console.log(result[3]);c

        Cryptokims.kimContract.tokenToOwner.call(kimIndex, function(error,result) {
          if (error) {
              console.log(error);
          } else {
            console.log(result);
            var sellerAddress = result;
            sellerAddress = sellerAddress.substring(0,10);
            console.log(sellerAddress);
            // modal.append(
            //   `
            //   <div class="modal-header">
            //     <h2 class="modal-title text-center" id="sellKimModalLabel">Kim: #${kimIndex}</h2>
            //     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            //       <span aria-hidden="true">&times;</span>
            //     </button>
            //   </div>
            //   <div class="modal-body">
            //     <h3 class="text-center"></h2>
            //     <img class="img-responsive center-block" src="https://gateway.ipfs.io/ipfs/QmNmCUgvsDKzQiqNFTyQR9cBFQyoJ1iG5p35eLJDorLAER/${val}.png"></img>
            //     <h3 class="text-center">Kim Owner: ${sellerAddress} </h2>
            //     <h3 class="text-center">Sale Status: ${saleStatus}</h3>
            //     <h3 class="text-center">Price: ${value} ETH</h3>
            //   </div>
            //   <div class="modal-footer">
            //     <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            //   </div>
            //   `
            // );

            modal.append(
            `
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Kim: # ${val}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <img class="img-responsive center-block" src="https://gateway.ipfs.io/ipfs/QmNmCUgvsDKzQiqNFTyQR9cBFQyoJ1iG5p35eLJDorLAER/${val}.png"></img>
             <h3 class="text-center">Kim Owner: ${sellerAddress} </h2>
             <h3 class="text-center">Sale Status: ${saleStatus}</h3>
             <h3 class="text-center">Price: ${value} ETH</h3>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            `

            )
          }
        });
      }
    });
  }

  // Kevin approved
  // Display all kims an owner is selling
  // WORKING
  function getUserKimsOnSale() {
    var kimList = $(".user-kims-on-sale");
    var currentOwner = web3.eth.coinbase;
    var kimsToLoop;

    Cryptokims.kimContract.kimsCreated(function(error, result) {
      if (error) {
        console.log(error);
      } else {
        kimsToLoop = result.c[0];

        for (let i = 0; i < kimsToLoop; i++){
          Cryptokims.kimContract.tokenAuction.call(i, function(error,result) {
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
                      <img onClick="giveModalValueHome(${result[1]})" class="img-responsive center-block" data-toggle="modal" data-target="#showKimModal" src="https://gateway.ipfs.io/ipfs/QmNmCUgvsDKzQiqNFTyQR9cBFQyoJ1iG5p35eLJDorLAER/${result[1]}.png">
                      </img>
                    </div>
                    <div class="panel-footer">
                      <button onClick="cancelKimAuction(${result[1]})"type="button" class="btn btn-primary center-block" style="margin-top: 9px;">Remove Listing</button>
                    </div>
                  </div>
                </div>
                `
              );
            }
          });
        }
      }
    });
  }

  // Kevin approved
  // Get users account number and display on user page.
  // WORKING
  function getUserAccount(){
    var accDisplay = $(".user-account");
    var currentUser = web3.eth.coinbase;

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

  // Kevin approved
  // Hide my kims account tab on the nav bar. might remove this later.
  // WORKING
  function hideAccountTab(){
    var currentUser = web3.eth.coinbase;
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

  // Kevin approved
  // Side log in pannel for meta mask
  // WORKING
  function ethereumPanel(){
    let currentUser = web3.eth.coinbase;
    var ethPanel = $('#ethereum-panel');

    if (currentUser == null ){
      ethPanel.append(
        `
        <div id="ethereum-panel" class="panel panel-default" style="position:fixed; top:10%; right:0%;">
          <div class="ethereum-panel-body" style="max-height:190px; width:250px;">
            <!-- make this part dynamic -->
            <h4>You are not connected! </h4>
            <a href="https://metamask.io/" target="_blank"><h4>Log-In to MetaMask!</h4></a>
          </div>
        </div>
        `
      );
    } else {
      var shortUser = currentUser.substring(0,10);
      ethPanel.append(
        `
        <div id="ethereum-panel" class="panel panel-default" style="position:fixed; top:10%; right:0%;">
          <div class="ethereum-panel-body" style="max-height:190px; width:250px;">
            <!-- make this part dynamic -->
            <h4>Connected To Ethereum </h4>
            <a href="/myKims"><h3>${shortUser}</h3></a>
          </div>
        </div>
        `
      );
    }
  }

  // Kevin approved
  // Search for kim function
  // NOT WORKING NOT IN USE
  function searchForKim(){
    var searchQuery = $('#searchQuery').val();
    // console.log(`SEARCHING FOR: ${searchQuery}`);
    var searchResult = $('#kim-searched-for');
    var kimName = "";


    Cryptokims.kimContract.tokenAuction.call(searchQuery, function(error,result) {
      if (error) {
        // console.log(error);
        console.log('error in get all kims probably wrong input');
      } else {
        kimName = result;
        // console.log(`++S+e+a+r+c+h+e+d+ +f+o+r++ ${searchQuery}`);
        // console.log(`++R+E+S+U+L+T+++ ${kimName}`);
        // console.log(`result[]`);
        // console.log(`${result[0]} -> true or false if for sale or not`);
        // console.log(`${result[1]} -> index`);
        // console.log(`${result[2]} -> seller address`);
        // console.log(`${result[3]} -> sell price in wei`);
        // console.log(`${result[4]} -> block number???`);
        searchResult.append(
          `
          <div class="col" style="float: left;width: 250px;margin: 1em;">
            <div class="panel panel-primary">
              <div class="panel-heading">
                <h3 class="text-center">Kim: #${result[1]}</h3>
              </div>
              <div class="panel-body">
                <img class="img-responsive center-block" onClick="giveModalValueHome(${result[1]})"  data-toggle="modal" data-target="#exampleModalCenter" src="https://gateway.ipfs.io/ipfs/QmNmCUgvsDKzQiqNFTyQR9cBFQyoJ1iG5p35eLJDorLAER/${result[1]}.png">
                </img>
              </div>
            </div>
          </div>
          `
        );
      }
    });
  }

  // ========================================================================================================
  // ========================================================================================================
  // ========================================================================================================
  // ========================================================================================================
  // ========================================================================================================
  // ====================================WORK IN PROGRESS====================================================
  // ========================================================================================================
  // ========================================================================================================
  // ========================================================================================================
  // ========================================================================================================
  // ========================================================================================================


  // get the balance of the current user wallet
  function getBalance() {
  let currentUser = web3.eth.coinbase;
  Cryptokims.kimContract.pendingWithdrawals(currentUser, function(error, result){
    if (error) {
      console.log(error);
    } else {
      console.log(error);
    }
  })
  }













  // new functions i created that are working hardcoded.
  // Get transaction reciept with txHash
  function getReciept(){
    let txHash = "0x2e6d2c2c4f26ab36fb9e2f9210e8d4efd38d0b518a9d07a735d149ef5bea7e2f";
    web3.eth.getTransactionReceipt(txHash, function(error, result){
        if(!error)
            console.log(result)
        else
            console.error(error);
    })
  }

  // Get the transaction history of a block with txHash
  function getTransactionHistory(){

    let input = "0x55d9ab29b103acedcc03ac7333da7fdf84ad1f398aba8e742e06b1fd63a3a9c4";
    web3.eth.getTransaction(input, function(error, result){
        if(!error)
            console.log(result)
        else
            console.error(error);
    })
  }

  // get a total count of a specific addresses total transactions
  function getUserTransactionsCount(){

    let currentUser = web3.eth.coinbase;
    web3.eth.getTransactionCount(currentUser, function(error,result){
      if(!error){
        console.log(result);
      } else {
        console.log(error);
      }
    });
  }

  function paginateClear(){
    var kimList = $("#kim_template");

    kimList.html("");
  }


  function paginateKims(amount){
    var kimsToLoop;
    var kimList = $("#kim_template");
    paginateClear();
    var kimsToLoop = 24;
    for (let i = 0; i < kimsToLoop; i++){
      Cryptokims.kimContract.tokenAuction((i+amount), function(error, result) {
        if (error) {
          console.log(error);
        } else {
          var saleStatus = result[0];
          var kimIndex = result[1];
          var ownerAddress = result[2];
          var priceETH = result[3];
          var sellPriceWei = web3.fromWei(priceETH, 'ether');
          var blockNum = result[4]['c'][0];

          Cryptokims.kimContract.tokenToOwner.call(i, function(error,result) {
            if (error) {
                console.log(error);
            } else {

              // console.log(`KIMINDEX: SALE STATUS ${saleStatus}. INDEX ${kimIndex}, ownerADDRESS ${ownerAddress}, blockNumber: ${blockNum}`);
              if (saleStatus === true){ //true so the kim is for sale.
                kimList.append(
                  `
                  <div class="card text-center" >
                    <div class="card-header bg-light">
                      Kim # ${kimIndex}
                    </div>
                    <img class="card-img-top" onClick="giveModalValueHome(${kimIndex})"  data-toggle="modal" data-target="#centralModalInfo"src="https://gateway.ipfs.io/ipfs/QmNmCUgvsDKzQiqNFTyQR9cBFQyoJ1iG5p35eLJDorLAER/${kimIndex}.png" alt="Card image cap">
                    <div class="card-body">
                      <p class="card-text">Price: ${sellPriceWei} ETH</p>
                      <button onClick="kimsForSaleModal(${kimIndex},${priceETH})" type="button" class="btn btn-primary btn-small center-block" data-toggle="modal" data-target="#centralModalInfo">Purchase</button>
                    </div>
                  </div>
                  `
                );
              } else {
                if(saleStatus === false){ //false means that its not for sale
                  kimList.append(
                    `
                    <div class="card text-center" >
                      <div class="card-header bg-light">
                        Kim # ${kimIndex}
                      </div>
                      <img class="card-img-top" onClick="giveModalValueHome(${i})"  data-toggle="modal" data-target="#centralModalInfo" src="https://gateway.ipfs.io/ipfs/QmNmCUgvsDKzQiqNFTyQR9cBFQyoJ1iG5p35eLJDorLAER/${kimIndex}.png" alt="Card image cap">
                      <div class="card-body">
                        <p class="card-text">Price: ${sellPriceWei} ETH</p>
                        <a href="#" class="btn btn-danger disabled">Kim is not for sale</a>
                      </div>
                    </div>
                      `
                  );
                }
              }
            }
          });
        }
      });
    }
  }

  function paginateLastKims(amount, remainder){
    var kimsToLoop;
    var kimList = $("#kim_template");
    paginateClear();
    var kimsToLoop = amount;
    for (let i = 0; i < remainder; i++){
      Cryptokims.kimContract.tokenAuction((i+amount), function(error, result) {
        if (error) {
          console.log(error);
        } else {
          var saleStatus = result[0];
          var kimIndex = result[1];
          var ownerAddress = result[2];
          var priceETH = result[3];
          var sellPriceWei = web3.fromWei(priceETH, 'ether');
          var blockNum = result[4]['c'][0];

          Cryptokims.kimContract.tokenToOwner.call(i, function(error,result) {
            if (error) {
                console.log(error);
            } else {

              // console.log(`KIMINDEX: SALE STATUS ${saleStatus}. INDEX ${kimIndex}, ownerADDRESS ${ownerAddress}, blockNumber: ${blockNum}`);
              if (saleStatus === true){ //true so the kim is for sale.
                kimList.append(
                  `
                  <div class="card text-center" >
                    <div class="card-header bg-light">
                      Kim # ${kimIndex}
                    </div>
                    <img class="card-img-top" onClick="giveModalValueHome(${kimIndex})"  data-toggle="modal" data-target="#centralModalInfo"src="https://gateway.ipfs.io/ipfs/QmNmCUgvsDKzQiqNFTyQR9cBFQyoJ1iG5p35eLJDorLAER/${kimIndex}.png" alt="Card image cap">
                    <div class="card-body">
                      <p class="card-text">Price: ${sellPriceWei} ETH</p>
                      <button onClick="kimsForSaleModal(${kimIndex},${priceETH})" type="button" class="btn btn-primary btn-small center-block" data-toggle="modal" data-target="#centralModalInfo">Purchase</button>
                    </div>
                  </div>
                  `
                );
              } else {
                if(saleStatus === false){ //false means that its not for sale
                  kimList.append(
                    `
                    <div class="card text-center" >
                      <div class="card-header bg-light">
                        Kim # ${kimIndex}
                      </div>
                      <img class="card-img-top" onClick="giveModalValueHome(${i})"  data-toggle="modal" data-target="#centralModalInfo" src="https://gateway.ipfs.io/ipfs/QmNmCUgvsDKzQiqNFTyQR9cBFQyoJ1iG5p35eLJDorLAER/${kimIndex}.png" alt="Card image cap">
                      <div class="card-body">
                        <p class="card-text">Price: ${sellPriceWei} ETH</p>
                        <a href="#" class="btn btn-danger disabled">Kim is not for sale</a>
                      </div>
                    </div>
                      `
                  );
                }
              }
            }
          });
        }
      });
    }
  }

function kimPagination(){
  var paginationTag = $('.pagination');

  Cryptokims.kimContract.kimsCreated(function(error, result) {
    if (error) {
      console.log(error);
    } else {
      var totalKims = result.c[0];
      var totalPages = totalKims/24
      var remainingKims = totalKims%24;
      var beforeRemainder = totalKims-remainingKims;

      totalPages = Math.floor(totalPages);


      for(var i = 0 ; i < totalPages ; i++){
        paginationTag.append(
          `
            <li class="page-item"><a class="page-link" onclick="paginateKims(${i*24});">${i+1}</a></li>
          `
        );
        var counter = i+1;
      }

      paginationTag.append(
        `
          <li class="page-item"><a class="page-link" onclick="paginateLastKims(${beforeRemainder},${remainingKims});">${counter+1}</a></li>
        `
      );
    }
  });
}
