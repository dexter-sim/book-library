let library = [];

class Book {
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

if (localStorage.getItem("allBooks") !== null){
    library = JSON.parse(localStorage.getItem("allBooks"));
}

const readInfo = document.getElementById("readInfo");
const booklist = document.getElementById("restOfTable");
const adder = document.getElementById("form");

adder.addEventListener("submit", event => {
    event.preventDefault();     // prevent auto submitting
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;
    console.log(read);
    addBookToLibrary(title, author, pages, read);
});


function addBookToLibrary(title, author, pages, read){
    const book = new Book(title, author, pages, read);
    library.push(book);
    displayBooks();
}

function displayBooks(){
    booklist.textContent = "";
    localStorage.setItem("allBooks", JSON.stringify(library));

    for (let i = 0; i < library.length; i++){
        const book = library[i];
        const row = document.createElement("div");
        row.className = "row";
        row.classList.add("book-info");
        
        const bookTitle = document.createElement("div");
        bookTitle.textContent = book.title;
        bookTitle.className = "one";

        const bookAuthor = document.createElement("div");
        bookAuthor.textContent = book.author;
        bookAuthor.className = "two";

        const bookPages = document.createElement("div");
        bookPages.textContent = book.pages;
        bookPages.className = "three";

        const bookRead = document.createElement("div");
        const bookCheck = document.createElement("input")
        bookCheck.type = "checkbox";
        bookCheck.checked = book.read;
        bookCheck.addEventListener("change", () => {
            book.read = bookCheck.checked;
            displayBooks();
        })
        bookRead.appendChild(bookCheck);
        bookRead.className = "four"

        const bookRemove = document.createElement("div");
        const bookRemoveButton = document.createElement("button");
        bookRemoveButton.innerHTML = "Remove";
        bookRemoveButton.style.backgroundColor = "grey";
        bookRemoveButton.style.border = "0px";

        bookRemoveButton.addEventListener("click", () => {
            library.splice(i, 1);
            displayBooks();
        })
        bookRemove.appendChild(bookRemoveButton);
        bookRemove.className = "five";

        row.appendChild(bookTitle);
        row.appendChild(bookAuthor);
        row.appendChild(bookPages);
        row.appendChild(bookRead);
        row.appendChild(bookRemove);
        booklist.appendChild(row);
    }
    displayTopRow();
}

function displayTopRow(){
    readInfo.textContent = "";
    let readCount = 0; 
    let unreadCount = 0;

    for (let i = 0; i < library.length; i++){
        if (library[i].read){
            readCount++;
        } else {
            unreadCount++;
        }
    }

    const totalBooks = document.createElement("div");
    totalBooks.textContent = "Total Books: " + library.length;
    const readBooks = document.createElement("div");
    readBooks.textContent = "Books Read: " + readCount;
    const unreadBooks = document.createElement("div");
    unreadBooks.textContent = "Books Unread: " + unreadCount;

    readInfo.appendChild(readBooks);
    readInfo.appendChild(unreadBooks);
    readInfo.appendChild(totalBooks);
}

if (library.length === 0){
    addBookToLibrary("Nineteen Eighty-Four", "George Orwell", 328, true);
}
displayBooks();