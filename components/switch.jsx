import React from "react";
import { Form } from "react-bootstrap";

const Switch = ({ label, checked, onChange }) => {
  return (
    <Form className="custom-switch">
      <Form.Check // prettier-ignore
        type="switch"
        label={label}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        reverse
      />
    </Form>
  );
};

export default Switch;
