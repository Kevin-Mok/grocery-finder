const mongoose = require('mongoose');
const Schema = mongoose.Schema

const StoreSchema = new Schema({
    name: String,
    address: String,
    imgSrc: String
})

const FoodTypeSchema = new Schema({
    name: String,
    subcategory: String,
    imgSrc: String
})

const FoodSchema = new Schema({
    foodType: Schema.Types.ObjectId,
    store: Schema.Types.ObjectId,
    price: Number
})

const Food = mongoose.model('Food', FoodSchema);
const FoodType = mongoose.model('FoodType', FoodTypeSchema);
const Store = mongoose.model('Store', StoreSchema);

module.exports = {
  Food,
  FoodType,
  Store
}
