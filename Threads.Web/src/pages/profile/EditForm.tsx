import { useState } from "react";
import AccountProfile from "../../types/AccountProfile";
import { ApiResponseError } from "../../types/ApiResponse";
import * as formik from "formik";
import * as Yup from "yup";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import {
  FloatingText,
  FloatingTextArea,
  HiddenInput,
} from "../../components/form/inputs";
import ValidationErrors from "../../components/alerts/ValidationErrors";
import PATHS from "../../routes/paths";
import { userIdentity } from "../../services/identity.service";
import { updateProfileAccount } from "../../services/profile.service";

type EditFormProps = {
  accountProfile: AccountProfile;
  onSucceed: () => void;
};

const EditForm = ({ accountProfile, onSucceed }: EditFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] =
    useState<Array<ApiResponseError>>();
  const { Formik } = formik;

  const validationSchema = Yup.object().shape({
    accountId: Yup.string().required("This field is required!"),
    name: Yup.string().required("This field is required!"),
    lastName: Yup.string().required("This field is required!"),
    isPrivate: Yup.string().required("This field is required!"),
    username: Yup.string().required("This field is required!"),
    email: Yup.string().required("This field is required!"),
  });

  const handleSubmit = (values: AccountProfile) => {
    setValidationErrors(undefined);
    setLoading(true);
    updateProfileAccount(values)
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
      onSubmit={handleSubmit}
      initialValues={accountProfile}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <formik.Form noValidate onSubmit={handleSubmit}>
          <HiddenInput
            name="accountId"
            value="{values.accountId}"
            handleChange={handleChange}
          />

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

          <Row>
            <Col md={6}>
              <FloatingText
                name="username"
                value={values.username}
                label="Username"
                errorMessage={errors.username}
                handleChange={handleChange}
                disabled={true}
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
                disabled={true}
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
              <FloatingText
                name="birthday"
                type="date"
                value={values.birthday}
                label="Birthday"
                errorMessage={errors.birthday}
                handleChange={handleChange}
              />
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

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              id="isPrivate"
              name="isPrivate"
              label="Private profile"
              checked={values.isPrivate || false}
              onChange={handleChange}
            />
          </Form.Group>

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
            <Button variant="teal" type="submit" className="float-end">
              {loading && <Spinner animation="border" size="sm" />}
              <span> Submit</span>
            </Button>
          </Form.Group>
        </formik.Form>
      )}
    </Formik>
  );
};

export default EditForm;
