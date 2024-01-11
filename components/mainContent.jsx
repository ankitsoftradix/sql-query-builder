/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "@/styles/MainContent.module.css";
import { Button, Container } from "react-bootstrap";
import Select from "./select";
import MultiSelect from "./multiSelect";
import Switch from "./switch";
import WhereChild from "./whereChild";
import useFetch from "@/hooks/usefetch";

const MainContent = () => {
  /** Table states start */
  const [selectTableValue, setSelectTableValue] = useState("");
  const [tableList, setTableList] = useState([]);
  const [getTableList, { response: tableResponse }] = useFetch("/tables");

  useEffect(() => {
    if (tableResponse?.status) {
      setTableList(tableResponse.data);
    }
  }, [tableResponse]);
  useEffect(() => {
    getTableList();
  }, []);
  /** Table states end */

  /** Field states start */
  const [fieldsItem, setFieldsItem] = useState([]);
  const [fieldsOptionsList, setFieldsOptionsList] = useState([]);
  const [getFieldsOptionsList, { response: fieldsOptionsResponse }] = useFetch(
    "/table_fields",
    {
      method: "post",
    }
  );

  useEffect(() => {
    if (fieldsOptionsResponse?.status) {
      setFieldsOptionsList(fieldsOptionsResponse.data);
    }
  }, [fieldsOptionsResponse]);
  useEffect(() => {
    if (selectTableValue) {
      getFieldsOptionsList({ table_id: selectTableValue });
    }
  }, [selectTableValue]);
  /** Field states end */

  const [includeWhere, setIncludeWhere] = useState(false);

  return (
    <Container>
      <div className={styles.mainWrap}>
        <Select
          label="Table name"
          optionsList={tableList}
          value={selectTableValue}
          onChange={setSelectTableValue}
          placeholder="Select"
        />

        <div className={styles.selectFieldWrap}>
          Select{" "}
          <MultiSelect
            selectedItems={fieldsItem}
            setSelectedItems={setFieldsItem}
            optionList={fieldsOptionsList}
            placeHolder="Fields"
          />{" "}
          from{" "}
          <span className={styles.tableName}>
            {tableList.find((item) => item.id == selectTableValue)?.name}
          </span>
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
