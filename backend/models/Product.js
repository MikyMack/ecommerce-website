const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    height: { type: Number, required: true },
    thickness: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    isListed: { type: Boolean, default: true }
});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);
