import React from "react";
import { Card } from "react-bootstrap";

function Tweet({ tweets }) {
  return tweets.map((tweet) => (
    <Card key={tweet.id} className="mb-3 bg-secondary text-white">
      <Card.Header className="d-flex align-items-center">
        <span className="flex-grow-1">{tweet.userName}</span>
        <small className="">{tweet.date}</small>
      </Card.Header>
      <Card.Body>
        <Card.Text>{tweet.content}</Card.Text>
      </Card.Body>
    </Card>
  ));
}

export default Tweet;
