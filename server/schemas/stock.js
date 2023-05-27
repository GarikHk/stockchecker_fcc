const mongoose = require('mongoose');

const StockSchemas = new mongoose.Schema({
    name: {
        type: String,
        requried: true,
    },
    likes: {
        type: [{type: String}],
        required: true,
        default: [],
    },
});

module.exports = mongoose.model('stocks', StockSchemas);