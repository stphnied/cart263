/**
Project 2: Gachapyon
Stephanie Dang.

This script is dedicated to loading and keeping track of money-data
*/

let data;
let money;

// If there's no data: set the money count to 5$
//  Else : reloads the datra
function checkData() {
    // No data:
    if (localStorage.getItem("money-data", money) == null) {
        money = 5;
        localStorage.setItem("money-data", JSON.stringify(money));

        // Gives 5 coins : 1$ X2 & 2$ x1
        for (let i = 0; i < 3; i++) {
            $(`<img>`).attr(`src`, `assets/images/coins/coin-1.png`).addClass(`coin coin-1`).appendTo(`.coins`);
        }
        $(`<img>`).attr(`src`, `assets/images/coins/coin-2.png`).addClass(`coin coin-2`).appendTo(`.coins`);
    }
    // Saved Data:
    else if (localStorage.getItem("money-data", money) !== null) {
        localStorage.getItem("money-data", money);
        addPreviousCoins();
    }

    // create another var to update the money count
    data = JSON.parse(localStorage.getItem("money-data"));
}


// Adding coins depending if there is data or not
// If no data  :5$
// Else if there is data, adding accordingly
function addPreviousCoins() {
    // store the previous amount in a variable
    let previousAmount = parseInt(localStorage.getItem("money-data"));

    // Previous number is odd and not 1
    if (previousAmount % 2 !== 0 && previousAmount !== 1) {
        for (let i = 0; i < parseInt(previousAmount / 2); i++) {
            // 2 coins
            $(`<img>`).attr(`src`, `assets/images/coins/coin-2.png`).addClass(`coin coin-2`).appendTo(`.coins`);
        }
        // 1 coins
        $(`<img>`).attr(`src`, `assets/images/coins/coin-1.png`).addClass(`coin coin-1`).appendTo(`.coins`);
    }

    // Previous number is 1
    else if (previousAmount == 1) {
        // 1 coins
        $(`<img>`).attr(`src`, `assets/images/coins/coin-1.png`).addClass(`coin coin-1`).appendTo(`.coins`);
    }

    // Previous number is even
    else if (previousAmount % 2 !== 0)
        for (let i = 0; i < previousAmount; i++) {
            $(`<img>`).attr(`src`, `assets/images/coins/coin-2.png`).addClass(`coin coin-2`).appendTo(`.coins`);
        }
}

// Updates the user's money
function updateData(amount) {
    data = amount;
    localStorage.setItem("money-data", JSON.stringify(data));
}

// Display the updated user's wallet
function updateMoneyText() {
    $(`.walletMoneyTxt`).text(`CURRENT BALANCE = ` + data + `$`);
    $(`.insertCoinsTxt`).text(`COIN INSERTED = ` + insertedCoins + `$`);
}