import React from "react";
import A_TextInput from "../../../Atoms/Inputs/A_TextInput";
import { objectDeepCopy } from "../../../../Utils/utils";
import { fieldTypes } from "../../../../Const/types";
const formElementComponentSet = (
  fieldDetails,
  onValueChange,
  crmValues = {}
) => {
  let {
    formType,
    subType,
    id,
    defaultValue,
    helperText,
    placeholder,
    label,
  } = fieldDetails;
  let value = defaultValue;
  if (crmValues[id]) {
    value = crmValues[id];
  }
  switch (formType.toLowerCase()) {
    case fieldTypes.TEXT_INPUT:
      return (
        <A_TextInput
          type={subType}
          value={value}
          id={id}
          helperText={helperText}
          placeholder={placeholder}
          label={label}
          onChange={onValueChange}
        />
      );
    default:
      return <></>;
  }
};
export const jsonToFormComponent = (
  jsonConfig,
  onValueChange = (ele) => {},
  crmValues = {}
) => {
  let jsonConfigToRenderFormData = objectDeepCopy(jsonConfig);
  let { formElements } = jsonConfigToRenderFormData;
  let finalFormComponentSets = [];
  for (formElement of formElements) {
    finalFormComponentSets.push(
      formElementComponentSet(formElement, onValueChange, crmValues)
    );
  }
  return finalFormComponentSets;
};