import React, { useState } from "react";
import styles from "@/styles/whereChilde.module.css";
import Select from "./select";
import { Button } from "react-bootstrap";

const WhereChild = () => {
  const optionsList = [
    { name: "Cup", id: 1 },
    { name: "Bottle", id: 2 },
    { name: "Chair", id: 3 },
  ];
  const [selectTableValue, setSelectTableValue] = useState("");
  return (
    <div className={styles.whereChildWrap}>
      Where{" "}
      <Select
        optionsList={optionsList}
        value={selectTableValue}
        onChange={setSelectTableValue}
        placeholder="field"
      />
      <Select
        optionsList={optionsList}
        value={selectTableValue}
        onChange={setSelectTableValue}
        placeholder="operator"
      />
      <Select
        optionsList={optionsList}
        value={selectTableValue}
        onChange={setSelectTableValue}
        placeholder="value"
      />
      <Button variant="success">+</Button>
    </div>
  );
};

export default WhereChild;
