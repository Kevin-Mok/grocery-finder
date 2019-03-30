function createEtf(label, initialValue, minLength, maxLength, censor=false) {//{{{
  const etfElem = document.createElement('div')
  etfElem.className = 'etf-div d-flex flex-row'
  etfElem.id =  'etf-' + label.replace(/\s+/g, '-').toLowerCase()
  etfElem.innerHTML = `
    <strong class='etf-label'>${label}:&nbsp;</strong><span class='etf-value'>${initialValue}</span>
    <input class='etf-input' type='${!censor ? 'text' : 'password'}' value='${initialValue}' style='display: none;'>
    <div class="etf-btn-div ml-auto" style='display: inline;'>
      <button class='etf-edit-btn btn btn-info'>
        <i class="fas fa-pen"></i>
      </button>
      <button class='etf-save-btn btn btn-success' style='display: none;'>
        <i class="fas fa-check"></i>
      </button>
      <button class='etf-cancel-btn btn btn-danger' style='display: none;'>
        <i class="fas fa-times"></i>
      </button>
    </div>
    `
  etfElem.querySelector('.etf-edit-btn').addEventListener('click',
    toggleEditEvent);
  etfElem.querySelector('.etf-save-btn').addEventListener('click', (e) =>
    saveEtfInput(e, minLength, maxLength, censor));
  etfElem.querySelector('.etf-cancel-btn').addEventListener('click',
    toggleEditEvent);
  // toggleEditMode(etfElem)
  return etfElem
}//}}}

function toggleEtfElemDisplay(elem) {//{{{
  elem.style.display = (elem.style.display == 'none') ? 'inline' : 'none'
}//}}}

const selectorsToToggleEdit = [//{{{
  '.etf-value', 
  '.etf-edit-btn', 
  '.etf-input',
  '.etf-save-btn',
  '.etf-cancel-btn',
  ]//}}}

function getEtfElemFromEvent(e) {
  const etfBtnDiv = e.target.parentElement
  if (etfBtnDiv.classList.contains('etf-btn-div')) {
    return etfBtnDiv.parentElement
  }
}

function toggleEditEvent(e) {
  toggleEditMode(getEtfElemFromEvent(e))
}

function toggleEditMode(etfElem) {//{{{
  for (const selector of selectorsToToggleEdit) {
    toggleEtfElemDisplay(etfElem.querySelector(selector))
  }
}//}}}

function saveEtfInput(e, minLength, maxLength, censor) {//{{{
  const etfElem = getEtfElemFromEvent(e)
  const newValue = etfElem.querySelector('.etf-input').value
  if (compareFloats(newValue.length, minLength) && compareFloats(maxLength, newValue.length)) {
    etfElem.querySelector('.etf-value').textContent = (!censor) ? newValue : censorText(newValue)
    toggleEditMode(etfElem)
  } else {
		alert(`Input must be between ${minLength}-${maxLength} characters in length.`)
  }
}//}}}

function getEtfValue(etfElem) {
  return etfElem.querySelector('.etf-value').textContent
}
