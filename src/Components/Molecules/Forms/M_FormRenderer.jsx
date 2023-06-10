import React from "react";
import { Card } from "react-bootstrap";
import { objectDeepCopy } from "../../../../Utils/utils";

export default function M_FormRenderer({ header, formBody }) {
  const [formData, setFormData] = React.useState();
  const handleValueChange = (event) => {
    let tempFormData = objectDeepCopy(fromData);
    tempFormData[event.target.value] = event.target.value;
    setFormData(tempFormData);
  };
  React.useEffect(() => {}, []);
  return (
    <div>
      <Card>
        <Card.Header>{header}</Card.Header>
        <Card.body>
          {jsonToFormComponent(formBody, handleValueChange, formData)}
        </Card.body>
      </Card>
    </div>
  );
}
