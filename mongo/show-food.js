const db = connect("mongodb://localhost:27017/GroceryAPI")
const foods = db.foods.find()

while (foods.hasNext()) {
  printjson(foods.next())
}
