import { Button, Card, Col, Row } from "react-bootstrap";
import PATHS from "../../routes/paths";
import SignupForm from "./SignupForm";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

const Signup = () => {
  const [signuoSucceed, setSignuoSucceed] = useState<boolean>(false);

  const onSucceed = () => {
    setSignuoSucceed(true);
  };

  return (
    <>
      {!signuoSucceed && (
        <Row className="justify-content-center">
          <Col sm={10} md={9} lg={8} xl={7} xxl={5}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="text-center mt-4 mb-5">
                  Sign up
                </Card.Title>
                <SignupForm onSucceed={onSucceed} />
              </Card.Body>
            </Card>
            <Row className="text-center mt-3">
              <Col>
                <hr />
                <p>Already have an account?</p>
                <Button href={PATHS.LOGIN} variant="outline-primary">
                  Login
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      {signuoSucceed && (
        <Row className="justify-content-center">
          <Col sm={10} md={9} lg={8} xl={7} xxl={5}>
            <Card>
              <Card.Body className="shadow-sm text-center">
                <h1>Thanks!</h1>
                <FontAwesomeIcon
                  className="text-success my-3"
                  size="8x"
                  icon={icon({ style: "regular", name: "circle-check" })}
                />
                <h3>Your account has been successfully created</h3>
                <Button href={PATHS.LOGIN} className="mt-3">
                  Go to login
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Signup;
