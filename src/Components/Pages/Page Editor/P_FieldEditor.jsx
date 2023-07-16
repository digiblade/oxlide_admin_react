import React from "react";

export default function P_FieldEditor() {
  return <div>P_FieldEditor</div>;
}
import React from "react";

export default function P_FieldEditor() {
  const [key, setKey] = React.useState(0);

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <O_Form_Data_Mapping
                sourceLabel={"page-config"}
                crmValues={{}}
                formConfig={{
                  formElements: [
                    {
                      formType: fieldTypes.TEXT_INPUT,
                      subType: subTypes.TEXT,
                      id: "fieldName",
                      defaultValue: "",
                      helperText: "",
                      placeholder: "Enter field name",
                      label: "Field Name:",
                      required: true,
                    },
                    {
                      formType: fieldTypes.TEXT_INPUT,
                      subType: subTypes.EMAIL,
                      formType: fieldTypes.OPTION_SET,
                      optionSetName: "fieldType",
                      optionSetLabel: "categoryName",
                      optionSetValue: "categoryName",
                      id: "pageUrl",
                      defaultValue: "",
                      helperText: "",
                      placeholder: "Enter URL ",
                      label: "Page URL:",
                    },
                    {
                      formType: fieldTypes.TEXT_INPUT,
                      subType: subTypes.URL,
                      id: "pageDescription",
                      defaultValue: "",
                      helperText: "",
                      placeholder: "Enter Description",
                      label: "Description:",
                    },
                  ],
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
