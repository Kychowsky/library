const myLibrary = [];

const dialog = document.querySelector('#book-dialog');
const addBookBtn = document.querySelector('.add-book');
const form = document.querySelector('#book-form');
const libraryContainer = document.querySelector('.library-container');
const cancelBtn = document.querySelector('#cancelBtn');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
  dialog.close();
}

function displayBooks() {
  libraryContainer.innerHTML = ''; // Clear before rendering

  myLibrary.forEach(bookData => {
    const book = document.createElement("div");
    book.classList.add("book-box");

    const title = document.createElement("h3");
    title.textContent = bookData.title;

    const author = document.createElement("div");
    author.textContent = `Author: ${bookData.author}`;

    const pages = document.createElement("div");
    pages.textContent = `Pages: ${bookData.pages}`;

    const read = document.createElement("button");
    if (bookData.read){
        read.style.background ="rgb(28, 151, 4)";
        read.textContent = 'read';
    } else {
        read.style.background ="rgb(190, 10, 10)";
        read.textContent = 'not read';
    }
    read.onclick = function() {
        bookData.read = !bookData.read;
        if (bookData.read){
            read.textContent = "read";
            read.style.background ="rgb(28, 151, 4)";
        }
        else {
            read.textContent = "not read";
            read.style.background ="rgb(190, 10, 10)";
        }
    }


    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.addEventListener("click", () => {
      removeBook(bookData.id);
    });

    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(read);
    book.appendChild(removeBtn);

    libraryContainer.appendChild(book);
  });
}

function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index > -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

// Event listeners
addBookBtn.addEventListener("click", () => dialog.showModal());

cancelBtn.addEventListener("click", () => dialog.close());

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = form.querySelector('#title').value;
  const author = form.querySelector('#author').value;
  const pages = form.querySelector('#pages').value;
  const read = form.querySelector('#read').checked;

  addBookToLibrary(title, author, pages, read);
  form.reset();
});

addBookToLibrary('Lord of the Rings', "J.R.R Tolkein", 500, true);
addBookToLibrary('Lord of the Flies', 'William Golding', '224', true);

