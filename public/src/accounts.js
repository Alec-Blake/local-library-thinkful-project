function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => {
    const {name: {last: lastNameA}} = accountA;
    const {name: {last: lastNameB}} = accountB;  

    return lastNameA.toLowerCase() > lastNameB.toLowerCase() ? 1 : -1
  });
}

function getTotalNumberOfBorrows(account, books) {

  return books.reduce((total, book) => {
    const {borrows: borrowed} = book;

      borrowed.filter((borrow) => {
      if (borrow.id === account.id) {
        total += 1;
      }
    });
     return total;
  }, 0)
}

function getBooksPossessedByAccount(account, books, authors) {

 return books.reduce((result, book) => {
    const {borrows: borrowed} = book;
    const heldBook = borrowed.find(({id, returned}) => id === account.id && !returned)
            if (heldBook) {
              let author = authors.find(({id}) => id === book.authorId);
              result = [...result, {...book, author}];
            }
        
    return result;
  }, []);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
