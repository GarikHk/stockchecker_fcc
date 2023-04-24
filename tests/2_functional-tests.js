const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const Stock = require('../schemas/stock.js');
const helmet = require('helmet');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  // Establish testing environment
  const ipAddress = '1.2.3.4';

  before(async () => {
    await Stock.deleteMany({});
  });

  beforeEach(async () => {
    await Stock.findOne({ name: "NKE" });
  });

  after(() => {
    return Stock.deleteOne({name: "TEST"});
  });

  // #1
  test("1) Viewing one stock: GET request to /api/stock-prices/", done => {
    chai
      .request(server)
      .get("/api/stock-prices/")
      .query({ stock: 'nke' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isString(res.body.stockData.stock);
        assert.isNumber(res.body.stockData.price);
        assert.isNumber(res.body.stockData.likes);
        assert.strictEqual(res.body.stockData.stock, "NKE");
        done();
      });
  });

  // #2
  test("2) Viewing one stock and liking it: GET request to /api/stock-prices/", done => {
    chai
      .request(server)
      .get("/api/stock-prices/")
      .query({ stock: 'nke', like: "true" })
      .set('X-Forwarded-For', ipAddress)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isString(res.body.stockData.stock);
        assert.isNumber(res.body.stockData.price);
        assert.isNumber(res.body.stockData.likes);
        assert.strictEqual(res.body.stockData.stock, "NKE");
        assert.strictEqual(res.body.stockData.likes, 0);
        done();
      });
  });

  // #3
  test("3) Viewing the same stock and liking it again: GET request to /api/stock-prices/", done => {
    chai
      .request(server)
      .get("/api/stock-prices/")
      .query({ stock: 'nke', like: "true" })
      .set('X-Forwarded-For', ipAddress)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isString(res.body.stockData.stock);
        assert.isNumber(res.body.stockData.price);
        assert.isNumber(res.body.stockData.likes);
        assert.strictEqual(res.body.stockData.stock, "NKE");
        assert.strictEqual(res.body.stockData.likes, 1);
        done();
      });
  });

  // #4
  test("4) Viewing two stocks: GET request to /api/stock-prices/", done => {
    chai
      .request(server)
      .get("/api/stock-prices")
      .query({ stock: ['nke', 'aapl']})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isArray(res.body.stockData);
        assert.strictEqual(res.body.stockData[0].stock, "NKE");
        assert.strictEqual(res.body.stockData[1].stock, "AAPL");
        assert.property(res.body.stockData[0], "rel_likes");
        done();
      });
  });

  // #5
  test("5) Viewing two stocks and liking them: GET request to /api/stock-prices/", done => {
    chai
      .request(server)
      .get("/api/stock-prices/")
      .query({stock: ["GOOG", "MSFT"], like: "true"})
      .set('X-Forwarded-For', ipAddress)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isArray(res.body.stockData);
        assert.strictEqual(res.body.stockData[0].stock, "GOOG");
        assert.strictEqual(res.body.stockData[1].stock, "MSFT");
        assert.strictEqual(res.body.stockData[0].rel_likes, res.body.stockData[1].rel_likes);
        done();
      });
  });
});
