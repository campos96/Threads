import * as formik from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { ApiResponseError } from "../../types/ApiResponse";
import { login } from "../../services/auth.service";
import Login from "../../types/Login";
import { Button, Form, Spinner } from "react-bootstrap";
import ValidationErrors from "../../components/alerts/ValidationErrors";
import PATHS from "../../routes/paths";

const LoginForm = ({ onAuthSucceed = () => {} }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] =
    useState<Array<ApiResponseError>>();

  const { Formik } = formik;

  const initialValues = {
    username: "",
    password: "",
    rememberMe: false,
  } as Login;

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (loginValues: Login) => {
    setValidationErrors(undefined);
    setLoading(true);
    login(loginValues)
      .then(
        (response) => {
          if (response.status === 200) {
            onAuthSucceed();
          } else {
            setValidationErrors(response.errors);
          }
        },
        (error) => {
          setValidationErrors([{ key: "", value: "An error has ocurred." }]);
        }
      )
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleLogin}
      initialValues={initialValues}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Floating className="mb-3">
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
            />
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password:"
              value={values.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Floating>
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" className="form-switch" id="rememberMe">
              <Form.Check.Input type="checkbox" role="checkbox" />
              <Form.Check.Label>Remember me</Form.Check.Label>
            </Form.Check>
          </Form.Group>

          {validationErrors && <ValidationErrors list={validationErrors} />}

          <Form.Group className="mb-3">
            <a
              href={PATHS.FORGOT_PASSWORD}
              className="text-secondary float-start mt-2"
            >
              Forgot password?
            </a>
            <Button variant="primary" type="submit" className="float-end">
              {loading && <Spinner animation="border" size="sm"></Spinner>}
              <span>Log in</span>
            </Button>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
