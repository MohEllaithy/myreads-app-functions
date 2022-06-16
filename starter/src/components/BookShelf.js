import Book from "./Book";
import PropTypes from "prop-types";

const BookShelf = ({ title, books, type, changeShelf }) => {
  const shelfBooks = books.filter((book) => book.shelf === type);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {shelfBooks.map((book) => (
            <Book book={book} key={book.id} changeShelf={changeShelf} />
          ))}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default BookShelf;
