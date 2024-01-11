import React, { useState } from "react";
import { Form } from "react-bootstrap";

const Select = ({ label, optionsList, value, onChange, placeholder }) => {
  return (
    <Form.Group controlId="formBasicSelect">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Select
        aria-label="Default select example"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option key="blankChoice" hidden value>
          {placeholder}
        </option>
        {optionsList.map((item, index) => (
          <option key={index} value={item.value}>
            {item.title}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default Select;
