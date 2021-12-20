import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import { TweetsContext } from "../Context/Context";

function TweetForm(props) {
  const [alert, setAlert] = useState(false);
  const { setInput, input } = useContext(TweetsContext);

  const handleChange = (event) => {
    setInput(event.target.value);
    if (input.length > 138) {
      setAlert(true);
    } else {
      setAlert(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit({
      id: "",
      userName: "",
      content: input,
      date: new Date(Date.now()).toISOString(),
    });
    setInput("");
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="bg-dark text-white d-flex mt-5 mb-3"
    >
      <Form.Group
        className="mt-3 border border-white rounded d-flex flex-column w-100"
        controlId="floatingTextarea2"
      >
        <Form.Control
          className="border-0 bg-dark text-white"
          as="textarea"
          rows={3}
          cols="50"
          style={{ height: "100px" }}
          maxLength="141"
          placeholder="What do you have in mind..."
          value={input}
          onChange={handleChange}
        />
        <div className="d-flex align-items-baseline justify-content-end">
          <span
            className="flex-grow-1 ms-3 alert alert-danger p-1"
            style={{ display: alert ? "block" : "none" }}
          >
            The tweet can't contain more than 140 chars.
          </span>
          <Button disabled={alert} className="my-3 mx-3" type="submit">
            Tweet
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
}

export default TweetForm;
