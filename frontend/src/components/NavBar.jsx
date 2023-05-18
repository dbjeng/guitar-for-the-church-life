import {Nav, Navbar, Container} from 'react-bootstrap';
import "../styles/NavBar.css"

const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container className="container-fluid">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="ChordFilter">ChordFilter</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;