import { useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { ApiResponseError } from "../../types/ApiResponse";
import * as formik from "formik";
import * as Yup from "yup";
import ValidationErrors from "../../components/alerts/ValidationErrors";
import PATHS from "../../routes/paths";
import { userIdentity } from "../../services/identity.service";
import { FloatingText, FloatingTextArea } from "../../components/form/inputs";
import AccountProfile from "../../types/AccountProfile";

const Edit = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3">Edit profile</Card.Title>
        <EditForm />
      </Card.Body>
    </Card>
  );
};

const EditForm = ({ onSucceed = () => {} }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] =
    useState<Array<ApiResponseError>>();

  const { Formik } = formik;

  const initialValues = {
    accountId: "",
    name: "",
    isPrivate: false,
  } as AccountProfile;

  const validationSchema = Yup.object().shape({
    accountId: Yup.string().required("This field is required!"),
    name: Yup.string().required("This field is required!"),
    isPrivate: Yup.string().required("This field is required!"),
  });

  const handleLogin = (editValyues: AccountProfile) => {
    setValidationErrors(undefined);
    setLoading(true);
    // login(loginValues)
    //   .then(
    //     (response) => {
    //       if (response.status === 200) {
    //         onSucceed();
    //       } else {
    //         setValidationErrors(response.errors);
    //       }
    //     },
    //     (error) => {
    //       setValidationErrors([{ key: "", value: "An error has ocurred." }]);
    //     }
    //   )
    //   .then(() => {
    //     setLoading(false);
    //   });
  };

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleLogin}
      initialValues={initialValues}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <FloatingText
            name="accountId"
            value={values.accountId}
            label="accountId"
            errorMessage={errors.accountId}
            handleChange={handleChange}
          />

          <Row>
            <Col md={8}>
              <FloatingText
                name="username"
                value={values.username}
                label="Username"
                errorMessage={errors.username}
                handleChange={handleChange}
              />
            </Col>
            <Col md={4} className="d-flex align-items-center">
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="isPrivate"
                  name="isPrivate"
                  label="Private profile"
                  checked={values.isPrivate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

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
                name="displayName"
                value={values.displayName}
                label="Display Name"
                errorMessage={errors.displayName}
                handleChange={handleChange}
              />
            </Col>
          </Row>

          <Row>
            <Col md={8}>
              <FloatingText
                name="email"
                value={values.email}
                label="Email"
                errorMessage={errors.email}
                handleChange={handleChange}
              />
            </Col>
            <Col md={4}>
              <FloatingText
                name="phone"
                value={values.phone}
                label="Phone"
                errorMessage={errors.phone}
                handleChange={handleChange}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Floating className="mb-3">
                <Form.Control
                  id="birthday"
                  type="date"
                  name="birthday"
                  placeholder="birthday"
                  value={values.birthday}
                  onChange={handleChange}
                />
                <Form.Label htmlFor="birthday">Birthday</Form.Label>
              </Form.Floating>
            </Col>
            <Col md={6}>
              <FloatingText
                name="gender"
                value={values.gender}
                label="Gender"
                errorMessage={errors.gender}
                handleChange={handleChange}
              />
            </Col>
          </Row>

          <FloatingTextArea
            height={100}
            name="biography"
            value={values.biography}
            label="Biography"
            errorMessage={errors.biography}
            handleChange={handleChange}
          />

          <FloatingText
            name="link"
            value={values.link}
            label="Link"
            errorMessage={errors.link}
            handleChange={handleChange}
          />

          {validationErrors && <ValidationErrors list={validationErrors} />}

          <Form.Group className="mb-3">
            <Button
              variant="outline-dark"
              type="submit"
              className="float-start"
              href={PATHS.PROFILE + userIdentity()?.username}
            >
              Back to profile
            </Button>
            <Button variant="primary" type="submit" className="float-end">
              {loading && <Spinner animation="border" size="sm"></Spinner>}
              <span>Submit</span>
            </Button>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default Edit;
