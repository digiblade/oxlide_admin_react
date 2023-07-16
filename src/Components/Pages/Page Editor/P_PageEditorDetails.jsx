import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import O_Form_Data_Mapping from "../../Organisms/Table Data Mapping/O_Form_Data_Mapping";
import { fieldTypes, subTypes } from "../../../Const/types";
import { httpPOST } from "../../../Utils/Api";
import { useParams } from "react-router-dom";
import P_FieldPage from "./P_FieldPage";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
function P_PageEditorDetails({ pageData }) {
  const [key, setKey] = React.useState(0);
  const [crmValues, setCrmValues] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const { pageId } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    getPageData();
  }, []);
  const getPageData = async () => {
    setIsLoading(true);
    let payload = {
      pageId,
    };
    let { data } = await httpPOST("/get-page-details", payload);

    setCrmValues(data);
    setIsLoading(false);
  };
  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Tabs
                id="page-editor "
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
                variant="underline"
              >
                <Tab eventKey={0} title="Page Details">
                  {!isLoading && (
                    <O_Form_Data_Mapping
                      sourceLabel={"page-config"}
                      crmValues={crmValues.pageDetails || {}}
                      formConfig={{
                        formElements: [
                          {
                            formType: fieldTypes.TEXT_INPUT,
                            subType: subTypes.TEXT,
                            id: "pageName",
                            defaultValue: "",
                            helperText: "",
                            placeholder: "Enter page name",
                            label: "Page Name:",
                            required: true,
                          },
                          {
                            formType: fieldTypes.TEXT_INPUT,
                            subType: subTypes.EMAIL,
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
                  )}
                </Tab>
                <Tab eventKey={1} title="Fields">
                  <P_FieldPage />
                </Tab>
                <Tab eventKey={2} title="Templates">
                  <Button
                    onClick={() => navigate(`/template-editor/${pageId}`)}
                  >
                    Add
                  </Button>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageData && pageData.length > 0 ? (
                        pageData.map((item, index) => (
                          <tr key={`table row ${index}`}>
                            <td>{index + 1}</td>
                            <td>{item.pageName}</td>
                            <td>{item.pageUrl}</td>
                            <td>
                              {item.pageDescription ? item.pageDescription : ""}
                            </td>
                            {/* <th>
                              <Button className="m-2">
                                <Edit
                                  onClick={() => {
                                    navigate(`/page-editor/${item.id}`);
                                  }}
                                ></Edit>
                              </Button>
                              <Button
                                onClick={() => {
                                  handleDelete(item, "page-config");
                                }}
                                disabled={deleteDisable.indexOf(item.id) > -1}
                                className="m-2 bg-danger"
                              >
                                <Delete></Delete>
                              </Button>
                            </th> */}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5}>
                            <div className="w-100 text-center">
                              No content available
                            </div>{" "}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Tab>
              </Tabs>
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
export default connect(mapStateToProps)(P_PageEditorDetails);
