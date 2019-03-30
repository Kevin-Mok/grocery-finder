const mongoose = require('mongoose');
const Schema = mongoose.Schema

const StoreSchema = new Schema({
    name: String,
    address: String
})

const FoodSchema = new Schema({
    foodType: String,
    foodSubcategory: String,
    store: [{ type: Schema.ObjectId, ref: 'Store' }],
    price: Number
})

const Food = mongoose.model('Food', FoodSchema);
const Store = mongoose.model('Store', StoreSchema);

module.exports = {
  Food,
  Store
}
