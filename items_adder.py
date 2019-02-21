
from pprint import pprint as p

import json
from random import choice,randint,uniform


with open("items_raw.json","r") as f:
    catch = json.load(f)



for level1 in catch:
    for level2 in catch[level1]:
        for itemkey in catch[level1][level2]:
            item = catch[level1][level2][itemkey]
            item["store_name"]=choice(["storeA","storeB","storeC"])
            item["stars"] = "★"*randint(1,5)
            item["price"]  = randint(1,200)
            item["distance(km)"]=round(uniform(0,10),2)

#p(catch)


with open('items_result.json', 'w') as fp:
    json.dump(catch, fp)

