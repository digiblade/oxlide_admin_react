import React from "react";
import M_FormRenderer from "../../Molecules/Forms/M_FormRenderer";
import { httpPOST } from "../../../Utils/Api";
export default function O_Form_Data_Mapping({
  sourceLabel,
  formConfig,
  header,
  onSubmit = () => {},
  crmValues,
  optionSets,
}) {
  let formDetails = formConfig;
  const handleFormSubmit = async (properties) => {
    let { id } = { ...properties };
    delete properties.id;

    let payload = {
      label: sourceLabel,
      id,
      properties,
    };
    await httpPOST("/crm-data-insert", payload);
    onSubmit(payload);
  };
  return (
    <div>
      <M_FormRenderer
        formBody={formDetails}
        onSubmit={handleFormSubmit}
        header={header}
        crmValues={crmValues}
        optionSets={optionSets}
      />
    </div>
  );
}
