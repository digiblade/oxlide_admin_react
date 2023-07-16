import React from "react";
import A_TextInput from "../../../Atoms/Inputs/A_TextInput";
import {
  executeJS,
  objectDeepCopy,
  replacePlaceholders,
} from "../../../../Utils/utils";
import { fieldTypes } from "../../../../Const/types";
import A_OptionSets from "../../../Atoms/Inputs/A_OptionSets";
const handleShowHide = (item, crmValues) => {
  let { show } = item;
  if (show === undefined || show === null) {
    return true;
  } else if (typeof show === "boolean") {
    return show;
  } else if (typeof show === "object") {
    let { condition } = show;
    condition = replacePlaceholders(condition, crmValues);
    if (condition !== null) {
      let exe = executeJS(`return ${condition}`);
      return exe;
    } else {
      return false;
    }
  }
};
const formElementComponentSet = (
  fieldDetails,
  onValueChange,
  crmValues = {},
  optionSets = {}
) => {
  let {
    formType,
    subType,
    id,
    defaultValue,
    helperText,
    placeholder,
    label,
    required,
    error,
    errorText,
    optionSetName,
    optionSetLabel,
    optionSetValue,
  } = fieldDetails;
  let value = defaultValue;
  if (crmValues[id]) {
    value = crmValues[id];
  }
  switch (formType.toLowerCase()) {
    case fieldTypes.TEXT_INPUT:
      return (
        <A_TextInput
          key={id}
          type={subType}
          value={value}
          id={id}
          helperText={helperText}
          placeholder={placeholder}
          label={label}
          onChange={onValueChange}
          required={required ? required : false}
          error={error}
          errorText={errorText}
        />
      );
    case fieldTypes.OPTION_SET:
      return (
        <A_OptionSets
          optionSet={
            optionSets && optionSets[optionSetName]
              ? optionSets[optionSetName]
              : []
          }
          id={id}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          helperText={helperText}
          label={label}
          error={error}
          errorText={errorText}
          required={required}
          onChange={onValueChange}
          optionSetLabel={optionSetLabel}
          optionSetValue={optionSetValue}
        />
      );
    default:
      return <></>;
  }
};
export const jsonToFormComponent = (
  jsonConfig,
  onValueChange = (ele) => {},
  crmValues = {},
  optionSets = {}
) => {
  let jsonConfigToRenderFormData = objectDeepCopy(jsonConfig);
  let { formElements } = jsonConfigToRenderFormData;
  let finalFormComponentSets = [];
  if (formElements) {
    formElements = formElements.filter((item) =>
      handleShowHide(item, crmValues)
    );
    for (let formElement of formElements) {
      finalFormComponentSets.push(
        formElementComponentSet(
          formElement,
          onValueChange,
          crmValues,
          optionSets
        )
      );
    }
  }

  return finalFormComponentSets;
};
