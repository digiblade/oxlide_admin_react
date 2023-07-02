import React from "react";
import A_TextInput from "../../../Atoms/Inputs/A_TextInput";
import { objectDeepCopy } from "../../../../Utils/utils";
import { fieldTypes } from "../../../../Const/types";
import A_OptionSets from "../../../Atoms/Inputs/A_OptionSets";
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
  formElements = formElements.filter((item) => item.hideInForm !== false);
  for (let formElement of formElements) {
    finalFormComponentSets.push(
      formElementComponentSet(formElement, onValueChange, crmValues, optionSets)
    );
  }
  return finalFormComponentSets;
};
