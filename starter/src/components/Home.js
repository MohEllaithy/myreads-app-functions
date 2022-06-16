import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Home = ({ books, changeShelf }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            changeShelf={changeShelf}
            type="currentlyReading"
            books={books}
            title="Currently Reading"
          />
          <BookShelf
            changeShelf={changeShelf}
            type="wantToRead"
            books={books}
            title="Want to Read"
          />
          <BookShelf
            changeShelf={changeShelf}
            type="read"
            books={books}
            title="Read"
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

Home.propTypes = {
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default Home;
