import { Button, Card, Col, Row } from "react-bootstrap";
import PATHS from "../../routes/paths";
import { useNavigate } from "react-router-dom";
import { userIdentity } from "../../services/identity.service";
import LoginForm from "./LoginForm";
import { Navigate } from "react-router-dom";

const Login = () => {
  var navigate = useNavigate();

  if (userIdentity()) {
    return <Navigate to={PATHS.HOME} />;
  }

  const onSucceed = () => {
    navigate(PATHS.HOME);
  };

  return (
    <Row className="justify-content-center">
      <Col sm={8} md={7} lg={6} xl={5} xxl={4}>
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title className="text-center mt-4 mb-5">Log in</Card.Title>
            <LoginForm onAuthSucceed={onSucceed} />
          </Card.Body>
        </Card>
        <Row className="text-center mt-3">
          <Col>
            <hr />
            <p>Don't have an account?</p>
            <Button href={PATHS.SIGNUP} variant="outline-teal">
              Sign up
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Login;
