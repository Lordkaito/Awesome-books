const bookSel = document.querySelector('#book-list');
const button = document.querySelector('#add-book');
const titleSel = document.querySelector('#title');
const authorSel = document.querySelector('#author');
let bookList = [];
// add books to the page
const addBookToList = (book) => {
  const div = document.createElement('div');
  const divWrapper = document.createElement('div');
  divWrapper.classList.add("book-wrapper");
  div.classList.add('book');
  const button = document.createElement('button');
  const text = document.createElement('h3');
  const textH3 = document.createElement('h3');
  const textBy = document.createElement('h3');
  button.classList.add('delete-book');
  text.textContent = book.author;
  textH3.textContent = `"${book.title}"`;
  button.textContent = 'Delete';
  textBy.textContent = 'by';
  // eslint-disable-next-line no-use-before-define
  button.addEventListener('click', removeBook);
  divWrapper.appendChild(textH3);
  divWrapper.appendChild(textBy);
  divWrapper.appendChild(text);
  div.appendChild(divWrapper);
  div.appendChild(button);
  bookSel.appendChild(div);
  bookSel.style.display = 'block';
};

// class Book constructor with methods add and delete
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  addBook() {
    bookList.push({ title: this.title, author: this.author });
    localStorage.setItem('books', JSON.stringify(bookList));
    addBookToList(this);
  }
}

// removes book from the page
const removeBook = (e) => {
  if (e.target.classList.contains('delete-book')) {
    // eslint-disable-next-line max-len
    const bookToDelete = bookList.find((book) => book.title === e.target.parentElement.firstElementChild.textContent.split('"')[1]);
    bookList.splice(bookList.indexOf(bookToDelete), 1);
    localStorage.setItem('books', JSON.stringify(bookList));
  }
  bookSel.innerHTML = '';
  bookList = [...JSON.parse(localStorage.getItem('books'))];
  bookList.forEach((book) => {
    addBookToList(book);
  });
  location.reload();
};

button.addEventListener('click', () => {
  const title = titleSel.value;
  const author = authorSel.value;
  const book = new Book(title, author);
  book.addBook();
  titleSel.value = '';
  authorSel.value = '';
});

authorSel.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    const title = titleSel.value;
    const author = authorSel.value;
    const book = new Book(title, author);
    book.addBook();
    titleSel.value = '';
    authorSel.value = '';
  }
});

window.addEventListener('load', () => {
  if (bookSel.childElementCount === 0) {
    bookSel.classList.add('hidden');
  }
  const localBooks = JSON.parse(localStorage.getItem('books'));
  if (localBooks !== null) {
    bookList = [...JSON.parse(localStorage.getItem('books'))];
    bookList.forEach((book) => {
      addBookToList(book);
    });
  }
});
