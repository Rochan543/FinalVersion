// const paypal = require("paypal-rest-sdk");

// paypal.configure({
//   mode: "",
//   client_id: "",
//   client_secret: "",
// });

// module.exports = paypal;

const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "sb",
  client_secret: "sb",
});

module.exports = paypal;
