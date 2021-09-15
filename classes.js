const bookSel = document.querySelector('#book-list');
const button = document.querySelector('#add-book');
const titleSel = document.querySelector('#title');
const authorSel = document.querySelector('#author');

// class Book {
//   constructor(title, author) {
//     this.title = title;
//     this.author = author;
//   }
// }

// // class myArr {
// //   constructor() {
// //     this.books = [];
// //   }
// //   // addBook(book) {
// //   //   this.books.push(book);
// //   // }
// // }

// // button.addEventListener('click', () => {
// //   const title = titleSel.value;
// //   const author = authorSel.value;
// //   const book = new Book(title, author);
// // });



// class Node {
//   constructor(element, next_node = null) {
//     this.value = element;
//     this.next = next_node;
//   }
// }

// class bookList {
//   constructor() {
//     this.head = null;
//     this.tail = null;
//   }

//   add(title, author) {
//     const book = new Book(title, author);
//     console.log(book);
//     if (this.head === null) {
//       this.head = new Node(book);
//       this.tail = this.head;
//     } else {
//       this.tail.next = new Node(book);
//       this.tail = this.tail.next;
//     }
//     addBookToList(book);
//   }
// }

// const list = new bookList();
// const head = list.head;

// window.addEventListener('load', () => {
//   // check if local storage is empty
//   if (localStorage.getItem('books') !== null) {
//     const books = JSON.parse(localStorage.getItem('books'));
//     for (let i = 0; i < books.length; i++) {
//       addBookToList(books[i]);
//     }
//   }
// });

// button.addEventListener('click', () => {
//   const title = titleSel.value;
//   const author = authorSel.value;
//   list.add(title, author);
//   localStorage.setItem('books', JSON.stringify(list));
//   titleSel.value = '';
//   authorSel.value = '';
// });

// const addBookToList = (book) => {
//   const div = document.createElement('div');
//   div.classList.add('book');
//   div.innerHTML = `
//   <h3>${book.title}</h3>
//   <p>${book.author}</p>
//   <button type="button" class="delete-book">Delete</button>`;
//   bookSel.appendChild(div);
// };

// bookSel.addEventListener('click', (e) => {
//   if (e.target.classList.contains('delete-book')) {
//     const book = e.target.parentNode.parentNode.querySelector('.book');
//     bookSel.removeChild(book);
//   }
// });

// loop trhough the linked list
// const loop = (node) => {
//   if (node.next) {
//     loop(node.next);
//     console.log(node.value);
//   }
// }

const addBookToList = (book) => {
  const div = document.createElement('div');
  div.classList.add('book');
  div.innerHTML = `
  <h3>${book.title}</h3>
  <p>${book.author}</p>
  <button type="button" class="delete-book">Delete</button>`;
  const button = document.createElement('button');
  button.classList.add('delete-book');
  const text = document.createElement('p');
  const textH3 = document.createElement('h3');
  bookSel.appendChild(div);
};


let bookList = [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  addBook() {
    bookList.push({ title: this.title, author: this.author });
    localStorage.setItem('books', JSON.stringify(bookList));
    console.log(bookList);
    addBookToList(this);
  }

  deleteBook() {
    bookList.splice(bookList.indexOf(this), 1);
    localStorage.setItem('books', JSON.stringify(bookList));
    console.log(bookList);
  }
}

button.addEventListener('click', () => {
  const title = titleSel.value;
  const author = authorSel.value;
  const book = new Book(title, author);
  book.addBook();
  titleSel.value = '';
  authorSel.value = '';
}
);

bookSel.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-book')) {
    const book = e.target.parentNode.parentNode.querySelector('.book');
    // eslint-disable-next-line max-len
    const bookToDelete = bookList.find((book) => book.title === e.target.parentElement.firstChild.innerText);
    bookList.splice(bookList.indexOf(bookToDelete), 1);
    localStorage.setItem('books', JSON.stringify(bookList));
    bookSel.removeChild(book);
  }
});

window.addEventListener('load', () => {
  const localBooks = JSON.parse(localStorage.getItem('books'));
  if (localBooks !== null) {
    bookList = [...JSON.parse(localStorage.getItem('books'))];
    bookList.forEach((book) => {
      addBookToList(book);
    });
  }
});



