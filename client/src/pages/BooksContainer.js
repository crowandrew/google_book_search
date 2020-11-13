import React, { Component } from "react";
import API from "../utils/API";
import { Table, Container } from "react-bootstrap";
import NavBar from "../components/NavBar";
import SearchForm from "../components/SearchForm";
import BookDetail from "../components/BookDetail";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class BooksContainer extends Component {
  state = {
    books: [],
    search: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks() {
    API.getBooks()
      .then(res => {
        let allBooks = res.data.map((book) => {
          return {
            title: book.title,
            authors: book.authors,
            description: book.description,
            image: book.image,
            link: book.link,
            id: book._id
          };
        });
        this.setState({
          books: allBooks
        });
      })
      .catch((err) => console.log(err));
  };

  getBooks(query) {
    API.searchGoogle(query)
      .then((res) => {
        let allBooks = res.data.items.map((book) => {
          return {
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks.thumbnail,
            link: book.volumeInfo.infoLink,
            id: book.id
          };
        });
        this.setState({
          books: allBooks
        });
      })
      .catch((err) => console.log(err));
  }

  handleClearSearch = () => {
    this.setState({
      books: [],
    });
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("SEARCH:", this.state.search)
    this.getBooks(this.state.search);
  };

  deleteBook = (event) => {
    API.deleteBook(event.target.value)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  }


  handleFormSaveBook(event) {
    event.preventDefault();
    API.singleBookGoogle(event.target.value)
      .then((res) => {
        let authorList = "";
        res.data.volumeInfo.authors.forEach(author => {
          if (authorList === "") {
            authorList = authorList + author
          } else {
            authorList = authorList + ", " + author
          }
        });
        return {
          title: res.data.volumeInfo.title,
          authors: authorList,
          description: res.data.volumeInfo.description,
          image: res.data.volumeInfo.imageLinks.thumbnail,
          link: res.data.volumeInfo.infoLink,
        }
      }).then((books) => {

        API.saveBook(books)
          .catch(err => console.log(err))
      })
      .catch((err) => console.log(err));


  };


  render() {
    return (
      <Router>
        <div className="wrapper">
          <NavBar handleClearSearch={this.handleClearSearch}>
            <Switch>
              <Route exact path={"/search"}>
                <SearchForm
                  value={this.state.search}
                  handleInputChange={this.handleInputChange}
                  handleFormSubmit={this.handleFormSubmit}
                  handleClearSearch={this.handleClearSearch}
                />
              </Route>
            </Switch>
          </NavBar>
          <Switch>
            <Route exact path={"/search"} >
              <Container>
                <h1>Google Book Search</h1>
              </Container>
            </Route>
            <Route exact path={"/"}>
              <Container>
                <h1>Saved Book List</h1>
              </Container>
            </Route>
          </Switch>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th scope="col">Picture</th>
                <th scope="col">Title</th>
                <th scope="col">Authors</th>
                <th scope="col">Description</th>
                <th scope="col">Link</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.books.map((book) => (
                <BookDetail
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  authors={book.authors}
                  description={book.description}
                  image={book.image}
                  link={book.link}
                  handleFormSaveBook={this.handleFormSaveBook}
                  deleteBook={this.deleteBook}
                />
              ))}
            </tbody>
          </Table>
        </div>
      </Router>
    );
  }
}
