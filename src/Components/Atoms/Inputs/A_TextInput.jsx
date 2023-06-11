import React from "react";
import { Form } from "react-bootstrap";

export default function A_TextInput({
  id,
  label,
  type,
  placeholder,
  helperText,
  style,
  value,
  error,
  errorText,
  onChange,
  required,
}) {
  return (
    <div>
      <Form.Group className="mb-3" style={style} controlId={id}>
        <Form.Label>
          {label} {required ? "*" : ""}
        </Form.Label>
        <Form.Control
          type={type}
          placeholder={`${placeholder} ${required ? "*" : ""}`}
          value={value}
          onChange={onChange}
        />
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
A_TextInput.defaultProps = {
  id: "id",
  label: "",
  type: "text",
  helperText: "",
  placeholder: "",
  style: {},
  value: "",
  errorText: "",
  required: false,
  error: false,
  onChange: () => {},
};
