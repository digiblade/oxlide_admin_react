import React from "react";
import { Table, Card, Button } from "react-bootstrap";
import A_SimpleModal from "../../Atoms/Modal/A_SimpleModal";
import O_Form_Data_Mapping from "../../Organisms/Table Data Mapping/O_Form_Data_Mapping";
import { httpPOST } from "../../../Utils/Api";
import { Edit, Delete } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import {
  SKUPage,
  categoryPage,
  productPage,
  subcategoryPage,
} from "../../../Configs/productPageConfig";
import { logSystemData } from "../../../Utils/utils";
import A_CardPlaceholder from "../../Atoms/Placeholder/A_CardPlaceholder";
export default function P_CrudPage({ optionSetLabels, pageLabel }) {
  const { sourceLabel } = useParams();
  const [open, setIsOpen] = React.useState(false);
  const [pageData, setPageData] = React.useState([]);
  const [crmValues, setCrmValues] = React.useState({});
  const [deleteDisable, setDeleteDisable] = React.useState([]);
  const [optionSets, setOptionSets] = React.useState({});
  const [formConfigData, setConfigData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    getFormConfig();
    getPage();
  }, [sourceLabel]);
  const getFormConfig = () => {
    let config = {};
    switch (sourceLabel) {
      case "product":
        config = { ...productPage };
        break;
      case "category":
        config = { ...categoryPage };
        break;
      case "subcategory":
        config = { ...subcategoryPage };
        break;
      case "sku":
        config = { ...SKUPage };
        break;
      default:
        config = {
          formConfig: {
            formElements: [],
          },
        };
    }
    setConfigData(config);
  };
  const getPage = async () => {
    try {
      setIsLoading(true);
      let payload = {
        sourceLabel,
      };
      let { data } = await httpPOST("/crm-data-get", payload);
      setPageData(data);

      let optionSetResponse = await httpPOST("/crm-multi-label-data-get", {
        sourceLabels: optionSetLabels,
      });
      setOptionSets(optionSetResponse.data || {});
    } catch (error) {
      logSystemData(error);
    }

    setIsLoading(false);
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
    <div key={sourceLabel}>
      <Button
        className="mb-3"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Add
      </Button>
      <Card>
        <Card.Header>
          {formConfigData.formConfig && formConfigData.formConfig.title}
        </Card.Header>
        <Card.Body>
          {isLoading ? (
            <A_CardPlaceholder />
          ) : (
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  {formConfigData.formConfig &&
                    formConfigData.formConfig.formElements &&
                    formConfigData.formConfig.formElements.map(
                      (item, index) => {
                        return <th key={index}>{item.tableLabel}</th>;
                      }
                    )}
                  {formConfigData.edit || formConfigData.delete ? (
                    <th>Action</th>
                  ) : (
                    ""
                  )}
                </tr>
              </thead>
              <tbody>
                {pageData.length > 0 ? (
                  pageData.map((item, index) => (
                    <tr key={`crud row ${index}`}>
                      {formConfigData.formConfig &&
                        formConfigData.formConfig.formElements &&
                        formConfigData.formConfig.formElements.map((config) => {
                          return <td key={index}>{item[config.id]}</td>;
                        })}

                      {formConfigData.edit || formConfigData.delete ? (
                        <td>
                          {formConfigData.edit ? (
                            <Button className="m-2">
                              <Edit
                                onClick={() => {
                                  setIsOpen(true);
                                  setCrmValues(item);
                                }}
                              ></Edit>
                            </Button>
                          ) : (
                            ""
                          )}
                          {formConfigData.delete ? (
                            <Button
                              onClick={() => {
                                handleDelete(item, sourceLabel);
                              }}
                              disabled={deleteDisable.indexOf(item.id) > -1}
                              className="m-2 bg-danger"
                            >
                              <Delete></Delete>
                            </Button>
                          ) : (
                            ""
                          )}
                        </td>
                      ) : (
                        ""
                      )}
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
          )}
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
            sourceLabel={sourceLabel}
            onSubmit={() => {
              getPage();
              setIsOpen(false);
              setCrmValues({});
            }}
            crmValues={crmValues}
            optionSets={optionSets}
            formConfig={formConfigData.formConfig}
          />
        }
        Header={<h4>Add Details </h4>}
      />
    </div>
  );
}
