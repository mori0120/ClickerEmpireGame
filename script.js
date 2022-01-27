const config = {
    loginPage: document.getElementById("login-page"),
    mainPage: document.getElementById("main-page"),
    currentUser: null,
    gameRunning: null
}

class Item{
    constructor(name, type, maxAmount, price, amount, description, effectValue){
        this.name = name;
        this.type = type;
        this.maxAmount = maxAmount;
        this.price = price;
        this.amount = amount;
        this.description = description;
        this.effectValue = effectValue;
    }
}

class UserAccount{
    constructor(name, initialAge, money, earnPerClick, numOfBurgers, incomePerDay, days, assets){
        this.name = name;
        this.initialAge = initialAge;
        this.age = initialAge;
        this.money = money;
        this.earnPerClick = earnPerClick;
        this.numOfBurgers = numOfBurgers;
        this.incomePerDay = incomePerDay;
        this.days = days;
        this.assets = assets;
    }
}

const photos = {
    "Flip machine" : "https://cdn.pixabay.com/photo/2013/07/13/09/49/bbq-156093_1280.png",
    "ETF Stock" : "https://cdn.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg",
    "ETF Bonds" : "https://cdn.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg",
    "Lemonade Stand" : "https://cdn.pixabay.com/photo/2016/07/21/11/17/drink-1532300_1280.jpg",
    "Ice Cream Truck" : "https://cdn.pixabay.com/photo/2017/04/04/18/07/ice-cream-2202561_1280.jpg",
    "House" : "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg",
    "TownHouse" : "https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_1280.jpg",
    "Mansion" : "https://cdn.pixabay.com/photo/2017/08/19/00/44/palace-2656978_1280.jpg",
    "Industrial Space" : "https://cdn.pixabay.com/photo/2017/04/28/09/01/architecture-2267789__340.jpg",
    "Hotel Skyscraper" : "https://cdn.pixabay.com/photo/2016/12/22/18/20/skyline-1925943_1280.jpg",
    "Bullet-Speed Sky Railway" : "https://cdn.pixabay.com/photo/2017/08/07/23/00/transportation-2608894_1280.jpg"
}

// create each page

makeLoginPage();
makeGamePage();

// each functions

function initializeAssets(){
    let initialAssets = [
        new Item("Flip machine", "ability", 500, 15000, 0, "¥25 /click", 25),
        new Item("ETF Stock", "invest", 9999, 300000, 0, "¥0.1% /sec", 0.1),
        new Item("ETF Bonds", "invest", 9999, 300000, 0, "¥0.07% /sec", 0.07),
        new Item("Lemonade Stand", "real estate", 1000, 30000, 0, "¥30 /sec", 30),
        new Item("Ice Cream Truck", "real estate", 500, 100000, 0, "¥120 /sec", 120),
        new Item("House", "real estate", 100, 20000000, 0 ,"¥32000 /sec", 32000),
        new Item("TownHouse", "real estate", 100, 40000000, 0, "¥64000 /sec", 64000),
        new Item("Mansion", "real estate", 20, 250000000, 0, "¥500000 /sec", 500000),
        new Item("Industrial Space", "real estate", 10, 1000000000, 0, "¥2200000 /sec", 2200000),
        new Item("Hotel Skyscraper", "real estate", 5, 10000000000, 0, "¥25000000 /sec", 25000000),
        new Item("Bullet-Speed Sky Railway", "real estate", 1, 10000000000000, 0, "¥30000000000 /sec", 30000000000)
    ];

    return initialAssets;
}

function pageChange(currentPage, nextPage){
    currentPage.classList.remove("d-block");
    currentPage.classList.add("d-none");
    nextPage.classList.remove("d-none");
    nextPage.classList.add("d-block");
}

