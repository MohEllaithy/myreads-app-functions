import Book from "./Book";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Search = (props) => {
  const { query, results, books, changeShelf, clear, isLoading } = props;
  const Updatedresults = results.map((result) => {
    const book = books.find((item) => item.id === result.id);
    return book ? { ...result, shelf: book.shelf } : result;
  });

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" onClick={clear} to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            onChange={query}
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        {isLoading ? (
          <div>
            <p style={{ textAlign: "center" }}>
              <strong>Loading...</strong>
            </p>
          </div>
        ) : (
          ""
        )}
        {results.length === 0 && !isLoading ? (
          <div>
            <p style={{ textAlign: "center" }}>
              <strong>No Results Found!</strong>
            </p>
          </div>
        ) : (
          ""
        )}
        <ol className="books-grid">
          {Updatedresults.map((result) => (
            <Book book={result} key={result.id} changeShelf={changeShelf} />
          ))}
        </ol>
      </div>
    </div>
  );
};

Search.propTypes = {
  query: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Search;
