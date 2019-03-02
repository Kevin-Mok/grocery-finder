const cartPriceRange = {}
const storeDistRange = {}

// create store elems {{{ //

function createStoreDiv() {//{{{
  const storeDiv = document.createElement('div')
  storeDiv.className = 'store-div media col-xl-5 mx-auto'
  return storeDiv
}//}}}

function createStoreThumbnail(src) {//{{{
  const storeThumbnail = document.createElement('div')
  storeThumbnail.className = 'store-img-div media-left'

  const storeImg = document.createElement('img')
  storeImg.className = 'store-img media-object img-thumbnail'
  storeImg.src = src

  storeThumbnail.appendChild(storeImg)

  return storeThumbnail
}//}}}

function createStoreBody(name) {
  const storeBody = document.createElement('div')
  storeBody.className = 'store-body media-body'

  const storeHeader = document.createElement('h3')
  storeHeader.className = 'store-name media-heading'
  storeHeader.textContent = name

  const storeScoreParElem = document.createElement('p')
  storeScoreParElem.className = 'store-score-label'
  storeScoreParElem.textContent = "Score: "

  const storeScoreSpanElem = document.createElement('span')
  storeScoreSpanElem.className = 'store-score-value'
  storeScoreParElem.appendChild(storeScoreSpanElem)

  // cart price line {{{ //
  
  const cartPriceParElem = document.createElement('p')
  cartPriceParElem.className = 'cart-price-label'
  cartPriceParElem.textContent = "Cart Price: "

  const cartPriceSpanElem = document.createElement('span')
  cartPriceSpanElem.className = 'cart-price-value'
  cartPriceParElem.appendChild(cartPriceSpanElem)
  
  // }}} cart price line //

  // store dist line {{{ //
  
  const storeDistParElem = document.createElement('p')
  storeDistParElem.className = 'store-dist-label'
  storeDistParElem.textContent = "Store Distance: "

  const storeDistSpanElem = document.createElement('span')
  storeDistSpanElem.className = 'store-dist-value'
  storeDistParElem.appendChild(storeDistSpanElem)
  
  // }}} store dist line //

  storeBody.appendChild(storeHeader)
  storeBody.appendChild(storeScoreParElem)
  storeBody.appendChild(cartPriceParElem)
  storeBody.appendChild(storeDistParElem)

  return storeBody
}

/* function createStoreInfo(storeBody) {
  const cartPrice = document.createElement('p')
  cartPrice.textContent = name
} */

function resetRanges() {
  cartPriceRange.min = 9999
  cartPriceRange.max = 0

  storeDistRange.min = 999
  storeDistRange.max = 0
}

// }}} store //

// sorting options {{{ //

function createScoreDescIcon() {//{{{
  const scoreDescIcon = document.createElement('i')
  scoreDescIcon.className = "fas fa-sort-numeric-up"
  return scoreDescIcon
}//}}}

function setStoreSorting() {//{{{
  const sortingMenu = document.querySelector('#sorting-options')
  clearDropdownItems(sortingMenu)

  const scoreDescItem = createDropdownItem()
  scoreDescItem.appendChild(createScoreDescIcon())
  addItemToDropdown(sortingMenu, scoreDescItem)
  scoreDescItem.addEventListener('click', function(e) {
    sortStoresByValue('.store-score-value', 'desc', createScoreDescIcon()) 
  })

  const scoreAscItem = createDropdownItem()
  const scoreAscIcon = document.createElement('i')
  scoreAscIcon.className = "fas fa-sort-numeric-down"
  scoreAscItem.appendChild(scoreAscIcon)
  addItemToDropdown(sortingMenu, scoreAscItem)
  scoreAscItem.addEventListener('click', function() {
    sortStoresByValue('.store-score-value', 'asc', scoreAscIcon.cloneNode()) 
  })

}//}}}

function sortStoresByValue(valueSelector, order, sortingLabelIcon) {//{{{
  const storeDivs = document.querySelectorAll('.store-div')
  const storeDivsArray = []
  for (const storeDiv of storeDivs) {
    storeDivsArray.push(storeDiv)
  }
  storeDivsArray.sort(function(a, b) {
    const aValue = extractFloat(a.querySelector(valueSelector).textContent)
    const bValue = extractFloat(b.querySelector(valueSelector).textContent)
    log(aValue)
    switch (order) {
      case 'asc':
        return (aValue > bValue) ? 1 : -1
      case 'desc':
        return (aValue > bValue) ? -1 : 1
    }
  })

  clearFoodGrid()
  for (const storeDiv of storeDivsArray) {
    foodGridRow.appendChild(storeDiv)
  }

  const sortingLabel = document.querySelector('#sorting-label')
  removeAllChildren(sortingLabel)
  /* const scoreDescIcon = document.createElement('i')
  scoreDescIcon.className = "fas fa-sort-numeric-up" */
  sortingLabel.appendChild(sortingLabelIcon)

}//}}}

// }}} sorting options //

// show stores {{{ //

function generateRandomFloat(min, max) {//{{{
  return (Math.random() * (max - min) + min).toFixed(2)
}//}}}

