import { Button, ButtonGroup, Container, Nav, Navbar } from "react-bootstrap";
import PATHS from "../../routes/paths";

const AppNavbar = () => {
  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand href={PATHS.LANDING_PAGE}>Threads</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse className="mt-1" id="navbarSupportedContent">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link href={PATHS.LANDING_PAGE}>Home</Nav.Link>
          </Nav>
          <div className="d-flex">
            <ButtonGroup className="gap-3">
              <Button href={PATHS.LOGIN} variant="primary">
                Log in
              </Button>
              <Button href={PATHS.SIGNUP} variant="outline-primary">
                Sign up
              </Button>
            </ButtonGroup>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
