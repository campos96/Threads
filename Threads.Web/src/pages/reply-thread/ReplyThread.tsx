import { Card, Col, Row, Image, Form, Button, Spinner } from "react-bootstrap";
import { userIdentity } from "../../services/identity.service";
import { API_URL, PROFILE } from "../../routes/endpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { ChangeEvent, useRef, useState } from "react";
import PATHS from "../../routes/paths";
import * as formik from "formik";
import * as Yup from "yup";
import { Thread, ThreadReply, ThreadType } from "../../types/Thread";
import { postThread, postThreadPicture } from "../../services/threads.service";
import { ApiResponseError } from "../../types/ApiResponse";
import ValidationErrors from "../../components/alerts/ValidationErrors";
import { useNavigate, useParams } from "react-router-dom";
import ThreadHeader from "../../components/threads/ThreadHeader";
import ThreadFooter from "../../components/threads/ThreadFooter";

const ReplyThread = () => {
  const navigate = useNavigate();
  const { threadId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [threadPicture, setThreadPicture] = useState<File>();
  const [validationErrors, setValidationErrors] =
    useState<Array<ApiResponseError>>();
  const { Formik } = formik;

  const handleSubmit = (values: Thread) => {
    console.log(values);
    setLoading(true);
    postThread(values).then(
      (response) => {
        if (response.status === 200) {
          if (threadPicture) {
            const thread = response.payload as Thread;
            postThreadPicture(thread.id, threadPicture).then((response) => {
              if (response.status === 200) {
                navigate(PATHS.HOME);
              }
            });
          } else {
            navigate(PATHS.HOME);
          }
        } else {
          setValidationErrors(response.errors);
        }
      },
      (error) => {
        setValidationErrors([{ key: "", value: "An error has ocurred." }]);
      }
    );
  };

  const handleOnInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setThreadPicture(e.target.files[0]);
    }
  };

  const handleRemovePicture = () => {
    setThreadPicture(undefined);
  };

  const initialValues = {
    accountId: userIdentity()!.id,
    created: new Date(),
    type: ThreadType.Thread,
    reply: ThreadReply.Anyone,
    description: "",
    repliedThreadId: threadId,
  } as Thread;

  const validationSchema = Yup.object().shape({
    description: Yup.string().required("This field is required!"),
  });

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="text-center">Reply</Card.Title>

        {threadId && (
            <ThreadHeader
              threadId={threadId}
              replyMode={true}
              handleUpdate={() => {}}
            />
        )}

        <Formik
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialValues={initialValues}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row>
                <Col xs="auto" className="overflow-hidden">
                  <Image
                    src={API_URL + PROFILE.GET_PHOTO + userIdentity()!.username}
                    roundedCircle
                    width={50}
                  />
                  <div className="thread-line"></div>
                </Col>
                <Col className="ps-0">
                  <strong>{userIdentity()!.username}</strong>
                  <Form.Group className="my-2">
                    <Form.Control
                      as="textarea"
                      name="description"
                      placeholder="Start a thread..."
                      rows={1}
                      style={{ border: 0 }}
                      value={values.description}
                      onChange={handleChange}
                      isInvalid={!!errors.description}
                      onInput={handleOnInput}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <input
                    id="profileFile"
                    type="file" 
                    accept="image/png, image/gif, image/jpeg"
                    className="d-none"
                    ref={hiddenFileInput}
                    onChange={handleFileSelected}
                  />

                  {threadPicture && (
                    <div className="position-relative">
                      <Image
                        src={URL.createObjectURL(threadPicture)}
                        className="rounded img-thumbnail w-100"
                      />
                      <button
                        onClick={() => handleRemovePicture()}
                        className="btn-image-close position-absolute end-0 top-0 m-3"
                      >
                        <FontAwesomeIcon icon={icon({ name: "close" })} />
                      </button>
                    </div>
                  )}

                  <Row>
                    <Col>
                      <Button
                        variant="text"
                        className="btn-icon float-start"
                        onClick={() => hiddenFileInput.current?.click()}
                      >
                        <FontAwesomeIcon icon={icon({ name: "paperclip" })} />
                      </Button>
                      <Button variant="text" className="btn-icon float-end">
                        <FontAwesomeIcon
                          icon={icon({ style: "regular", name: "eye" })}
                        />{" "}
                        Anyone can reply
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col sm="auto">
                  <div style={{ width: 50 }}>
                    <Image
                      src={
                        API_URL + PROFILE.GET_PHOTO + userIdentity()!.username
                      }
                      roundedCircle
                      style={{ marginLeft: 15, width: 20 }}
                    />
                  </div>
                </Col>
              </Row>

              {validationErrors && <ValidationErrors list={validationErrors} />}

              <Row className="mt-3">
                <Col>
                  <Button variant="outline-dark" href={PATHS.HOME}>
                    Cancel
                  </Button>
                  <Button variant="teal" className="float-end" type="submit">
                    {loading && <Spinner animation="border" size="sm" />}
                    <span> Post</span>
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default ReplyThread;
