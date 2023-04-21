'use strict';
const fetch = require('node-fetch');
const Stocks = require('../schemas/stock.js');
const bcrypt = require('bcrypt');

const getPrice = async (symbol, ip, liked) => {
  let url = `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${symbol}/quote`;
  let price, likes;

  // Get the price of the stock
  await fetch(url)
    .then(res => res.json())
    .then(item => {
      price = item.latestPrice;
    });

  // Get the like count for the stock
  let stock = await Stocks.findOne({ name: symbol });
  if (!stock) {
    const newStock = new Stocks({
      name: symbol,
      likes: [],
    });

    await newStock.save();
    stock = newStock;
  }

  likes = stock.likes.length;

  // Check if the user has already liked the stock
  if (liked === "true") {
    let checker = true;
    for (let i = 0; i < likes; i++) {
      await bcrypt.compare(ip, stock.likes[i]).then(res => {
        if (res) checker = false;
      })
    };

    if (checker) {
      bcrypt.hash(ip, 12, async (err, hash) => {
        stock.likes.push(hash);
        await stock.save();
      });
    };
  };

  // Return details about the stock
  return {
    symbol: symbol,
    price: price,
    likes: likes,
  };
};

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async (req, res) => {
      const stock = req.query.stock;
      const like = req.query.like;
      const ip = req.socket.remoteAddress;
      let data = [];

      if (Array.isArray(stock)) {
        let temp;
        for (let i = 0; i < 2; i++) {
          const query = await getPrice(stock[i], ip, like);

          temp.push(query.likes);
          data.push({
            symbol: query.symbol,
            price: query.price,
          });
        };

        data[1].rel_likes = temp[1] - temp[2];
        data[2].rel_likes = temp[2] - temp[1];

        return res.status(200).json({
          stockData: data,
        });
      };

      return res.status(200).json({
        stockData: await getPrice(stock, ip, like),
      });
    });

};
