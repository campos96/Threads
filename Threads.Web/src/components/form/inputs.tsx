import { Form } from "react-bootstrap";
import FloatingTextProps from "../../types/FloatingTextProps";

export const FloatingText = (props: FloatingTextProps) => {
  return (
    <Form.Floating className="mb-3">
      <Form.Control
        type={props.type ?? "text"}
        name={props.name}
        placeholder={props.label}
        disabled={props.disabled}
        value={props.value}
        onChange={props.handleChange}
        isInvalid={!!props.errorMessage}
      />
      <Form.Label htmlFor={props.name}>{props.label}</Form.Label>
      <Form.Control.Feedback type="invalid">
        {props.errorMessage}
      </Form.Control.Feedback>
    </Form.Floating>
  );
};

export const FloatingTextArea = (props: FloatingTextProps) => {
  return (
    <Form.Floating className="mb-3">
      <Form.Control
        as="textarea"
        name={props.name}
        disabled={props.disabled}
        placeholder={props.label}
        style={{ height: props.height }}
        value={props.value}
        onChange={props.handleChange}
        isInvalid={!!props.errorMessage}
      />
      <Form.Label htmlFor={props.name}>{props.label}</Form.Label>
      <Form.Control.Feedback type="invalid">
        {props.errorMessage}
      </Form.Control.Feedback>
    </Form.Floating>
  );
};
