import React, { useEffect, useState } from "react";
import styles from "@/styles/MainContent.module.css";
import { Button, Container } from "react-bootstrap";
import Select from "./select";
import MultiSelect from "./multiSelect";
import Switch from "./switch";
import WhereChild from "./whereChild";
import useFetch from "@/hooks/usefetch";

const MainContent = () => {
  const [selectTableValue, setSelectTableValue] = useState("");
  const [tableList, setTableList] = useState([]);
  const [getTableList, { tableResponse, tableLoading }] = useFetch("/tables", {
    method: "post",
  });

  const optionsList = [
    { title: "Cup", value: 1 },
    { title: "Bottle", value: 2 },
    { title: "Chair", value: 3 },
  ];
  const fieldsOptionList = ["C++", "Java", "ReactJS", "Spring Boot"];

  const [fieldsItem, setFieldsItem] = useState([]);
  const [includeWhere, setIncludeWhere] = useState(false);

  useEffect(() => {
    getTableList();
  }, []);

  useEffect(() => {
    console.log("tableResponse ==> ", tableResponse);
  }, [tableResponse]);

  useEffect(() => {
    console.log("tableLoading ==> ", tableLoading);
  }, [tableLoading]);

  return (
    <Container>
      <div className={styles.mainWrap}>
        <Select
          label="Table name"
          optionsList={optionsList}
          value={selectTableValue}
          onChange={setSelectTableValue}
          placeholder="Select"
        />

        <div className={styles.selectFieldWrap}>
          Select{" "}
          <MultiSelect
            selectedItems={fieldsItem}
            setSelectedItems={setFieldsItem}
            optionList={fieldsOptionList}
            placeHolder="Fields"
          />{" "}
          from <span className={styles.tableName}>{selectTableValue}</span>
        </div>

        <div className={styles.whereWrap}>
          <Switch
            label="Include where condition"
            checked={includeWhere}
            onChange={setIncludeWhere}
          />
          <WhereChild />
        </div>
      </div>
    </Container>
  );
};

export default MainContent;
