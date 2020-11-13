import axios from "axios";

//Google API
const BASEURL = "https://www.googleapis.com/books/v1/volumes?q=";
const BOOKURL = "https://www.googleapis.com/books/v1/volumes/"
const KEY = "&key="
const APIKEY = process.env.REACT_APP_GOOGLE_API_KEY;


export default {
  // Gets all books
  getBooks: function () {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    console.log(bookData);
    return axios.post("/api/books", bookData);
  },
  // Search for book on google
  searchGoogle: function (query) {
    return axios.get(BASEURL + query + KEY + APIKEY);
  },
  singleBookGoogle: function (query) {
    return axios.get(BOOKURL + query);
  }
};

