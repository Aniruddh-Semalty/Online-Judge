/* eslint-disable react/jsx-no-undef */
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Header(){
    return (
       <div>
         <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Online Judge</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Dashboard</Nav.Link>
            <Nav.Link href="#features">Problems</Nav.Link>
            <Nav.Link href="#pricing">Leaderboard</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
       </div>
    )
}