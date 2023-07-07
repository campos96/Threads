import { useEffect } from "react";
import { logout } from "../../services/auth.service";
import { Button, Col, Row } from "react-bootstrap";
import PATHS from "../../routes/paths";

const Logout = () => {
  useEffect(() => {
    logout();
  }, []);

  return (
    <Row className="text-center">
      <Col sm={12} className="mt-3">
        <h1>You have been logged out</h1>
        <h3>Thank you</h3>
      </Col>
      <Col sm={12} className="mt-3">
        <Button variant="outline-primary" href={PATHS.LOGIN}>
          Log in
        </Button>
      </Col>
    </Row>
  );
};

export default Logout;
