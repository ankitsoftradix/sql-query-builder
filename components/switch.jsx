import React from "react";
import { Form } from "react-bootstrap";

const Switch = ({ label }) => {
  return (
    <Form className="custom-switch">
      <Form.Check // prettier-ignore
        type="switch"
        label={label}
        reverse
      />
    </Form>
  );
};

export default Switch;
