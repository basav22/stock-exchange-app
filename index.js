// @ts-check
require('./site/index.html')

require('./site/style.css')


// Create a table instance
const CurrencyTable = require("./es6/currencyTable").default;
const stockTable = new CurrencyTable("stock-table");

// Create a stompsocketInstance
const StompSocket = require("./es6/stomp-socket").default;
const stompInstance = new StompSocket("ws://localhost:8011/stomp");

stompInstance.connect("/fx/prices", msg => {
    if(msg.body) {
        stockTable.updateTable(JSON.parse(msg.body))
    }
});

// stockTable.insertRow({ name: "curr1", bestBid: 2.3, bestAsk: 33 });
// stockTable.insertRow({ name: "curr1", bestBid: 2.3, bestAsk: 33 });
// stockTable.insertRow({ name: "curr1", bestBid: 2.3, bestAsk: 33});


