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
  value,
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
        <Form.Select
          aria-label=""
          id={id}
          onChange={onChange}
          defaultValue={value}
        >
          {placeholder ? <option value={""}>{placeholder}</option> : ""}
          {Array.isArray(optionSet) &&
            optionSet.map((item) => {
              let tempValue =
                item[optionSetValue] !== undefined
                  ? item[optionSetValue]
                  : item["id"]
                  ? item["id"]
                  : "";
              return (
                <option
                  key={item.id}
                  id={item.id}
                  selected={value === tempValue}
                  value={tempValue}
                >
                  {item[optionSetLabel] || ""}
                </option>
              );
            })}
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
