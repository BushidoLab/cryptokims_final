Cryptokims.kimContract.kimsCreated(1, function(error, result){
  if(error){
    console.log(error);
  } else {

  }
});


Cryptokims.kimContract.kimsCreated(function(error, result) {
  if (error) {
    console.log(error);
  } else {
    // $('#kim-title').text(result);
    // kimList.append("<li class='placeholder-kim'>"+ result +"</li>")
    // console.log(result.c[0]);
    console.log(result.c[0]);
    // var obj = {
    //   total: result.c[0]
    // };

  }
});

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






function currentUserKims() {
  var kimList = $(".current-user-kims");
  currentUser = web3.eth.coinbase;

  var kimsToLoop;
  Cryptokims.kimContract.kimsCreated(function(error, result) {
        if (error) {
          console.log(error);
        } else {
          kimsToLoop = result.c[0];
          console.log(`kimsToLoop(getUserKimsOnSale): ${kimsToLoop}`);

          for (let b = 0; b < kimsToLoop; b++){
            Cryptokims.kimContract.tokenAuction.call(b, function(error,result) {
              if (error) {
                console.log(error);
              } else {

                var saleStatus = result[0];
                var sellerAddress = result[2];

                if (sellerAddress === currentUser && saleStatus === true){
                  console.log(`You are selling kimIndex # ${result[1]}`);
                } else if (sellerAddress === currentUser && saleStatus === false) {
                  console.log(`You are not selling kimIndex # ${result[1]}, but you own it`);
                }
              }
            });
          }
        }
      });


}


Cryptokims.kimContract.kimsOnAuction.call(1, function(error,result) {
  if (error) {
      console.log(error);
  } else {
    // console.log(`is this ever used? ${result}`);
    // if (result[0] === true && result[2] !== currentUser)
    // add this to the if statement so that users kims are not shown for sale : && result[2] !== currentUser
    // result[0] -> true or false if for sale or not
    // result[1] -> index
    // result[2] -> seller address
    // result[3] -> sell price in wei
    // result[4] -> block number???

    console.log(result);
  }
});
