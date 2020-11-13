import React, { Component } from "react";
import API from "../utils/API";
import { Table } from "react-bootstrap";
import NavBar from "../components/NavBar";
import SearchForm from "../components/SearchForm";
import BookDetail from "../components/BookDetail";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class BooksContainer extends Component {
  state = {
    books: [],
    search: ""
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
        console.log("Search:", allBooks)
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



  handleFormSaveBook(event) {
    event.preventDefault();
    let bookObject = {};
    API.singleBookGoogle(event.target.value)
      .then((res) => {
        bookObject = {
          title: res.data.volumeInfo.title,
          authors: res.data.volumeInfo.authors,
          description: res.data.volumeInfo.description,
          image: res.data.volumeInfo.imageLinks.thumbnail,
          link: res.data.volumeInfo.infoLink,
        }
      })
      .catch((err) => console.log(err));
    API.saveBook({ bookObject })
      .catch(err => console.log(err));
  };


  render() {
    return (
      <div className="wrapper">
        <NavBar>
          <SearchForm
            value={this.state.search}
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
            handleClearSearchSort={this.handleClearSearch}
          />
        </NavBar>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th scope="col">Picture</th>
              <th scope="col">Title</th>
              <th scope="col">Authors</th>
              <th scope="col">Description</th>
              <th scope="col">Link</th>
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
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

<Router>
  <div>
    <Nav />
    <Switch>
      <Route exact path={["/", "/books"]}>
        <Books />
      </Route>
      <Route exact path="/books/:id">
        <Detail />
      </Route>
      <Route>
        <NoMatch />
      </Route>
    </Switch>
  </div>
</Router>