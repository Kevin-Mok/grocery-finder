
from pprint import pprint as p

import json
from random import choice,randint,uniform
r = {}


names=["Mary","Jack","David","Gadian","Lucas"]
passwords=["1298sx","sawx","eaeff","rge5","wgr"]
for i in range(5):
    sub={}
    sub["username"]=names[i]
    sub["password"]=passwords[i]
    sub["administrator"]=choice([True,False])
    r[i]=sub    

r = json.dumps(r)

p(r)
