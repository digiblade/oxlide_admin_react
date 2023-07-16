import React from "react";
import { Button, Table } from "react-bootstrap";
import A_SimpleModal from "../../Atoms/Modal/A_SimpleModal";
import O_Form_Data_Mapping from "../../Organisms/Table Data Mapping/O_Form_Data_Mapping";
import { httpPOST } from "../../../Utils/Api";
import { fieldTypes, subTypes } from "../../../Const/types";
import { Delete, Edit } from "@mui/icons-material";

export default function P_FieldPage() {
  const fieldLabel = "field-details";
  const [open, setIsOpen] = React.useState(false);
  const [optionSets, setOptionSets] = React.useState([]);
  const [crmValues, setCrmValues] = React.useState({});
  const [deleteDisable, setDeleteDisable] = React.useState([]);
  React.useEffect(() => {
    getDetails();
  }, [deleteDisable]);
  const getDetails = async () => {
    let optionSetResponse = await httpPOST("/crm-multi-label-data-get", {
      sourceLabels: ["fieldtype", "page-config", "field-details"],
    });
    optionSetResponse["data"]["decision"] = [
      {
        label: "Yes",
        value: true,
      },
      {
        label: "No",
        value: false,
      },
    ];
    setOptionSets(optionSetResponse.data || {});
  };
  const handleDelete = async (properties, sourceLabel) => {
    let { id } = { ...properties };
    setDeleteDisable([...deleteDisable, id]);
    delete properties.id;

    let payload = {
      label: sourceLabel,
      id,
      properties: { ...properties, isDeleted: true },
    };
    await httpPOST("/crm-data-insert", payload);
    let removedId = deleteDisable.filter((item) => item !== id);
    setDeleteDisable(removedId);
  };
  return (
    <div>
      <Button className="my-2" onClick={() => setIsOpen(true)}>
        Add
      </Button>
      <A_SimpleModal
        show={open}
        // onClose={() => setIsOpen(false)}
        onHide={() => {
          setIsOpen(false);
        }}
        content={
          <O_Form_Data_Mapping
            sourceLabel={fieldLabel}
            onSubmit={() => {
              setIsOpen(false);
            }}
            crmValues={crmValues}
            optionSets={optionSets}
            formConfig={{
              formElements: [
                {
                  formType: fieldTypes.TEXT_INPUT,
                  subType: subTypes.TEXT,
                  id: "fieldName",
                  defaultValue: "",
                  helperText: "",
                  label: "Field Name:",
                  required: true,
                  placeholder: "Please Enter Field Name",
                },
                {
                  formType: fieldTypes.OPTION_SET,

                  optionSetName: "fieldtype",
                  optionSetLabel: "fieldType",
                  optionSetValue: "fieldType",
                  id: "fieldType",
                  defaultValue: "",
                  helperText: "",
                  label: "Field Type:",
                  required: true,
                  hideInForm: true,
                  placeholder: "Select Field Type",
                },

                {
                  formType: fieldTypes.OPTION_SET,
                  show: {
                    condition: "<fieldType> === 'Optionset' ",
                  },
                  optionSetName: "page-config",
                  optionSetLabel: "pageName",
                  optionSetValue: "pageName",
                  id: "optionSetName",
                  defaultValue: "",
                  helperText: "",
                  label: "Option Set:",
                  required: true,
                  hideInForm: true,
                  placeholder: "Select Option Set",
                },

                {
                  formType: fieldTypes.OPTION_SET,
                  optionSetName: "decision",
                  optionSetLabel: "label",
                  optionSetValue: "value",
                  id: "isRequired",
                  defaultValue: "",
                  helperText: "",
                  label: "Required:",
                  required: true,
                  hideInForm: true,

                  placeholder: "is Required ?",
                },
              ],
            }}
          />
        }
        Header={<h4>Add Fields </h4>}
      />
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {optionSets["field-details"] &&
          optionSets["field-details"].length > 0 ? (
            optionSets["field-details"].map((item, index) => (
              <tr key={`table row ${index}`}>
                <td>{index + 1}</td>
                <td>{item.fieldName}</td>
                <td>{item.fieldType}</td>
                <th>
                  <Button
                    className="m-2"
                    onClick={() => {
                      setCrmValues(item);
                      setIsOpen(true);
                    }}
                  >
                    <Edit
                    // onClick={() => {
                    //   navigate(`/page-editor/${item.id}`);
                    // }}
                    ></Edit>
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(item, fieldLabel);
                    }}
                    disabled={deleteDisable.indexOf(item.id) > -1}
                    className="m-2 bg-danger"
                  >
                    <Delete></Delete>
                  </Button>
                </th>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>
                <div className="w-100 text-center">No content available</div>{" "}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
