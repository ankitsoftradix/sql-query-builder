import React, { useState } from "react";
import styles from "@/styles/whereChilde.module.css";
import Select from "./select";
import { Button } from "react-bootstrap";

const WhereChild = () => {
  const optionsList = [
    { title: "Cup", value: 1 },
    { title: "Bottle", value: 2 },
    { title: "Chair", value: 3 },
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
