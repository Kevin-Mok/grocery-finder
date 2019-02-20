

text="""
<div class="item">
            <img class="itempic" src="imgs/img{imgnum}.jpg" alt="something at here">

            <div class="infos">
                <div class="infopiece">${price}</div>
                <br>
                <div class="infopiece">{star}</div>
                <br>
                <div class="infopiece">{date}</div>
                </div>
            
            <div class="panels">
                <span class="panel1">delete</span>
                
                <span class="panel2">buy</span>
                
                <span class="panel3">add<br>chart</span>
            </div>    
            <div class="userimgholder">
                <img class="userimg" src="imgs/img{uimg}.jpg" alt="something at here">
            </div>
        </div>
"""
from random import randint
for i in range(11):

    price = randint(0,3000)
    star=randint(1,5)*"★"
    date = "{}-{}-{}".format(randint(2010,2019),randint(1,12),randint(1,31))
    s =text.format(imgnum=i,price=price,star=star,date=date,uimg=i) 
    print(s)

