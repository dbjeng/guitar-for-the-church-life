import {Container, Nav, Navbar as ReactNavbar} from 'react-bootstrap';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <ReactNavbar bg="primary" data-bs-theme="dark">
      <Container className={styles.container}>
        <ReactNavbar.Brand href="/">Guitar for the Church Life</ReactNavbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/keyChordTable">Key-Chord Table</Nav.Link>
        </Nav>
      </Container>
    </ReactNavbar>
  );
}
