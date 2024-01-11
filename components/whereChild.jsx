import React, { useEffect, useState } from "react";
import styles from "@/styles/whereChilde.module.css";
import Select from "./select";
import { Button, Form } from "react-bootstrap";

const WhereChild = ({
  item,
  fieldList,
  setFieldChange,
  setOperatorChange,
  setValueChange,
}) => {
  const [operatorList, setOperatorList] = useState([]);

  useEffect(() => {
    if (item.data) {
      const dataType = fieldList[item.data - 1].data_type;
      if (dataType === "all") {
        setOperatorList([
          { id: 1, name: "<" },
          { id: 2, name: ">" },
          { id: 3, name: "<=" },
          { id: 4, name: ">=" },
          { id: 5, name: "=" },
          { id: 6, name: "!=" },
        ]);
      } else if (dataType === "integer") {
        setOperatorList([
          { id: 0, name: "<" },
          { id: 1, name: ">" },
          { id: 2, name: "<=" },
          { id: 3, name: ">=" },
        ]);
      } else if (dataType === "varchar") {
        setOperatorList([
          { id: 4, name: "=" },
          { id: 5, name: "!=" },
        ]);
      }
    }
  }, [item.data]);

  return (
    <div className={styles.whereChildWrap}>
      Where{" "}
      <Select
        optionsList={fieldList}
        value={item.data}
        onChange={setFieldChange}
        placeholder="Select field"
      />
      <Select
        optionsList={operatorList}
        value={item.operator}
        onChange={setOperatorChange}
        placeholder="Select operator"
      />
      <div className={styles.valueWrap}>
        <Form.Control
          placeholder="value"
          value={item.condition_value}
          onChange={setValueChange}
          type={
            item.data === 1 || item.data === 4 || item.data === 5
              ? "number"
              : "text"
          }
        />
      </div>
      <Button variant="success">+</Button>
    </div>
  );
};

export default WhereChild;
