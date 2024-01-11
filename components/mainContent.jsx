/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "@/styles/MainContent.module.css";
import { Button, Container } from "react-bootstrap";
import Select from "./select";
import MultiSelect from "./multiSelect";
import Switch from "./switch";
import WhereChild from "./whereChild";
import useFetch from "@/hooks/usefetch";
import { toast } from "react-toastify";

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

  /** Execute query states start */
  const operatorList = [
    { id: 1, name: "<" },
    { id: 2, name: ">" },
    { id: 3, name: "<=" },
    { id: 4, name: ">=" },
    { id: 5, name: "=" },
    { id: 6, name: "!=" },
  ];
  const [
    executeQueryApi,
    { response: executeQueryResponse, error: executeQueryError },
  ] = useFetch("/query", {
    method: "post",
  });

  useEffect(() => {
    if (executeQueryResponse?.status) {
      toast.success(executeQueryResponse.message);
    }
  }, [executeQueryResponse]);
  useEffect(() => {
    if (executeQueryError) {
      toast.error(executeQueryError.message);
    }
  }, [executeQueryError]);

  const handleSubmit = () => {
    const data = {
      table: tableList.find((item) => item.id == selectTableValue)?.name,
      field: fieldsItem.map((item) => item.name).toString(),
      is_where: includeWhere ? 1 : 0,
      is_condition: includeWhere
        ? whereDataList.map((item, index) => ({
            condition_type: index === 0 ? "" : "AND",
            operator: operatorList[item.operator - 1]?.name || "",
            condition_field: fieldsOptionsList[item.data - 1]?.name || "",
            condition_value: item.condition_value,
          }))
        : [],
    };
    executeQueryApi(data);
  };
  /** Execute query states end */

  //** Where condition states start */
  const [includeWhere, setIncludeWhere] = useState(false);
  const [whereDataList, setWhereDataList] = useState([
    {
      data: "",
      operator: "",
      condition_value: "",
      condition_type: "",
    },
  ]);
  useEffect(() => {
    console.log("whereDataList ==> ", whereDataList);
  }, [whereDataList]);
  useEffect(() => {
    console.log("fieldsOptionsList ==> ", fieldsOptionsList);
  }, [fieldsOptionsList]);
  //** Where condition states end */

  return (
    <Container>
      <div className={styles.mainWrap}>
        <div className={styles.tableNameField}>
          <Select
            label="Table name"
            optionsList={tableList}
            value={selectTableValue}
            onChange={(e) => {
              setSelectTableValue(e.target.value);
            }}
            placeholder="Select"
          />
        </div>

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
          {includeWhere &&
            whereDataList.map((item, index) => (
              <WhereChild
                key={index}
                fieldList={fieldsOptionsList.map((item, index) => ({
                  ...item,
                  id: index + 1,
                }))}
                item={{
                  ...item,
                  index: index,
                  listLength: whereDataList.length,
                }}
                setFieldChange={(e) => {
                  const newDataList = [...whereDataList];
                  newDataList[index].data = Number(e.target.value);
                  newDataList[index].operator = "";
                  setWhereDataList([...newDataList]);
                }}
                setOperatorChange={(e) => {
                  const newDataList = [...whereDataList];
                  newDataList[index].operator = Number(e.target.value);
                  setWhereDataList([...newDataList]);
                }}
                setValueChange={(e) => {
                  const newDataList = [...whereDataList];
                  newDataList[index].condition_value = e.target.value;
                  setWhereDataList([...newDataList]);
                }}
                handleConditionBtn={(e) => {
                  const newDataList = [...whereDataList];
                  newDataList[index].condition_type = e;
                  setWhereDataList([...newDataList]);
                }}
                handlePlusClick={() =>
                  setWhereDataList([
                    ...whereDataList,
                    {
                      data: "",
                      operator: "",
                      condition_value: "",
                      condition_type: "AND",
                    },
                  ])
                }
                handleCrossClick={() => {
                  setWhereDataList(
                    whereDataList.filter(
                      (item, innerIndex) => innerIndex !== index
                    )
                  );
                }}
              />
            ))}
        </div>

        <Button
          variant="primary"
          className={styles.submitBtn}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </Container>
  );
};

export default MainContent;
