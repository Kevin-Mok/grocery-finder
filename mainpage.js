/* E2 Library - JS */

/*-----------------------------------------------------------*/
/* Starter code - DO NOT edit the code below. */
/*-----------------------------------------------------------*/

// global counts
let numberOfBooks = 0; // total number of books
let numberOfPatrons = 0; // total number of patrons

// global arrays
const libraryBooks = [] // Array of books owned by the library (whether they are loaned or not)
const patrons = [] // Array of library patrons.

// Book 'class'
class Book {
	constructor(title, author, genre) {
		this.title = title;
		this.author = author;
		this.genre = genre;
		this.patron = null; // will be the patron objet

		// set book ID
		this.bookId = numberOfBooks;
		numberOfBooks++;
	}

	setLoanTime() {
		// Create a setTimeout that waits 3 seconds before indicating a book is overdue

		const self = this; // keep book in scope of anon function (why? the call-site for 'this' in the anon function is the DOM window)
		setTimeout(function() {
			
			console.log('overdue book!', self.title)
			changeToOverdue(self);

		}, 3000)

	}
}

// Patron constructor
const Patron = function(name) {
	this.name = name;
	this.cardNumber = numberOfPatrons;

	numberOfPatrons++;
}


// Adding these books does not change the DOM - we are simply setting up the 
// book and patron arrays as they appear initially in the DOM.
libraryBooks.push(new Book('Harry Potter', 'J.K. Rowling', 'Fantasy'));
libraryBooks.push(new Book('1984', 'G. Orwell', 'Dystopian Fiction'));
libraryBooks.push(new Book('A Brief History of Time', 'S. Hawking', 'Cosmology'));

patrons.push(new Patron('Jim John'))
patrons.push(new Patron('Kelly Jones'))

// Patron 0 loans book 0
libraryBooks[0].patron = patrons[0]
// Set the overdue timeout
libraryBooks[0].setLoanTime()  // check console to see a log after 3 seconds


/* Select all DOM form elements you'll need. */ 
const bookAddForm = document.querySelector('#bookAddForm');
const bookInfoForm = document.querySelector('#bookInfoForm');
const bookLoanForm = document.querySelector('#bookLoanForm');
const patronAddForm = document.querySelector('#patronAddForm');

/* bookTable element */
const bookTable = document.querySelector('#bookTable')
/* bookInfo element */
const bookInfo = document.querySelector('#bookInfo')
/* Full patrons entries element */
const patronEntries = document.querySelector('#patrons')

/* Event listeners for button submit and button click */

bookAddForm.addEventListener('submit', addNewBookToBookList);
bookLoanForm.addEventListener('submit', loanBookToPatron);
patronAddForm.addEventListener('submit', addNewPatron)
bookInfoForm.addEventListener('submit', getBookInfo);

/* Listen for click patron entries - will have to check if it is a return button in returnBookToLibrary */
patronEntries.addEventListener('click', returnBookToLibrary)

/*-----------------------------------------------------------*/
/* End of starter code - do *not* edit the code above. */
/*-----------------------------------------------------------*/

const bookSearchForm = document.querySelector('#bookSearchForm');

const bookSearchTable = document.querySelector('#bookSearchTable')


bookSearchForm.addEventListener('input',bookSearch)
bookSearchForm.addEventListener('submit',bookSearch)
bookSearchForm.addEventListener('click',loaddatalist)

/** ADD your code to the functions below. DO NOT change the function signatures. **/

log=console.log

/*** Functions that don't edit DOM themselves, but can call DOM functions 
     Use the book and patron arrays appropriately in these functions.
 ***/


loaddatalist()


function loaddatalist(){
    log("load")
    const authorset = new Set()
    const genreset = new Set()
    for (i=0;i<libraryBooks.length;i++){
        const book = libraryBooks[i]
        authorset.add(book.author)
        genreset.add(book.genre)
    }
    
    const authorlist = Array.from(authorset)
    const genrelist = Array.from(genreset)
    
    var authorstr = ""
    for (i=0;i<authorlist.length;i++) {
        const author=authorlist[i]
        
        authorstr+=`<option value="${author}">\n` 
        
            
    }
    document.querySelector("#authorlist").innerHTML=authorstr

    var genrestr = ""
    for (i=0;i<genrelist.length;i++) {
        const genre=genrelist[i]
        
        genrestr+=`<option value="${genre}">\n` 
        
            
    }
    document.querySelector("#genrelist").innerHTML=genrestr
}


