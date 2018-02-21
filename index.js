// @ts-check
require('./site/index.html')

require('./site/style.css')



// Create a table instance
const CurrencyTable = require("./es6/currencyTable").default;
const stockTable = new CurrencyTable({templateId: "stock-table", tableId:"currency-table"});

// Create a stompsocketInstance
const StompSocket = require("./es6/stomp-socket").default;
const stompInstance = new StompSocket("ws://localhost:8011/stomp");

stompInstance.connect("/fx/prices", msg => {
    if(msg.body) {
        const socketData = JSON.parse(msg.body);
        Object.assign(socketData, socketData, {timestamp: new Date().valueOf()})
        stockTable.updateTable(socketData);
    }
});

