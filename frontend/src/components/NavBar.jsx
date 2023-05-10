import {Nav, Navbar, Container} from 'react-bootstrap';
import "../styles/NavBar.css"

const NavBar = () => {
  return (
    <Navbar className="nav-style">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Container className='d-flex justify-content-between'>
            <Nav className="me-auto">
              <Nav.Link href="/" className="barlink">
                Home
              </Nav.Link>
              <Nav.Link href="/ChordFilter" className="barlink" style={{ fontSize: '1.2rem' }}>
                Chord Filter
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;