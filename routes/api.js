'use strict';
const fetch   = require('node-fetch');
const Stocks  = require('../schemas/stock.js');
const bcrypt  = require('bcrypt');

// Function for getting the price of the stock
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
    stock: symbol,
    price: price,
    likes: likes,
  };
};

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async (req, res) => {
      const stock = req.query.stock
      const like = req.query.like;
      const ip = req.socket.remoteAddress;
      let data = [];

      //  If there is more than one stock
      if (Array.isArray(stock)) {
        let temp = [];
        for (let i = 0; i < 2; i++) {
          const query = await getPrice(stock[i].toUpperCase(), ip, like);

          temp.push(query.likes);
          data.push({
            stock: query.stock,
            price: query.price,
          });
        };

        // Get the difference of the likes
        data[0].rel_likes = temp[0] - temp[1];
        data[1].rel_likes = temp[1] - temp[0];

        return res.status(200).json({
          stockData: data,
        });
      };

      // If there is only one stock
      return res.status(200).json({
        stockData: await getPrice(stock.toUpperCase(), ip, like),
      });
    });

};
