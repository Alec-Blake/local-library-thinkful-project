function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find(({id: bookId}) => bookId === id);
}

function partitionBooksByBorrowedStatus(books) {
  const returnedBooks = books.filter((book) => {
    const {borrows: borrowed} = book;
    return borrowed.every(({returned}) => returned) 
  });

  const borrowedBooks = books.filter((book) =>{
    const {borrows: borrowed} = book;
    return borrowed.some(({returned}) => !returned)
  });

  const partitionedBooks = [[...borrowedBooks], [...returnedBooks]];
  return partitionedBooks;
}

function getBorrowersForBook(book, accounts) {
  const {borrows: borrowed} = book;

  let borrowArr = borrowed.map((borrow) => {
    let foundAccount = findAuthorById(accounts, borrow.id);
      foundAccount.returned = borrow.returned;
  return foundAccount;
  }).slice(0, 10); 
  
return borrowArr;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
