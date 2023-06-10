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
  onChange,
}) {
  return (
    <div>
      <Form.Group className="mb-3" style={style} controlId={id}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <Form.Text className="text-muted">{helperText}</Form.Text>
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
  onChange: () => {},
};
