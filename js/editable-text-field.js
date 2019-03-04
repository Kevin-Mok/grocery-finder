function createEtf(label, initialValue, minLength, maxLength) {//{{{

  // create dom elements {{{ //
  
	/* const etfLabel = document.createElement('strong');
  etfLabel.className = 'etf-label'
	etfLabel.textContent = 'Password: ';

	const etfText = document.createElement('span');
  etfText.className = 'etf-value'
  etfText.textContent = text
	elem.append(etfLabel);
	elem.appendChild(etfText);
	
  const etfEditBtn = document.createElement('button');
  etfEditBtn.innerText = 'Edit';
  etfEditBtn.className = 'etf-edit-btn btn btn-info';
  etfEditBtn.addEventListener('click', (e) => toggleEditMode(e.target.parentElement));
  elem.appendChild(etfEditBtn);

	const etfInput = document.createElement('input');
	etfInput.className = 'etf-input'
	etfInput.setAttribute('type', 'text');
	etfInput.setAttribute('placeholder', text);
	etfInput.setAttribute('value', text);
	etfInput.style.display = 'none'

	const etfSaveBtn = document.createElement('button');
	etfSaveBtn.className = 'etf-save-btn btn btn-success';
	etfSaveBtn.innerText = 'Save';
	etfSaveBtn.style.display = 'none'
  etfSaveBtn.addEventListener('click', (e) => saveEtfInput(e.target.parentElement));

	const etfCancelBtn = document.createElement('button');
	etfCancelBtn.className = 'etf-cancel-btn btn btn-danger';
	etfCancelBtn.innerText = 'Cancel';
	etfCancelBtn.style.display = 'none'
  etfCancelBtn.addEventListener('click', (e) => toggleEditMode(e.target.parentElement));

	elem.appendChild(etfInput);
	elem.appendChild(etfSaveBtn);
	elem.appendChild(etfCancelBtn); */
  
  // }}} create dom elements  //

  const etfElem = document.createElement('div')
  etfElem.innerHTML = `
    <strong class='etf-label'>${label}: </strong><span class='etf-value'>${initialValue}</span>
    <button class='etf-edit-btn btn btn-info'>Edit</button>
    <input class='etf-input' type='text' value='${initialValue}' style='display: none;'>
    <button class='etf-save-btn btn btn-success' style='display: none;'>Save</button>
    <button class='etf-cancel-btn btn btn-danger' style='display: none;'>Cancel</button>
    `
  etfElem.querySelector('.etf-edit-btn').addEventListener('click', (e) => toggleEditMode(e.target.parentElement));
  etfElem.querySelector('.etf-save-btn').addEventListener('click', (e) => saveEtfInput(e.target.parentElement, minLength, maxLength));
  etfElem.querySelector('.etf-cancel-btn').addEventListener('click', (e) => toggleEditMode(e.target.parentElement));
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

function toggleEditMode(etfElem) {//{{{
  for (const selector of selectorsToToggleEdit) {
    toggleEtfElemDisplay(etfElem.querySelector(selector))
  }
}//}}}

function saveEtfInput(etfElem, minLength, maxLength) {//{{{
  const newValue = etfElem.querySelector('.etf-input').value
  if (parseInt(minLength) <= parseInt(newValue.length <= parseInt(maxLength))) {
    etfElem.querySelector('.etf-value').textContent = newValue
    toggleEditMode(etfElem)
  } else {
		alert(`Input must be between ${minLength}-${maxLength} characters in length.`)
  }
}//}}}
