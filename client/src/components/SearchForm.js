import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";


export default function SearchForm(props) {
  return (
    <Form inline>
      <FormControl
        onChange={props.handleInputChange}
        value={props.value}
        name="search"
        type="text"
        className="form-control mx-1"
        placeholder="Search"
        id="search"
      />

      <Button
        variant="primary"
        onClick={props.handleFormSubmit}
        type="submit"
        className="mx-1"
      >
        Search
      </Button>
      <Button
        variant="success"
        onClick={props.handleClearSearchSort}
        className="mx-1"
      >
        Reset
      </Button>
    </Form>
  );
}
