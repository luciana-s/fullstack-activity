const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    description: { type: String, },
    inStock: { type: Boolean},
    name: { type: String},
    price: { type: Number},
});

module.exports = mongoose.model('Product', productSchema);