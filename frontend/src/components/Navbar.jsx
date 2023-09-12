import {Container, Nav, Navbar as ReactNavbar} from 'react-bootstrap';

export default function Navbar() {
  return (
    <ReactNavbar bg="primary" data-bs-theme="dark">
      <Container>
        <ReactNavbar.Brand href="/">Guitar for the Church Life</ReactNavbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/keyChordTable">Key-Chord Table</Nav.Link>
        </Nav>
      </Container>
    </ReactNavbar>
  );
}
