import React from "react";
import { Table, Card, Button } from "react-bootstrap";
import A_SimpleModal from "../../Atoms/Modal/A_SimpleModal";
import O_Form_Data_Mapping from "../../Organisms/Table Data Mapping/O_Form_Data_Mapping";
import { fieldTypes, subTypes } from "../../../Const/types";
import { httpPOST } from "../../../Utils/Api";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
export default function P_PageEditor() {
  const [open, setIsOpen] = React.useState(false);
  const [pageData, setPageData] = React.useState([]);
  const [crmValues, setCrmValues] = React.useState({});
  const [deleteDisable, setDeleteDisable] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    getPage();
  }, []);
  const getPage = async () => {
    let payload = {
      sourceLabel: "page-config",
    };
    let { data } = await httpPOST("/crm-data-get", payload);
    setPageData(data);
  };
  const handleDelete = async (properties, sourceLabel) => {
    let { id } = { ...properties };
    setDeleteDisable([...deleteDisable, id]);
    delete properties.id;

    let payload = {
      label: sourceLabel,
      id,
      properties: { ...properties, isDeleted: true },
    };
    await httpPOST("/crm-data-insert", payload);
    let removedId = deleteDisable.filter((item) => item !== id);
    setDeleteDisable(removedId);
    getPage();
  };
  return (
    <div>
      <Button
        className="mb-3"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Add
      </Button>
      <Card>
        <Card.Header>Page Editor</Card.Header>
        <Card.Body>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Page</th>
                <th>URL</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length > 0 ? (
                pageData.map((item, index) => (
                  <tr key={`table row ${index}`}>
                    <td>{index + 1}</td>
                    <td>{item.pageName}</td>
                    <td>{item.pageUrl}</td>
                    <td>{item.pageDescription ? item.pageDescription : ""}</td>
                    <th>
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
                    </th>
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
        </Card.Body>
      </Card>
      <A_SimpleModal
        show={open}
        // onClose={() => setIsOpen(false)}
        onHide={() => {
          setIsOpen(false);
          setCrmValues({});
        }}
        content={
          <O_Form_Data_Mapping
            sourceLabel={"page-config"}
            onSubmit={() => {
              getPage();
              setIsOpen(false);
              setCrmValues({});
            }}
            crmValues={crmValues}
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
        }
        Header={<h4>Add Page</h4>}
      />
    </div>
  );
}
