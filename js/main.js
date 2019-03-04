const log = console.log
// let curView = 'stores'
let curView = ''

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

function compareFloats(a, b) {
  return (parseFloat(a) > parseFloat(b)) ? true : false;
}

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

  clearFoodGrid()
  for (const div of divsArray) {
    foodGridRow.appendChild(div)
  }

  const sortingLabel = document.querySelector('#sorting-label')
  removeAllChildren(sortingLabel)
  for (const sortingLabelElem of sortingLabelElems) {
    sortingLabel.appendChild(sortingLabelElem)
  }

}//}}}

function extractFloat(text) {//{{{
  // return parseFloat(/[0-9\.]+/g.exec(text)[0])
  return /[0-9\.]+/g.exec(text)[0]
}//}}}

window.onload = function() {//{{{
  foodGridRow.addEventListener('mouseover', showIconsOnFood);
  foodGridRow.addEventListener('mouseout', showIconsOnFood);
  foodGridRow.addEventListener('click', toggleFoodCartStatus);

  createFoodCategories(categories)
  categoryList.addEventListener('click', changeCategory, true)

  document.querySelectorAll('.cart-btn').forEach(cartBtn => {
    cartBtn.addEventListener('click', function() {
      curView = 'cart'
      displayFood(createCartFoodDict())
    })
  })
  document.querySelectorAll('.calc-btn').forEach(calcBtn => {
    calcBtn.addEventListener('click', function() {
    // calcBtn.addEventListener('click', function(e) {
      // log(e.target)
      curView = 'stores'
      displayStores(stores)
    })
  })

  // displayStores(stores)
  // displayFood(all)
  foodGridRow.appendChild(createEtf('Test', 'test', 4, 20))
  openSettingsPopup()

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