function updateRange(value, range) {//{{{
  // TODO: pass in parsed value? //
  const parsedValue = parseFloat(value)
  if (parsedValue < range.min) {
    // log(parsedValue, '<', range.min)
    range.min = parsedValue
  } 
  if (parsedValue > range.max) {
    // log(parsedValue, '>', range.max)
    range.max = parsedValue
  }
}//}}}

function addRandomStoreInfo(storeBody) {//{{{
  const cartPriceValueElem = storeBody.querySelector('.cart-price-value')
  const storeDistValueElem = storeBody.querySelector('.store-dist-value')

  const cartPrice = generateRandomFloat(10, 50)
  const storeDist = generateRandomFloat(5, 50)

  cartPriceValueElem.textContent = cartPrice
  storeDistValueElem.textContent = storeDist

  updateRange(cartPrice, cartPriceRange)
  updateRange(storeDist, storeDistRange)
}//}}}

function hsv2rgb(h, s, v) {//{{{
  // http://jsfiddle.net/hqp1nmvr/
  var rgb, i, data = [];
  if (s === 0) {
    rgb = [v,v,v];
  } else {
    h = h / 60;
    i = Math.floor(h);
    data = [v*(1-s), v*(1-s*(h-i)), v*(1-s*(1-(h-i)))];
    switch(i) {
      case 0:
        rgb = [v, data[2], data[0]];
        break;
      case 1:
        rgb = [data[1], v, data[0]];
        break;
      case 2:
        rgb = [data[0], v, data[2]];
        break;
      case 3:
        rgb = [data[0], data[1], v];
        break;
      case 4:
        rgb = [data[2], data[0], v];
        break;
      default:
        rgb = [v, data[0], data[1]];
        break;
    }
  }
  return '#' + rgb.map(function(x){
    return ("0" + Math.round(x*255).toString(16)).slice(-2);
  }).join('');
}//}}}

function getPercentOfRange(value, range) {//{{{
  return (value - range.min) / (range.max - range.min)
}//}}}

function colorValuesByRange(valueElems, range) {//{{{
  // will color min value green and max value red
  for (const valueElem of valueElems) {
    // TODO: need to modify saturation/value values to get darker colors?
    // depends on bg //
    // https://stackoverflow.com/a/11850303/8811872 - 0 is green, 120 is red
    const hue = Math.floor((1 - getPercentOfRange(valueElem.textContent, range)) * 120)
    valueElem.style.color = hsv2rgb(hue, .8, .9)
  }
}//}}}

function addUnitToValues(valueElems, unit, frontOrBack) {//{{{
  for (const valueElem of valueElems) {
    const value = valueElem.textContent
    valueElem.textContent = (frontOrBack == 'front') ? unit + value : value + unit
  }
}//}}}

function addStoreScores() {//{{{
  const storeBodies = document.querySelectorAll('.store-body')
  for (const storeBody of storeBodies) {
    const cartPriceScore = 1 - getPercentOfRange(
      storeBody.querySelector('.cart-price-value').textContent, cartPriceRange) 
    const storeDistScore = 1 - getPercentOfRange(
      storeBody.querySelector('.store-dist-value').textContent, storeDistRange) 
    const storeScore = ((cartPriceScore + storeDistScore) / 2 * 10).toFixed(1)
    storeBody.querySelector('.store-score-value').textContent = storeScore
  }
}//}}}

function doStoreCalculations() {//{{{
  // calculate store scores, color values and add units
  
  // NOTE: calculations must be done before adding units since calculating
  // functions assume value elements will only have number and no units
  // surrounding it
  // TODO: use extractFloat() with with calculations? //
  addStoreScores()

  const cartPriceValueElems = document.querySelectorAll('.cart-price-value')
  const storeDistValueElems = document.querySelectorAll('.store-dist-value')
  const storeScoreValueElems = document.querySelectorAll('.store-score-value')

  colorValuesByRange(cartPriceValueElems, cartPriceRange)
  colorValuesByRange(storeDistValueElems, storeDistRange)
  colorValuesByRange(storeScoreValueElems, { min: 10, max: 0 })

  addUnitToValues(cartPriceValueElems, '$', 'front')
  addUnitToValues(storeDistValueElems, ' km', 'back')
  addUnitToValues(storeScoreValueElems, '/10.0', 'back')
}//}}}

function displayStores(storeDict) {//{{{
  clearFoodGrid()

  resetRanges()
  Object.keys(storeDict).forEach(function(key) {
    const storeDiv = createStoreDiv()
    storeDiv.id = 'store-div-' + key

    storeDiv.appendChild(createStoreThumbnail(storeDict[key]["img"]))

    const storeBody = createStoreBody(storeDict[key]["name"])
    addRandomStoreInfo(storeBody)
    storeDiv.appendChild(storeBody)
    // storeDiv.appendChild(createStoreInfo(storeDict[key]["name"]))

    foodGridRow.appendChild(storeDiv)
  })

  doStoreCalculations()

  curView = 'stores'
  sortStoresByValue('.store-score-value', 'desc', createScoreDescIcon())
  setStoreSorting()
}//}}}

// }}} show stores //
