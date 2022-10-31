function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.map((account) => account.id).length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    const {borrows: borrowed} = book;

    return (
      acc + borrowed.filter((notReturned) => {
        return notReturned.returned === false
      }).length
    );
  }, 0);
}

function getMostCommonGenres(books) {
  const bookGenres = books.reduce((acc, book) => {
    const genreObj = acc.find((genre) => genre.name === book.genre);
    if (genreObj) {
      genreObj.count += 1;
    } else {
      acc.push({ name: book.genre, count: 1 });
    }
    return acc;
  }, []);

  return bookGenres
    .sort((genreA, genreB) => (genreA.count < genreB.count ? 1 : -1))
    .slice(0, 5);
}

function getMostPopularBooks(books) {
  return books.map((book) => {
      return { name: book.title, count: book.borrows.length };
    })
    .sort((bookA, bookB) => (bookA.count < bookB.count ? 1 : -1))
    .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const mostPopular = [];

  authors.forEach((author) => {
    let myAuthor = {
      name: `${author.name.first} ${author.name.last}`,
      count: 0,
    };
    books.forEach((book) => {
      if (book.authorId === author.id) {
        myAuthor.count += book.borrows.length;
      }
    });
    mostPopular.push(myAuthor);
  });
  return mostPopular
    .sort((authorA, authorB) => (authorA.count < authorB.count ? 1 : -1))
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
