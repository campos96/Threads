import { Col, Container, ListGroup, Row } from "react-bootstrap";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import PATHS from "../../routes/paths";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

const Layout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Container fluid className=" mt-5">
          <Row>
            <Col md={2} className="sidebar">
              <Sidebar />
            </Col>
            <Col>
              <Outlet />
            </Col>
            <Col md={3}>
              <Footer />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

const Sidebar = () => {
  return (
    <ListGroup className="list-group">
      <ListGroup.Item action href={PATHS.HOME}>
        Home
        <FontAwesomeIcon icon={icon({ name: "house" })} className="float-end" />
      </ListGroup.Item>
      <ListGroup.Item action href={PATHS.PROFILE}>
        Profile
        <FontAwesomeIcon icon={icon({ name: "user" })} className="float-end" />
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Layout;
