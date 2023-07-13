import { Button, Col, Image, Row } from "react-bootstrap";
import AstroDogPanaImage from "../../assets/img/astro-dog-pana.png";
import PATHS from "../../routes/paths";

const Landing = () => {
  return (
    <>
      <Row>
        <Col>
          <h5 className="display-5 text-center">
            Welcome to <strong>Theads</strong>
          </h5>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={10} lg={8} xl={7}>
          <Image src={AstroDogPanaImage} className="w-100" />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center gap-2">
          <Button href={PATHS.LOGIN} variant="teal">
            Log in
          </Button>
          <Button href={PATHS.SIGNUP} variant="outline-teal">
            Sign up
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Landing;