function makeLoginPage(){
    let form = document.getElementById("game-form");
    let newBtn = config.loginPage.querySelectorAll(".new-btn")[0];
    let loginBtn = config.loginPage.querySelectorAll(".login-btn")[0];
    let userName = form.userName.value;
    newBtn.addEventListener("click", function(event){
        event.preventDefault();
        let userName = form.userName.value;
        if(!userName){
            alert("Please write your name.");
            return false;
        }
        if(localStorage.getItem(userName) !== null){
            let res = confirm("This name is already used. Do you want to overwrite this name's data?");
            if(res === false) {
                return false;
            }
        }
        config.currentUser = new UserAccount(userName, 20, 50000, 25, 0, 0, 0, initializeAssets());
        let userEncode = JSON.stringify(config.currentUser);
        localStorage.setItem(userName, userEncode);
        pageChange(config.loginPage, config.mainPage);
        gameRun();
    });

    loginBtn.addEventListener("click", function(event){
        event.preventDefault();
        let userName = form.userName.value;
        if(!userName){
            alert("Please write your name.");
            return false;
        }
        if(localStorage.getItem(userName) === null){
            alert("There is no such a player.");
            return false;
        }
        console.log("The data is loading...")
        let userEncode = localStorage.getItem(userName);
        console.log("The loaded data is bellow.");
        console.log(userEncode);
        config.currentUser = JSON.parse(userEncode);
        pageChange(config.loginPage, config.mainPage);
        gameRun();
    });
}

function makeGamePage(){
    
    let workBtn = document.getElementById("work-btn");
    workBtn.addEventListener("click", function(){
        config.currentUser.money += config.currentUser.earnPerClick;
        config.currentUser.numOfBurgers++;
        console.log("You work!");
    });

    let saveBtn = document.getElementById("save-btn");
    let restartBtn = document.getElementById("restart-btn");
    let exitBtn = document.getElementById("exit-btn");

    saveBtn.addEventListener("click", function(){
        let res = confirm("Your data will be saved. OK?");
        if(!res) {
            return false;
        } else {
            let saveName = config.currentUser.name;
            let userEncode = JSON.stringify(config.currentUser);
            localStorage.setItem(saveName, userEncode);
            console.log("The data is saved.");
            console.log("The saved data is bellow.");
            console.log(userEncode);
            alert("The data is saved.");
        }
    });

    restartBtn.addEventListener("click", function(){
        let res = confirm("Your data will be delited and new game will start. OK?");
        if(!res) {
            return false;
        } else {
            let reName = config.currentUser.name;
            gameStop();
            gameRestart(reName);
        }
    });

    exitBtn.addEventListener("click", function(){
        let res = confirm("Do you want to exit this game? If you didn't save this data, your progress will be delited.");
        if(!res){
            return false;
        } else {  
            gameStop();
            pageChange(config.mainPage, config.loginPage);
            console.log("The game finish.");
        }
    });
}

function gameRun(){

    let optionWindos = document.getElementById("option-window");
    optionWindos.innerHTML = "";
    optionWindos.append(selectPage());

    config.gameRunning = setInterval(function(){
        document.getElementById("user-name").innerHTML = `<h5>Name: ${config.currentUser.name}</h5>`;
        document.getElementById("user-age").innerHTML = `<h5>Age: ${config.currentUser.age}</h5>`;
        document.getElementById("user-days").innerHTML = `<h5>Days: ${config.currentUser.days}</h5>`;
        document.getElementById("user-daily-income").innerHTML = `<h5>Unearned income: ¥${Math.floor(config.currentUser.incomePerDay * 1000)/1000}</h5>`;
        document.getElementById("user-money").innerHTML = `<h5>Your money: ¥${Math.floor(config.currentUser.money * 1000) / 1000}</h5>`;
        document.getElementById("earn-status").innerHTML = `<h5>${config.currentUser.numOfBurgers} Burgers</h5><h6>One Click ¥${config.currentUser.earnPerClick}</h6>`;
        config.currentUser.days++;
        config.currentUser.age = config.currentUser.initialAge + Math.floor(config.currentUser.days/365);
        config.currentUser.money += config.currentUser.incomePerDay;
        console.log("game is running..."+config.currentUser.days);
    },1000);
}


function gameStop() {
    clearInterval(config.gameRunning);
    console.log("The game stop.");
    config.gameRunning = null;
    config.currentUser = null;
}


function gameRestart(name){
    config.currentUser = new UserAccount(name, 20, 50000, 25, 0, 0, 0, initializeAssets());
    let newUserEncode = JSON.stringify(config.currentUser);
    localStorage.setItem(name, newUserEncode);
    console.log("The game restart.");
    gameRun();
}

