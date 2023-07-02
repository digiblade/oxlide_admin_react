import React from "react";
import { Form } from "react-bootstrap";

export default function A_OptionSets({
  optionSet,
  label,
  required,
  style,
  id,
  helperText,
  errorText,
  error,
  placeholder,
  optionSetLabel,
  optionSetValue,
  onChange = () => {},
}) {
  return (
    <div>
      <Form.Group className="mb-3" style={style} id={id}>
        {label ? (
          <Form.Label>
            {label} {required ? "*" : ""}
          </Form.Label>
        ) : (
          ""
        )}
        <Form.Select aria-label="" onChange={onChange}>
          {placeholder ? <option value={""}>{placeholder}</option> : ""}
          {Array.isArray(optionSet) &&
            optionSet.map((item) => (
              <option
                key={item.id}
                value={
                  item[optionSetValue]
                    ? item[optionSetValue]
                    : item["id"]
                    ? item["id"]
                    : ""
                }
              >
                {item[optionSetLabel] || ""}
              </option>
            ))}
        </Form.Select>
        <Form.Text className="text-muted">{helperText}</Form.Text>
        {error ? (
          <Form.Text className="text-muted color-danger">{errorText}</Form.Text>
        ) : (
          ""
        )}
      </Form.Group>
    </div>
  );
}
