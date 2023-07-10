import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import PATHS from "../../routes/paths";
import { userIdentity } from "../../services/identity.service";

const AppNavbar = () => {
  var user = userIdentity();

  return (
    <Navbar expand="sm" className="bg-white border-bottom shadow-sm">
      <Container fluid>
        <Navbar.Brand href={PATHS.HOME}>Threads</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse className="mt-1" id="navbarSupportedContent">
          <Nav className="me-auto mb-2 mb-sm-0">
            <Nav.Item>
              <Nav.Link href={PATHS.HOME}>Home</Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="d-flex">
            <Row>
              <Col>
                <Nav className="me-auto mb-2 mb-sm-0">
                  <Nav.Item>
                    <Nav.Link href={PATHS.PROFILE + userIdentity()?.username}>{user?.name}</Nav.Link>
                  </Nav.Item>
                  <Button variant="outline-danger" href={PATHS.LOGOUT}>
                    Log out
                  </Button>
                </Nav>
              </Col>
            </Row>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
