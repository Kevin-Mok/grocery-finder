const db = connect("mongodb://localhost:27017/GroceryAPI")
const stores = db.stores.find()

while (stores.hasNext()) {
  printjson(stores.next())
}
print(stores.count())
