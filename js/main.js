// vars {{{ //

const log = console.log
// let curView = 'stores'
let curView = ''
let curViewBackup = ''

const grid = document.querySelector('#grid')
const gridRow = document.querySelector('#grid-row')
const gridItemsBackup = []

const searchBar = document.querySelector('#search-bar')
const clearSearchBtn = document.querySelector('#clear-search-btn')

// }}} vars //

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

function addDropdownDivider(menu) {
  const divider = document.createElement('div')
  divider.className = 'dropdown-divider'
  addItemToDropdown(menu, divider)
}

function addItemToDropdown(dropdown, item) {//{{{
  dropdown.querySelector('.dropdown-menu').appendChild(item)
}//}}}

function clearDropdownItems(dropdown) {//{{{
  removeAllChildren(dropdown.querySelector('.dropdown-menu')) 
}//}}}

// }}}  dropdown //

function compareFloats(a, b) {//{{{
  return (parseFloat(a) > parseFloat(b)) ? true : false;
}//}}}

// TODO: don't need divSelector - just grab all grid children? //
function sortGridByValue(divSelector, valueSelector, valueType, order, sortingLabelElems) {//{{{
  const divs = document.querySelectorAll(divSelector)
  const divsArray = []
  for (const div of divs) {
    divsArray.push(div)
  }
  divsArray.sort(function(a, b) {
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
    // log(aValue, bValue, aGreater)
    return aGreater

    switch (order) {
      case 'asc':
        // return (aValue > bValue) ? 1 : -1
        return (compareFloats(aValue, bValue)) ? 1 : -1
      case 'desc':
        // return (aValue > bValue) ? -1 : 1
        return (compareFloats(aValue, bValue)) ? -1 : 1
    }
  })

  clearGrid()
  for (const div of divsArray) {
    gridRow.appendChild(div)
  }

  const sortingLabel = document.querySelector('#sorting-label')
  removeAllChildren(sortingLabel)
  for (const sortingLabelElem of sortingLabelElems) {
    sortingLabel.appendChild(sortingLabelElem)
  }

}//}}}

function clearGrid() {
  document.querySelector('#category-instructions').style.display = 'none'
  removeAllChildren(gridRow)
}

function clearSearch() {
  clearGrid()
  for (const gridItem of gridItemsBackup) {
    gridRow.appendChild(gridItem)
  }
  searchBar.value = ''
  clearSearchBtn.style.display = 'none'
  curView = curViewBackup
}

function search(e) {
  const searchString = searchBar.value
  if (searchString != '') {
    switch (curView) {
      case 'stores':
        filterCalculatedStores(searchString)
        break
    }
    clearSearchBtn.style.display = 'block'
  }
}

function extractFloat(text) {//{{{
  // return parseFloat(/[0-9\.]+/g.exec(text)[0])
  return /[0-9\.]+/g.exec(text)[0]
}//}}}

window.onload = function() {//{{{
  gridRow.addEventListener('mouseover', showIconsOnFood);
  gridRow.addEventListener('mouseout', showIconsOnFood);
  gridRow.addEventListener('click', toggleFoodCartStatus);

  createFoodCategories(categories)
  // categoryList.addEventListener('click', changeCategory, true)
  document.querySelector('#all-items').addEventListener('click', changeCategory)
  categoryList.addEventListener('click', changeCategory)

  document.querySelector('#cart-btn').addEventListener('click', () => {
    curView = 'cart'
    displayFood(createCartFoodDict())
  })
  document.querySelector('#calc-btn').addEventListener('click', () => {
    curView = 'stores'
    displayStores(stores)
  })

  document.querySelector('#search-btn').addEventListener('click', search)
  document.querySelector('#clear-search-btn').addEventListener('click', clearSearch)

  curView = 'stores'
  displayStores(stores)
  // displayFood(all)

  // dropdown hover (jquery) {{{ //
  
  // The following code implements the feature where if you hover a dropdown
  // menu link, the dropdown options appear
  // https://stackoverflow.com/questions/50116307/how-to-make-hover-effect-instead-of-click-in-bootstrap-4-dropdown-menu
  $( ".dropdown" ).mouseover(function() {
      $( this ).addClass('show').attr('aria-expanded', "true");
      $( this ).find('.dropdown-menu').addClass('show');
  });

  $( ".dropdown" ).mouseout(function() {
    $( this ).removeClass('show').attr('aria-expanded', "false");
    $( this ).find('.dropdown-menu').removeClass('show');
  });
  
  // }}} dropdown hover (jquery) //
}//}}}
