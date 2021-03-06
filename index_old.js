/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */

// This is not really required, but means that changes to index.html will cause a reload.
require('./site/index.html')
// Apply the styles in style.css to the page.
require('./site/style.css')

// if you want to use es6, you can do something like
//     require('./es6/myEs6code')
// here to load the myEs6code.js file, and it will be automatically transpiled.

// Change this to get detailed logging from the stomp library
global.DEBUG = false

const url = "ws://localhost:8011/stomp"
const client = Stomp.client(url);
client.debug = function(msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}
let subscription;
function connectCallback() {
  subscription = client.subscribe("/fx/prices", 
  (msg) => {
    console.log(JSON.parse(msg.body));
  });
}

setTimeout(() => subscription.unsubscribe(), 1500);


client.connect({}, connectCallback, function(error) {
  alert(error.headers.message)
})


//////////////// NEW CODE /////////////////
const table = require("./es6/table-operations");





const exampleSparkline = document.getElementById('example-sparkline')
Sparkline.draw(exampleSparkline, [1, 2, 3, 6, 8, 20, 2, 2, 4, 2, 3])