function bookSearch(e){
    e.preventDefault();
    
    const genredoc=document.querySelector("#bookSearchGenre") 
    const genre = genredoc.value
    const authordoc =document.querySelector("#bookSearchAuthor") 
    const author = authordoc.value
    
    
    const tablebody = bookSearchTable.querySelector('tbody')
    
    
    const headtext = `<tr>
	 			<th>
	 				BookID
	 			</th>
	 			<th>
	 				Title
	 			</th>
	 			<th>
	 				Patron card number (if loaned out)
	 			</th>
	 		</tr>`
    

    
    tablebody.innerHTML=headtext
    for (i=0;i<libraryBooks.length;i++){
        const book = libraryBooks[i]
        const havegenre = book.genre.includes(genre)
        const haveauthor = book.author.includes(author)
        const condition = (havegenre && author==="")
                        || (haveauthor && genre === "")
                        || (havegenre && haveauthor)
        if (condition){
            
            let patronId =""
            if (book.patron!==null){
                patronId = book.patron.cardNumber
            }
            
            const htmltext = 
	 			`<td>
	 				${book.bookId}</td>
	 		 	<td>
	 				<strong>${book.title}</strong>
	 			</td>
	 			<td>
	 				${patronId}
	 			</td>
	 		    `
            trE = document.createElement('tr')
            trE.innerHTML=htmltext
            tablebody.appendChild(trE)
            
            
        }
    }
    
}


// Adds a new book to the global book list and calls addBookToLibraryTable()
function addNewBookToBookList(e) {
	e.preventDefault();

	// Add book book to global array
    
    const bookNameValue = document.querySelector('#newBookName').value
    const bookAuthorValue =document.querySelector('#newBookAuthor').value
    const bookGenreValue = document.querySelector('#newBookGenre').value
	libraryBooks.push(new Book(bookNameValue, bookAuthorValue, bookGenreValue));
    
    log(libraryBooks);
    // Call addBookToLibraryTable properly to add book to the DOM
	addBookToLibraryTable(libraryBooks[numberOfBooks-1]);
    
}

// Changes book patron information, and calls 
function loanBookToPatron(e) {
	e.preventDefault();

	// Get correct book and patron

    const bookid = parseInt(document.querySelector('#loanBookId').value)
    const cardnum = parseInt(document.querySelector('#loanCardNum').value)
    
    let curbook = libraryBooks[bookid]
    let curpatron = patrons[cardnum]
	// Add patron to the book's patron property
	
    curbook.patron=curpatron

	// Add book to the patron's book table in the DOM by calling addBookToPatronLoans()
	addBookToPatronLoans(curbook)
    
	// Start the book loan timer.
    curbook.setLoanTime()
	

}

// Changes book patron information and calls returnBookToLibraryTable()
function returnBookToLibrary(e){
	e.preventDefault();
	// check if return button was clicked, otherwise do nothing.
    if (e.target.classList.contains('return')){
        const bookId = parseInt(e.target.parentElement.parentElement.cells[0].textContent)
        
        const curbook = libraryBooks[bookId]
    
        
	// Call removeBookFromPatronTable()
        removeBookFromPatronTable(curbook)

	// Change the book object to have a patron of 'null'
        curbook.patron=null
    }

}

// Creates and adds a new patron
function addNewPatron(e) {
	e.preventDefault();

	// Add a new patron to global array
     const patronName = document.querySelector('#newPatronName').value
     
     const newpatron =new Patron(patronName)
     
     patrons.push(newpatron)

	// Call addNewPatronEntry() to add patron to the DOM
    addNewPatronEntry(newpatron)

}

// Gets book info and then displays
function getBookInfo(e) {
	e.preventDefault();

	// Get correct book
    const bookId = parseInt(document.querySelector('#bookInfoId').value)
    const curbook = libraryBooks[bookId]
	// Call displayBookInfo()	
    
    displayBookInfo(curbook)
    

}


/*-----------------------------------------------------------*/
/*** DOM functions below - use these to create and edit DOM objects ***/

//delete patron Entry


function deletePatronEntry(patron){
    
    const patronId = parseInt(patron.cardNumber)
    log("patron id = "+patronId)
    const rows =patronEntries.children[patronId].querySelector('tbody').children
    
    if (rows.length===1){
        patronEntries.removeChild(patronEntries.childNodes[2*patronId+1])
        patronEntries.removeChild(patronEntries.childNodes[2*patronId+1])
    }else{
        console.log("could not delete such patron")
    }
    
}

// Adds a book to the library table.
function addBookToLibraryTable(book) {
	// Add code here
   
    
    const row=document.createElement('tr')
    const idEntry = document.createElement('td')
    const titleEntry = document.createElement('td')
    const patronEntry = document.createElement('td')
    const idText = document.createTextNode(book.bookId)
    const titleText = document.createTextNode(book.title)
    
    const swrap = document.createElement('strong')
    
    idEntry.appendChild(idText)
    swrap.appendChild(titleText)
    titleEntry.appendChild(swrap)
    
    
    row.appendChild(idEntry)
    row.appendChild(titleEntry)
    row.appendChild(patronEntry)
    
    bookTable.querySelector('tbody').appendChild(row)
    
    

}


