const books = document.querySelector('#book-list');
const button = document.querySelector('#add-book');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const div = document.createElement('div');
const p = document.createElement('p');
const deleteBtn = document.querySelectorAll('.delete');


// constructor function
const Book = function (title, author) {
  this.title = title;
  this.author = author;
}

// array of books
let bookList = [];

window.addEventListener('load', () => {
  if (books !== null) {
    bookList = [...JSON.parse(localStorage.getItem('books'))];
    bookList.forEach(book => {
      addBookToList(book);
    });
  }
});

// event listener for button

button.addEventListener('click', () => {
  const newBook = new Book(title.value, author.value);
  bookList.push(newBook);
  addBookToList(newBook);
  title.value = '';
  author.value = '';
  localStorage.setItem('books', JSON.stringify(bookList));
});

addBookToList = (newBook) => {
  const div = document.createElement('div');
  div.classList.add('book');
  div.innerHTML = `<h3>Book: ${newBook.title}</h3>
                    <p>Author: ${newBook.author}</p>
                    <button type="button" class="delete">Delete</button>`;
  books.appendChild(div);
}

// add delete button event listener
books.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    const book = e.target.parentElement;
    books.removeChild(book);
    const bookToDelete = bookList.find(book => book.title === e.target.parentElement.firstChild.innerText);
    bookList.splice(bookList.indexOf(bookToDelete), 1);
    localStorage.setItem('books', JSON.stringify(bookList));
  }
});
