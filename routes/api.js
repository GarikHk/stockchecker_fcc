'use strict';
const fetch = require('node-fetch');

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async (req, res) => {
      const stock = req.query.stock;

      const getPrice = async (symbol) => {
        let url = `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${symbol}/quote`;
        let price;

        await fetch(url)
          .then(res => res.json())
          .then(item => {
            price = item.latestPrice;
          });

        return {
          symbol: symbol,
          price: price,
        };
      };

      if (Array.isArray(stock)) {
        if (stock.length === 2) {
          console.log("Two Elements");
        } else console.log("error");
      };

      res.status(200).json({
        stockData: await getPrice(stock),
      });
    });

};
