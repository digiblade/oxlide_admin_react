import React from "react";
import { fieldTypes, subTypes } from "../../../Const/types";
import M_FormRenderer from "../../Molecules/Forms/M_FormRenderer";
import { httpPOST } from "../../../Utils/Api";
export default function O_Tables_Data_Mapping({ sourceLabel }) {
  let formDetails = {
    formElements: [
      {
        formType: fieldTypes.TEXT_INPUT,
        subType: subTypes.TEXT,
        id: "clientName",
        defaultValue: "",
        helperText: "",
        placeholder: "Enter your name",
        label: "Client Name:",
        required: true,
      },
      {
        formType: fieldTypes.TEXT_INPUT,
        subType: subTypes.EMAIL,
        id: "clientEmail",
        defaultValue: "",
        helperText: "",
        placeholder: "Enter your email",
        label: "Client Email:",
      },
      {
        formType: fieldTypes.TEXT_INPUT,
        subType: subTypes.URL,
        id: "clientDomain",
        defaultValue: "",
        helperText: "",
        placeholder: "Enter client URL",
        label: "Client URL:",
      },
    ],
  };
  const handleFormSubmit = async (properties) => {
    let payload = {
      label: sourceLabel,
      properties,
    };
    await httpPOST("/crm-data-insert", payload);
  };
  return (
    <div>
      <M_FormRenderer
        formBody={formDetails}
        onSubmit={handleFormSubmit}
        header="Add client details"
      />
    </div>
  );
}
