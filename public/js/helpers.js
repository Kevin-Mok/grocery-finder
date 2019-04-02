// This file was defines helper functions and variables used by many pages. 

// vars {{{ //

const log = console.log
let curView = ''
let curViewBackup = ''
let curSearchSelector = ''

const grid = document.querySelector('#grid')
const gridRow = document.querySelector('#grid-row')
const gridItemsBackup = []

// }}} vars //

// float fxn's {{{ //
function compareFloats(a, b) {//{{{
  return (parseFloat(a) >= parseFloat(b)) ? true : false;
}//}}}

function extractFloat(text) {//{{{
  // return parseFloat(/[0-9\.]+/g.exec(text)[0])
  return /[0-9\.]+/g.exec(text)[0]
}//}}}

// }}} float fxn's //

// grid {{{ //

// TODO: don't need divSelector - just grab all grid children? //
function sortGridByValue(divSelector, valueSelector, valueType, order, sortingLabelElems) {//{{{
  const divs = document.querySelectorAll(divSelector)
  const divsArray = []
  for (const div of divs) {
    divsArray.push(div)
  }
  divsArray.sort(function (a, b) {
    let aValue, bValue
    let aGreater = 0
    switch (valueType) {
      case 'float':
        aValue = extractFloat(a.querySelector(valueSelector).textContent)
        bValue = extractFloat(b.querySelector(valueSelector).textContent)
        aGreater = (compareFloats(aValue, bValue)) ? 1 : -1
        break
      default:
        aValue = a.querySelector(valueSelector).textContent
        bValue = b.querySelector(valueSelector).textContent
        aGreater = (aValue > bValue) ? 1 : -1
        break
    }

    if (order == 'desc') {
      aGreater *= -1
    }
    return aGreater

    /* switch (order) {
      case 'asc':
        return (compareFloats(aValue, bValue)) ? 1 : -1
      case 'desc':
        return (compareFloats(aValue, bValue)) ? -1 : 1
    } */
  })

  clearGrid()
  for (const div of divsArray) {
    gridRow.appendChild(div)
  }

  const sortingLabel = document.querySelector('#sorting-label')
  if (!sortingLabel) {
    return;
  }
  removeAllChildren(sortingLabel)
  for (const sortingLabelElem of sortingLabelElems) {
    sortingLabel.appendChild(sortingLabelElem)
  }

}//}}}

function clearGrid() {//{{{
  removeAllChildren(gridRow)
}//}}}

// }}} grid //

// search {{{ //

function returnSearchBar(size) {//{{{
  return (size == 'lg') ? document.querySelector('#search-bar-lg') :
    document.querySelector('#search-bar-sm')
}//}}}

function returnClearSearchBtn(size) {//{{{
  return (size == 'lg') ? document.querySelector('#clear-search-btn-lg') :
    document.querySelector('#clear-search-btn-sm')
}//}}}

function clearSearch(size) {//{{{
  clearGrid()
  for (const gridItem of gridItemsBackup) {
    gridRow.appendChild(gridItem)
  }
  returnSearchBar(size).value = ''
  returnClearSearchBtn(size).style.display = 'none'
  curView = curViewBackup

  // log(curView, curViewBackup)
}//}}}

function filterCurrentGridItems(textSelector, searchString) {//{{{
  curSearchSelector = textSelector
  const gridDivs = gridRow.children
  const matchingDivsArray = []

  gridItemsBackup.length = 0
  let itemName = ''
  for (const gridDiv of gridDivs) {
    gridItemsBackup.push(gridDiv)
    itemName = gridDiv.querySelector(textSelector).textContent.toLowerCase()
    if (itemName.includes(searchString)) {
      matchingDivsArray.push(gridDiv)
    }
  }

  clearGrid()
  for (const matchingDiv of matchingDivsArray) {
    gridRow.appendChild(matchingDiv)
  }

  // TODO: is this even correct? //
  if (curView != 'search') {
    curViewBackup = curView
    curView = 'search'
  }
}//}}}

