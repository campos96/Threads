import { Col, Container, Row } from "react-bootstrap";
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
        <Container className="my-5 pt-5">
          <Row className="justify-content-center">
            <Col lg={3} className="sidebar d-none d-lg-block">
              <Sidebar />
            </Col>
            <Col md={9} lg={7} xl={6} xxl={5}>
              <Outlet />
            </Col>
            <Col xl={3}>
              <Footer />
            </Col>
          </Row>
        </Container>
        <div className="smartphone-menu d-lg-none">
          <a href={PATHS.HOME}>
            <FontAwesomeIcon icon={icon({ name: "house" })} />
            <p className="mb-0">Home</p>
          </a>

          <a href={PATHS.NEW_THREAD}>
            <FontAwesomeIcon icon={icon({ name: "pen-to-square" })} />
            <p className="mb-0">New thread</p>
          </a>

          <a href={PATHS.PROFILE + userIdentity()!.username}>
            <FontAwesomeIcon icon={icon({ name: "user" })} />
            <p className="mb-0">Profile</p>
          </a>
        </div>
      </main>
    </>
  );
};

const Sidebar = () => {
  return (
    <div className="my-3 my-lg-0">
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
        <a href={PATHS.NEW_THREAD} className="btn-action-teal mt-lg-3">
          New Thread
        </a>
      </div>
    </div>
  );
};

export default Layout;
