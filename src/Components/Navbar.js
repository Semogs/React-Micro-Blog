import React, { useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { logout } from "./Firebase";
import { TweetsContext } from "../Context/Context";

export default function NavBar() {
  const { setLoading, userData } = useContext(TweetsContext);
  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  return (
    <Navbar className="rounded" bg="secondary" variant="dark" fixed="top">
      <Container className="d-block">
        <Nav className="me-auto d-flex align-items-center">
          <Navbar.Collapse className="d-flex justify-content-start ms-5">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
          </Navbar.Collapse>
          <Navbar.Collapse className="d-flex justify-content-end">
            <Navbar.Text>Signed in as: {userData?.name}</Navbar.Text>
            <img className="nav-image" src={userData?.url} alt="" />
            <Button
              className="border-0 bg-transparent text-white-50"
              type="submit"
              onClick={handleLogout}
              href="/"
            >
              Log Out
            </Button>
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  );
}
