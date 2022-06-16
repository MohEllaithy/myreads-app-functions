import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import Home from "./components/Home";
import Search from "./components/Search";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //Get all books from api
  useEffect(() => {
    BooksAPI.getAll().then((books) => setBooks(books));
  }, []);

  //Update Search Results
  useEffect(() => {
    if (searchResults.length > 0) setSearchResults(searchResults);
  }, [searchResults]);

  //Clear search results
  const clearSearchResults = () => {
    setSearchResults([]);
  };

  //Update the books list
  const updateBooksList = async (book, shelf) => {
    await BooksAPI.update(book, shelf);
    const updatedBooks = await BooksAPI.getAll();
    setBooks(updatedBooks);
  };

  //Handle the search results
  const queryHandler = async (event) => {
    setIsLoading(true);
    const query = event.target.value;
    const searchResults = !query ? [] : await BooksAPI.search(query);
    searchResults.error
      ? setSearchResults([])
      : setSearchResults(searchResults);
    setIsLoading(false);
  };

  //Handle shelf change menu
  const shelfChangeHandler = async (event, book) => {
    const { value } = event.target;
    book.shelf = value;
    await updateBooksList(book, value);
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<Home books={books} changeShelf={shelfChangeHandler} />}
        />
        <Route
          path="/search"
          element={
            <Search
              changeShelf={shelfChangeHandler}
              query={queryHandler}
              results={searchResults}
              clear={clearSearchResults}
              books={books}
              isLoading={isLoading}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
