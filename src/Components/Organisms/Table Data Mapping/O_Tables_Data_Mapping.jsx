import React from "react";
import { fieldTypes } from "../../../Const/types";

export default function O_Tables_Data_Mapping({ sourceLabel }) {
  let formDetails = {
    formElements: [
      {
        formType: fieldTypes.TEXT_INPUT,
        subType,
        id,
        defaultValue,
        helperText,
        placeholder,
        label,
      },
    ],
  };
  return (
    <div>
      <M_FormRenderer />
    </div>
  );
}
