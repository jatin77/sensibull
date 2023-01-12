import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

const PageContainer = ({ pageHeading, children }) => {
  return (
    <Container className="p-5">
      <h1 className="display-6 mb-5">{pageHeading}</h1>
      <Card>
        <Card.Body>{children}</Card.Body>
      </Card>
    </Container>
  );
};

export default PageContainer;
