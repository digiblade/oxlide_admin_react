import React from "react";
import { Card, Button } from "react-bootstrap";
import { objectDeepCopy } from "../../../Utils/utils";
import { jsonToFormComponent } from "./Helper/FormRenderer.helper";
import { fieldMessages } from "../../../Const/message";
export default function M_FormRenderer({
  header,
  formBody,
  onSubmit,
  crmValues,
  optionSets,
}) {
  const [formData, setFormData] = React.useState(crmValues ? crmValues : {});
  const [formStructure, setFormStructure] = React.useState(
    objectDeepCopy(formBody)
  );
  const handleValueChange = (event) => {
    let tempFormData = objectDeepCopy(formData);
    if (event.target.value && event.target.value !== "") {
      tempFormData[event.target.id] = event.target.value;
    } else {
      delete tempFormData[event.target.id];
    }
    setFormData(tempFormData);
  };
  const checkValidations = () => {
    let isValid = true;
    let tempFormStructure = { ...formStructure };
    if (tempFormStructure["formElements"]) {
      tempFormStructure["formElements"] = tempFormStructure["formElements"].map(
        (field) => {
          if (
            field.required &&
            field.id &&
            (!formData[field.id] || formData[field.id] === "")
          ) {
            isValid = false;
            return { ...field, error: true, errorText: fieldMessages.REQUIRED };
          } else {
            delete field.error;
            delete field.errorText;
            return field;
          }
        }
      );
    }
    setFormStructure(tempFormStructure);
    return isValid;
  };
  const handleFormSubmit = () => {
    if (checkValidations(formData)) {
      onSubmit(objectDeepCopy(formData));
    }
  };
  return (
    <div>
      <Card>
        {header ? <Card.Header>{header}</Card.Header> : ""}
        <Card.Body>
          {jsonToFormComponent(
            formStructure,
            handleValueChange,
            formData,
            optionSets
          )}
        </Card.Body>
        <Card.Footer
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* <Button disabled={true}>Back</Button> */}
          <></>
          <Button onClick={handleFormSubmit}>Finish</Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
M_FormRenderer.defaultProps = {
  header: "",
  formBody: {},
  onSubmit: () => {},
};
