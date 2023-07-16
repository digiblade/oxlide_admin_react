import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import O_Form_Data_Mapping from "../../Organisms/Table Data Mapping/O_Form_Data_Mapping";
import { fieldTypes, subTypes } from "../../../Const/types";
import M_Tabs from "../../Molecules/Tabs/M_Tabs";
import M_FormRenderer from "../../Molecules/Forms/M_FormRenderer";
import O_Dynamic_Form_Content from "../../Organisms/Dynamic Form Renderer/O_Dynamic_Form_Content";
import { connect } from "react-redux";

function P_TemplateEditor() {
  const [key, setKey] = React.useState(0);

  const [isLoading, setIsLoading] = React.useState(false);
  const [pageData, setPageData] = React.useState(false);
  const [optionSets, setOptionSets] = React.useState({});
  const [crmValues, setCrmValues] = React.useState({});
  React.useEffect(() => {
    let optionSetsDetails = {
      templateType: [
        {
          value: "view",
        },
        {
          value: "form",
        },
        {
          value: "result",
        },
      ],
    };
    setOptionSets(optionSetsDetails);
  }, []);
  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <M_Tabs
                variant="underline"
                tabs={[
                  {
                    title: "Template Details",
                    content: (
                      <>
                        {!isLoading && (
                          <M_FormRenderer
                            sourceLabel={"page-config"}
                            crmValues={
                              (crmValues && crmValues.pageDetails) || {}
                            }
                            showSubmit={false}
                            onFormChange={(formData) => setCrmValues(formData)}
                            formBody={{
                              formElements: [
                                {
                                  formType: fieldTypes.TEXT_INPUT,
                                  subType: subTypes.TEXT,
                                  id: "templateName",
                                  defaultValue: "",
                                  helperText: "",
                                  placeholder: "Enter page name",
                                  label: "Page Name:",
                                  required: true,
                                },
                                {
                                  formType: fieldTypes.TEXT_INPUT,
                                  subType: subTypes.EMAIL,
                                  id: "templateType",
                                  defaultValue: "",
                                  helperText: "",
                                  placeholder: "Select Type  ",
                                  label: "Type:",
                                },
                              ],
                            }}
                          />
                        )}
                      </>
                    ),
                  },
                  {
                    title: "Template Config",
                    content: (
                      <div className="playground">
                        <O_Dynamic_Form_Content />
                      </div>
                    ),
                  },
                ]}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    pageDetails: state.pageDetails,
  };
};
export default connect(mapStateToProps)(P_TemplateEditor);
