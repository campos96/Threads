import { Form } from "react-bootstrap";
import FloatingTextProps from "../../types/FloatingTextProps";

export const FloatingText = (props: FloatingTextProps) => {
  return (
    <Form.Floating className="mb-3">
      <Form.Control
        type={props.type ?? "text"}
        name={props.name}
        placeholder={props.label || props.name}
        disabled={props.disabled}
        value={
          props.type === "date"
            ? props.value != null
              ? new Date(props.value).toISOString().split("T")[0]
              : ""
            : props.value || ""
        }
        onChange={props.handleChange}
        isInvalid={!!props.errorMessage}
      />
      <Form.Label htmlFor={props.name}>{props.label || props.name}</Form.Label>
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
        placeholder={props.label || props.name}
        style={{ height: props.height }}
        value={props.value}
        onChange={props.handleChange}
        isInvalid={!!props.errorMessage}
      />
      <Form.Label htmlFor={props.name}>{props.label || props.name}</Form.Label>
      <Form.Control.Feedback type="invalid">
        {props.errorMessage}
      </Form.Control.Feedback>
    </Form.Floating>
  );
};

export const HiddenInput = (props: FloatingTextProps) => {
  return <Form.Control type="hidden" name={props.name} value={props.value} />;
};