function filterGridItemsBackup(searchString) {//{{{
  const matchingDivsArray = []

  let itemName = ''
  for (const div of gridItemsBackup) {
    itemName = div.querySelector(curSearchSelector).textContent.toLowerCase()
    if (itemName.includes(searchString)) {
      matchingDivsArray.push(div)
    }
  }

  clearGrid()
  for (const matchingDiv of matchingDivsArray) {
    gridRow.appendChild(matchingDiv)
  }
  curView = 'search'
}//}}}

function search(size) {//{{{

  // Make search string all lowercase, for case insensitivity
  const searchString = returnSearchBar(size).value.toLowerCase();
  // log(searchString, curView, curViewBackup)
  if (searchString != '') {
    switch (curView) {
      case 'stores':
        filterCurrentGridItems('.store-name', searchString)
        break
      case 'food':
        filterCurrentGridItems('.food-info', searchString)
        break
      case 'search':
        filterGridItemsBackup(searchString)
        break
    }
    returnClearSearchBtn(size).style.display = 'block'
  } else {
    clearSearch(size)
  }
}//}}}

// }}} search //

const createGetRequest = url => { 
  return new Request(url, {
    method: 'get', 
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  })
}

// do these when page is loaded {{{ //

function onclickToAll(selector, fxn) {//{{{
  document.querySelectorAll(selector).forEach(btn =>
    btn.addEventListener('click', e => {
      e.preventDefault()
      fxn()
    }))
}//}}}

// dropdown {{{ //

function createDropdownMenu() {//{{{
  const dropdownMenu = document.createElement('li')
  dropdownMenu.className = "nav-item dropdown pointer"

  const dropdownLabel = document.createElement('a')
  dropdownLabel.className = 'dropdown-label nav-link dropdown-toggle'
  dropdownLabel.setAttribute('data-toggle', 'dropdown')

  const dropdown = document.createElement('div')
  dropdown.className = 'dropdown-menu'

  dropdownMenu.appendChild(dropdownLabel)
  dropdownMenu.appendChild(dropdown)

  return dropdownMenu
}//}}}

function createDropdownItem() {//{{{
  const dropdownItem = document.createElement('a')
  dropdownItem.className = 'dropdown-item pointer'
  dropdownItem.setAttribute('data-toggle', 'dropdown')

  return dropdownItem
}//}}}

function createDropdownIconItem(iconClassesList) {//{{{
  const dropdownItem = createDropdownItem()
  dropdownItem.classList.add('icon-label-option')

  for (const iconClasses of iconClassesList) {
    const icon = document.createElement('i')
    icon.className = iconClasses
    dropdownItem.appendChild(icon)
  }

  return dropdownItem
}//}}}

function addSortingOption(option, menu, onclick) {//{{{
  addItemToDropdown(menu, option)
  option.addEventListener('click', onclick)
}//}}}

function addDropdownDivider(menu) {//{{{
  const divider = document.createElement('div')
  divider.className = 'dropdown-divider'
  addItemToDropdown(menu, divider)
}//}}}

function addItemToDropdown(dropdown, item) {//{{{
  dropdown.querySelector('.dropdown-menu').appendChild(item)
}//}}}

function clearDropdownItems(dropdown) {//{{{
  removeAllChildren(dropdown.querySelector('.dropdown-menu'))
}//}}}

// }}}  dropdown //

function extractSortingLabelIcons(e) {//{{{
  const labelIconElems = (e.target.classList.contains('icon-label-option') ?
    e.target : e.target.parentElement).children
  const labelIcons = []
  for (const labelIcon of labelIconElems) {
    labelIcons.push(labelIcon.cloneNode())
  }
  return labelIcons
}//}}}

/**
 * Returns an array of FoodType ids that are currently in 
 * the cart
 */
function getCartFoodTypeIds() {
  const request = createGetRequest('/get_cart')
  return fetch(request).then(function(res) {
    if (res.status === 401) {
      let cart = localStorage.getItem('cart') ? localStorage.getItem('cart').split(',') : []
      return Promise.resolve(cart)
    }
    return res.json()
  })
}
