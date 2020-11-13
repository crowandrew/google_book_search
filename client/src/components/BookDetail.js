import React from "react";
import { Image, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function BookDetail(props) {
  return (

    <tr>
      <td className="text-center"><Image src={props.image} rounded /></td>
      <td>
        {props.title}
      </td>
      <td>{props.authors}</td>
      <td>
        {props.description}
      </td>
      <td>
        <a href={props.link}>More Information</a>
      </td>
      <td>
        <Router>
          <Switch>
            <Route exact path={"/search"} >
              <Button
                variant="success"
                value={props.id}
                onClick={props.handleFormSaveBook}
              >
                Save
            </Button>
            </Route>
            <Route exact path={"/"}>
              <Button
                variant="danger"
                value={props.id}
                onClick={props.deleteBook}
              >
                Delete
            </Button>
            </Route>
          </Switch>
        </Router>

      </td>
    </tr>
  );
}
