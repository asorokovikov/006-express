
class Book {
  constructor(
    title,
    description = "",
    authors = "",
    favorite = false,
    fileCover = "",
    fileName = "",
    fileBook = ""
  ) {
    this.id = Math.random().toString(36).slice(2);
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
  }
}

module.exports = Book;