function selectPage(){
    let container = document.createElement("div");
    for(let i=0; i<config.currentUser.assets.length; i++){
        let option = document.createElement("div");
        container.append(option);
        option.classList.add("bg-info", "d-flex", "align-items-center", "mb-1" ,"py-1" ,"hover");
        option.innerHTML = 
        `
        <div class="d-none d-sm-block col-sm-4 text-center"><img src=${photos[config.currentUser.assets[i].name]}></div>
        <div class="col-6 col-sm-5 text-left"><h5>${config.currentUser.assets[i].name}</h5><p>¥${config.currentUser.assets[i].price}</p></div>
        <div class="col-6 col-sm-3 text-right"><h5>${config.currentUser.assets[i].amount}</h5><p class="text-white">+ ${config.currentUser.assets[i].description}</p></div>        
        `;
        option.addEventListener("click", function(){
            container.innerHTML = "";
            container.append(purchasePage(i));
        });
    }
    return container;
}

function purchasePage(numOfItem){
    let container = document.createElement("div");
    let item = config.currentUser.assets[numOfItem];
    let total = 0;
    container.classList.add("bg-info", "d-flex", "flex-wrap", "text-left", "px-2", "py-4");
    container.innerHTML = 
    `
    <div class="col-12 mb-3"><h3>${item.name}</h3></div>
    <div class="col-6">
        <div><p>Price: ¥${item.price}</p></div>
        <div><p>Current Amount: ${item.amount}</p></div>
        <div><p>Max purchases: ${item.maxAmount}</p></div>
        <div><p>Effect: + ${item.description}</p></div>
    </div>
    <div class="col-6 text-center">
        <img src=${photos[item.name]}>
    </div>
    <div class="col-12 mt-3">
        <p>How many do you buy?</p>
    </div>
    <div class="col-12">
        <input id="num-purchase" type="number" placeholder="0" min="0" max="9999" style="width:100%;">
    </div>
    <div id="total-price" class="col-12 text-right">
        <p>total: ¥${total}</p>
    </div>
    <div class="col-6 pr-1">
        <button id="back-btn" class="btn btn-light btn-block">Go Back</button>
    </div>
    <div class="col-6 pl-1">
        <button id="purchase-btn" class="btn btn-secondary btn-block">Purchase</button>
    </div>
    `;

    let numInput = container.querySelectorAll("#num-purchase")[0];
    numInput.addEventListener("change", function(event){
        let amount = parseInt(event.target.value);
        if(amount<0){
            alert("Invalid amount!");
            event.target.value = 0;
            return false;
        }
        total = purchaseEstimation(item, amount);
        container.querySelectorAll("#total-price")[0].innerHTML=`<p>total: ¥${total}</p>`;
    });

    let backBtn = container.querySelectorAll("#back-btn")[0];
    backBtn.addEventListener("click", function(){
        backToSelectPage();
    });

    let purchaseBtn = container.querySelectorAll("#purchase-btn")[0];
    purchaseBtn.addEventListener("click", function(){
        let numOfPurchase = parseInt(numInput.value);
        if(item.maxAmount<item.amount+numOfPurchase){
            alert("You can't buy it any more.");
            return false;
        }
        if(total>config.currentUser.money){
            alert("You don't have enough money.");
            return false
        }
        if(!(numOfPurchase>0)) return false;
        config.currentUser.money -= purchaseEstimation(item, numOfPurchase);
        if(item.type==="ability"){
            config.currentUser.earnPerClick += item.effectValue*numOfPurchase;
        } else if(item.type === "invest") {
            config.currentUser.incomePerDay += purchaseEstimation(item, numOfPurchase) * item.effectValue;
        } else if(item.type === "real estate"){
            config.currentUser.incomePerDay += item.effectValue*numOfPurchase;
        }
        item.amount += numOfPurchase;
        if(item.name==="ETF Stock"){
            for(let i=0; i<numOfPurchase; i++){
                item.price = Math.floor(item.price * 1.1);
            }
        }
        backToSelectPage();
    });
    return container;
}

function backToSelectPage(){
    let optionWindos = document.getElementById("option-window");
    optionWindos.innerHTML = "";
    optionWindos.append(selectPage(config.currentUser));
}

function purchaseEstimation(item, numOfPurchase){

    let totalPrice = 0;
    let currentPrice = item.price;
    if(item.name==="ETF Stock"){
        for(let i=1; i<=numOfPurchase; i++){
            totalPrice += currentPrice;
            currentPrice = Math.floor(currentPrice * 1.1);
        }
    } else {
        totalPrice = currentPrice * numOfPurchase;
    }
    return totalPrice;
}
