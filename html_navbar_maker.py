

from pprint import pprint as p


outer="""
<div class="w3-dropdown-hover w3-xlarge" style="float:right;">
                <button class="w3-padding-large w3-button" title="More" style="height: 75px;font-size:20px;">{}</button>
                <div class="w3-dropdown-content w3-bar-block w3-card-4">
                    
                    {}
                    
                </div>
            </div>

"""
inner="""
<a href="#" class="w3-bar-item w3-button w3-xlarge">{}</a>
"""


nad=[
["Fruits and Vegetables",["All","Fruits","Vegetables","Fresh Cut Fruits and Vegetables","Dried Nuts","Ethnic Vegetables"]],
["Bakery",["Fresh Bread","Cakes","Pastries","Brownies","Cookies"]],
["Dairy and Eggs",["Milk","Cheese","Yogurt","Butter and Spreads","Desserts"]],
["Drinks",["Coffee","Tea","Water","Juice","Sports and Energy Drinks"]],
["Frozen Food",["Meals","Meat","Ice Cream"]], 
["Meat and Seafood",["Beef and Veal","Chicken and Turkey","Pork","Lamb and Goat","Seafood"]]
 ]
	

for i in range(len(nad)):
    sup = nad[i][0]
    subs= nad[i][1]
    subtext=""
    for j in range(len(subs)):
        sub = subs[j]
        subtext += inner.format(sub)
    suptext = outer.format(sup,subtext)
    print(suptext)
        	
	
