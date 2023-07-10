import { Col, Container, ListGroup, Row } from "react-bootstrap";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Navigate, Outlet } from "react-router-dom";
import PATHS from "../../routes/paths";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { userIdentity } from "../../services/identity.service";

const Layout = () => {
  if (!userIdentity()) {
    return <Navigate to={PATHS.LOGIN} />;
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Container className="p-0 p-md-3 mt-0 mt-sm-3">
          <Row>
            <Col lg={3} className="sidebar d-none d-lg-block">
              <Sidebar />
            </Col>
            <Col>
              <Outlet />
            </Col>
            <Col xl={3}>
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
    <div className="sidebar-list">
      <a className="sidebar-link" href={PATHS.HOME}>
        <FontAwesomeIcon icon={icon({ name: "house" })} />
        Home
      </a>
      <a
        className="sidebar-link"
        href={PATHS.PROFILE + userIdentity()?.username}
      >
        <FontAwesomeIcon icon={icon({ name: "user" })} />
        Profile
      </a>
    </div>
  );
};

export default Layout;
