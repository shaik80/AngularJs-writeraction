const express = require("express");
let router = express();
let stock_data = require("../utils/stockData/stock.json");

router.get("/", (req, res) => {
  try {
    res.send(stock_data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
