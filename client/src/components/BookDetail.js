import React from "react";
import { Image, Button } from "react-bootstrap";

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
        <Button
          variant="success"
          value={props.id}
          onClick={props.handleFormSaveBook}
        >
          Save
      </Button>
      </td>
    </tr>
  );
}
