import { NavLink } from "react-router-dom";
import { Nav, Container, Navbar } from "react-bootstrap";

function Header() {

    return <header className="headerMain">
        <Navbar className="headerNavbar" collapseOnSelect expand="lg" variant="light">
            <Container>
                <NavLink className="headerNavbarLogo" to="/students">
                    <span className="logoText">STUDENT-MENTOR</span>
                </NavLink>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <NavLink exact activeStyle={{ color: "black" }} className="navLinks"
                            to="/students">
                            Students
                        </NavLink>
                        <NavLink activeStyle={{ color: "black" }} className="navLinks"
                            to="/mentors">
                            Mentors
                        </NavLink>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>

}

export default Header;