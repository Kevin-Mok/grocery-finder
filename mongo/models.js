const mongoose = require('mongoose');
const Schema = mongoose.Schema

const StoreSchema = new Schema({
    name: String,
    address: String
})

const FoodSchema = new Schema({
    foodType: String,
    foodSubcategory: String,
    store: Schema.Types.ObjectId,
    price: Number,
    imgSrc: String
})

const Food = mongoose.model('Food', FoodSchema);
const Store = mongoose.model('Store', StoreSchema);

module.exports = {
  Food,
  Store
}
