import { Alert } from "react-bootstrap";
import { ApiResponseError } from "../../types/ApiResponse";

type Errors = {
  list: Array<ApiResponseError>;
};

function ValidationErrors(errors: Errors) {
  if (errors === undefined || errors.list.length === 0) {
    return <></>;
  }

  return (
    <Alert variant="danger">
      <ul className="ps-3 mb-0">
        {errors.list.map((error, key) => (
          <li key={key}>{error.value}</li>
        ))}
      </ul>
    </Alert>
  );
}

export default ValidationErrors;
