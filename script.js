let profile  = {
    'age': 18,
    'money': 1000,
    'paycheck': 4800,
    'funYears': 0,
}

let nikeStock = {
    'name': 'Nike',
    'risk': 1,
    'price': 75,
    'movement': 0,
    'shares': 0,
    'minPrice': 37,
    'maxPrice': 112,
}

let teslaStock = {
    'name': 'Tesla',
    'risk': 3,
    'price': 500,
    'movement': 0,
    'shares': 0,
    'minPrice': 250,
    'maxPrice': 750,
}

let bitcoinStock = {
    'name': 'Bitcoin',
    'risk': 5,
    'price': 10000,
    'movement': 0,
    'shares': 0,
    'minPrice': 5000,
    'maxPrice': 15000,
}


let stocks = [nikeStock, teslaStock, bitcoinStock]
let selectedStock = stocks[0]

let ageText = document.getElementById('ageText');
let moneyText = document.getElementById('moneyText');

let nikePrice = document.getElementById('nikePrice');
let nikeRisk = document.getElementById('nikeRisk');
let nikeShares = document.getElementById('nikeShares');
let nikeMove = document.getElementById('nikeMove');
let nikeName = document.getElementById('nikeName');

let teslaPrice = document.getElementById('teslaPrice');
let teslaRisk = document.getElementById('teslaRisk');
let teslaShares = document.getElementById('teslaShares');
let teslaMove = document.getElementById('teslaMove');
let teslaName = document.getElementById('teslaName');

let bitcoinPrice = document.getElementById('bitcoinPrice');
let bitcoinRisk = document.getElementById('bitcoinRisk');
let bitcoinShares = document.getElementById('bitcoinShares');
let bitcoinMove = document.getElementById('bitcoinMove');
let bitcoinName = document.getElementById('bitcoinName')

let stockAmount = document.getElementById('stockAmount');
let stockAction = document.getElementById('stockAction');
let amountText = document.getElementById('amountText');

let endModal = document.getElementById('endModal');
let ageRecap = document.getElementById('ageRecap');
let moneyRecap = document.getElementById('moneyRecap');
let funRecap = document.getElementById('funRecap');

let workButton = document.getElementById('workButton');
let funButton = document.getElementById('funButton');
let restartButton = document.getElementById('restartButton');

workButton.addEventListener('click', work);
funButton.addEventListener('click', fun);
stockAction.addEventListener('click', () => {
    useStock(stockAmount.value);
})
restartButton.addEventListener('click', () => {
    location.reload()
})

let stockSelect = document.getElementById('stockSelect')
stockSelect.addEventListener('change', updateSelect)

function work() {

    if(profile.age < 100) {
        profile.money += profile.paycheck;
        profile.age ++;
        newPrice();
    } else {
        EndGame();
    }
}

function fun() {

    if (profile.age < 100) {
        profile.age ++;
        profile.funYears ++;
        newPrice();
    } else {
        EndGame();
    }
}

function newPrice() {
    for (s in stocks) {
        var priceRange = Math.ceil(stocks[s].price / 100 * 10) * stocks[s].risk;

        var sDir = 50;
        var dprice = stocks[s].price;

        if(stocks[s].price < stocks[s].minPrice) {
            sDir -= stocks[s].minPrice;
        } else if (stocks[s].price > stocks[s].maxPrice) {
            sDir += stocks[s].maxPrice
        }

        if (Math.floor(Math.random() * 100) >= sDir){
            dprice = stocks[s].price + getRandomNumberInRange(0, priceRange);
        } else {
            dprice = stocks[s].price - getRandomNumberInRange(0, priceRange);
        }

        stocks[s].movement = 100 - Math.floor((stocks[s].price / dprice) * 100)
        stocks[s].price = dprice; 
        updateMoveColor();
    }
}

function EndGame() {
    endModal.classList.add('is-active')

    ageRecap.innerText = profile.age;

    if (profile.money > 0){
        moneyRecap.classList.add('is-success');
    } else {
        moneyRecap.classList.add('is-danger');
    }

    moneyRecap.innerText = numberWithSpaces(profile.money);
    funRecap.innerText = profile.funYears;
}

function useStock(amount) {
    profile.money -= selectedStock.price * amount;
    selectedStock.shares += parseInt(amount);
}

function updateSelect(){
    switch (stockSelect.value){
        case 'Nike':
            selectedStock = stocks[0];
            break;
        case 'Tesla':
            selectedStock = stocks[1];
            break;
        case 'Bitcoin':
            selectedStock = stocks[2];
            break;
    }
}

function updateMoveColor() {
    if(nikeStock.movement >= 0){
        nikeMove.classList.remove('has-text-danger');
        nikeMove.classList.add('has-text-success');
    } else {
        nikeMove.classList.remove('has-text-success');
        nikeMove.classList.add('has-text-danger');
    }

    if(teslaStock.movement >= 0){
        teslaMove.classList.remove('has-text-danger');
        teslaMove.classList.add('has-text-success');
    } else {
        teslaMove.classList.remove('has-text-success');
        teslaMove.classList.add('has-text-danger');
    }

    if(bitcoinStock.movement >= 0) {
        bitcoinMove.classList.remove('has-text-danger');
        bitcoinMove.classList.add('has-text-success');
    } else {
        bitcoinMove.classList.remove('has-text-success');
        bitcoinMove.classList.add('has-text-danger')
    }

}

function updateStockAmount() {

    stockAmount.min = -selectedStock.shares
    stockAmount.max = Math.floor(profile.money / selectedStock.price)

    if(stockAmount.value > 0) {
        stockAction.innerText = "Buy"
        stockAction.disabled = false
    } else if (stockAmount.value < 0) {
        stockAction.innerText = "Sell"
        stockAction.disabled = false
    } else {
        stockAction.disabled = true
    }
}

function Update(){
    ageText.innerText = profile.age;
    moneyText.innerText = numberWithSpaces(profile.money);;

    nikeRisk.innerText = 'Risk ' + nikeStock.risk + "/5";
    nikePrice.innerText = nikeStock.price;

    nikeMove.innerText = nikeStock.movement + '%';
    nikeShares.innerText = nikeStock.shares;
    nikeName.innerText = nikeStock.name;

    teslaRisk.innerText = 'Risk ' + teslaStock.risk + "/5";
    teslaPrice.innerText = teslaStock.price;
    teslaMove.innerText = teslaStock.movement + '%';
    teslaShares.innerText = teslaStock.shares;
    teslaName.innerText = teslaStock.name;

    bitcoinRisk.innerText = 'Risk ' + bitcoinStock.risk + '/5';
    bitcoinPrice.innerText = bitcoinStock.price;
    bitcoinMove.innerText = bitcoinStock.movement + '%';
    bitcoinShares.innerText = bitcoinStock.shares;
    bitcoinName.innerText = bitcoinStock.name; 

    amountText.innerText = stockAmount.value;

    updateStockAmount()
}

function getRandomNumberInRange(min,max) {
    return min + Math.ceil(Math.random() * (max-min));
}

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

setInterval(Update, 100);