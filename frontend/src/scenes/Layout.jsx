import React from 'react'

import { Container} from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

import NavBar from "../components/NavBar"

const Layout = () =>{
  return (
    <Container fluid className="p-0">
      <Container fluid className="p-0" style={{ minHeight: '100vh' }}>
        <NavBar />
        <Outlet />
      </Container>
    </Container>
  );
}

export default Layout;