// Displays deatiled info on the book in the Book Info Section
function displayBookInfo(book) {
	// Add code here
    bookInfoE=document.querySelector("#bookInfo")
    bookInfoE.children[0].querySelector("span").textContent=book.bookId
    bookInfoE.children[1].querySelector("span").textContent=book.title
    bookInfoE.children[2].querySelector("span").textContent=book.author
    bookInfoE.children[3].querySelector("span").textContent=book.genre
    
    if (book.patron===null){
        bookInfoE.children[4].querySelector("span").textContent="N/A"
    }else{
        bookInfoE.children[4].querySelector("span").textContent=book.patron.name
    }
    
    

}

// Adds a book to a patron's book list with a status of 'Within due date'. 
// (don't forget to add a 'return' button).
function addBookToPatronLoans(book) {
	// Add code here
    
    const patronId = parseInt(book.patron.cardNumber)
    
    const row = document.createElement('tr')
    const idEntry = document.createElement('td')
    
    const titleEntry= document.createElement('td')
    const titleSub= document.createElement('strong')
    
    const statusEntry = document.createElement('td')
    const statusSub = document.createElement('span')
    statusSub.className='green'
    
    const buttonEntry = document.createElement('td')
    const buttonSub = document.createElement('button')
    buttonSub.className='return'
    
    const idText=document.createTextNode(book.bookId)
    const titleText= document.createTextNode(book.title)
    const statusText= document.createTextNode('Within due date')
    const buttonText= document.createTextNode('return')
    
    
    idEntry.appendChild(idText)
    
    titleSub.appendChild(titleText)
    titleEntry.appendChild(titleSub)
    
    statusSub.appendChild(statusText)
    statusEntry.appendChild(statusSub)
    
    buttonSub.appendChild(buttonText)
    buttonEntry.appendChild(buttonSub)
    
    row.appendChild(idEntry)
    row.appendChild(titleEntry)
    row.appendChild(statusEntry)
    row.appendChild(buttonEntry)

    patronEntries.children[patronId].querySelector('.patronLoansTable').querySelector('tbody').appendChild(row)
    
    mrow  = bookTable.rows[book.bookId+1]
    
    mrow.cells[2].textContent=book.patron.cardNumber
    
   
}

// Adds a new patron with no books in their table to the DOM, including name, card number,
// and blank book list (with only the <th> headers: BookID, Title, Status).
function addNewPatronEntry(patron) {
	// Add code here
    
    const cardnum = parseInt(patron.cardNumber)
    const patronName=  patron.name
    
    patronE = document.createElement('div')
    patronE.className="patron"
    
    
    
    block=`<p>Name: <span class='bold'>${patronName}</span></p>
	 		<p>Card Number: <span class='bold'>${cardnum}</span></p>
	 		<h4>Books on loan:</h4>
	 		<table class='patronLoansTable'>
	 			<tbody>
			 		<tr>
			 			<th>
			 				BookID
			 			</th>
			 			<th>
			 				Title
			 			</th>
			 			<th>	
			 				Status
			 			</th>
			 			<th>	
			 				Return
			 			</th>
			 			
			 		</tr>
			 		
		 		</tbody>
	 		</table>`
    patronE.innerHTML=block
    patronEntries.appendChild(patronE)
    
}


// Removes book from patron's book table and remove patron card number from library book table
function removeBookFromPatronTable(book) {
	// Add code here
    const booknum = book.bookId
    const cardnum = parseInt(book.patron.cardNumber)
    
    //remove from book table
    bookTable.querySelector('tbody').children[booknum+1].cells[2].textContent=""
    
    
    //remove from patron table
    
    const tablebody =patronEntries.children[cardnum].querySelector('tbody')
    for(i = 1; i<tablebody.children.length;i++){
        
        const tableBookId = parseInt(tablebody.children[i].cells[0].textContent)
        
        if (tableBookId===booknum){
            tablebody.deleteRow(i)
        }
            
    }
        

}

// Set status to red 'Overdue' in the book's patron's book table.
function changeToOverdue(book) {
	// Add code here
    
    if (book.patron !== null){
        const patronE = patronEntries.children[book.patron.cardNumber]
        const rows = patronE.querySelector('tbody').children
        
        for (i=1;i<rows.length;i++){
            if (parseInt(rows[i].cells[0].textContent)===book.bookId){
                rows[i].cells[2].querySelector('span').textContent='Overdue'
                rows[i].cells[2].querySelector('span').className='red'
            }
        }
        
    }
    
}

