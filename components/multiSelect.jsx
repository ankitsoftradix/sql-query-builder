import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

const MultiSelect = ({
  selectedItems,
  setSelectedItems,
  optionList,
  placeHolder,
}) => {
  const toggleLang = (option) => {
    if (selectedItems.includes(option)) {
      setSelectedItems(selectedItems.filter((item) => item !== option));
    } else {
      setSelectedItems([...selectedItems, option]);
    }
  };
  return (
    <Dropdown autoClose={"outside"} data-bs-theme="dark">
      <Dropdown.Toggle id="dropdown-autoclose-false" variant="secondary">
        {placeHolder}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {optionList.map((option, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => toggleLang(option)}
            active={selectedItems.includes(option)}
          >
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MultiSelect;
