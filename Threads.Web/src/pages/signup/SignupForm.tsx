import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { FloatingText } from "../../components/form/inputs";
import * as formik from "formik";
import * as Yup from "yup";
import Signup from "../../types/Signup";
import { ApiResponseError } from "../../types/ApiResponse";
import { useState } from "react";
import ValidationErrors from "../../components/alerts/ValidationErrors";
import { signup } from "../../services/auth.service";

const SignupForm = ({ onSucceed = () => {} }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] =
    useState<Array<ApiResponseError>>();
  const { Formik } = formik;

  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  } as Signup;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required!"),
    lastName: Yup.string().required("This field is required!"),
    username: Yup.string().required("This field is required!"),
    email: Yup.string().email().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
    passwordConfirmation: Yup.string()
      .required("This field is required!")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const handleLogin = (values: Signup) => {
    setValidationErrors(undefined);
    setLoading(true);
    signup(values)
      .then(
        (response) => {
          if (response.status === 200) {
            onSucceed();
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
          <Row>
            <Col md={6}>
              <FloatingText
                name="name"
                value={values.name}
                label="Name"
                errorMessage={errors.name}
                handleChange={handleChange}
              />
            </Col>
            <Col md={6}>
              <FloatingText
                name="lastName"
                value={values.lastName}
                label="Last Name"
                errorMessage={errors.lastName}
                handleChange={handleChange}
              />
            </Col>
          </Row>

          <FloatingText
            name="username"
            value={values.username}
            label="Username"
            errorMessage={errors.username}
            handleChange={handleChange}
          />

          <FloatingText
            type="email"
            name="email"
            value={values.email}
            label="Email"
            errorMessage={errors.email}
            handleChange={handleChange}
          />

          <FloatingText
            type="password"
            name="password"
            value={values.password}
            label="Password"
            errorMessage={errors.password}
            handleChange={handleChange}
          />

          <FloatingText
            type="password"
            name="passwordConfirmation"
            value={values.passwordConfirmation}
            label="Password Confirmation"
            errorMessage={errors.passwordConfirmation}
            handleChange={handleChange}
          />

          {validationErrors && <ValidationErrors list={validationErrors} />}

          <Form.Group className="mb-3">
            <Button variant="primary" type="submit" className="float-end">
              {loading && <Spinner animation="border" size="sm" />}
              <span>Submit</span>
            </Button>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
