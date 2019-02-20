const log = console.log

const itemDivs = document.querySelectorAll('.item')
log(itemDivs)

for (const itemDiv of itemDivs) {
	itemDiv.className = 'item col-lg-4'
}
