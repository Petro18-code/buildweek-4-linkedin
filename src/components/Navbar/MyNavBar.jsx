import './MyNavBar.css';
import { FaSearch, FaHome, FaUserFriends, FaBriefcase, FaCommentDots, FaBell, FaUserCircle, FaLinkedin, FaBuilding } from 'react-icons/fa';
import { Col, Container } from 'react-bootstrap';
import { Navbar, Nav, Form, FormControl, Dropdown } from 'react-bootstrap';
const MyNavBar = () => {
  return (
    <Navbar className="navbar" fixed="top">
      <Container className='navbar__container'>
       
        <div className="navbar__left">
          <Navbar.Brand href="#">
            <FaLinkedin className="navbar__linkedinIcon" />
          </Navbar.Brand>
          <div className="navbar__search">
            <FaSearch />
            <Form.Control
              type="search"
              placeholder="Cerca"
              aria-label="Search"
              className="navbar__searchInput"
            />
          </div>
        </div>
    
        
        <div className="navbar__center">
          <Nav className="navbar__nav">
            <Nav.Item className="navbar__option">
              <FaHome className="navbar__icon" />
              <span>Home</span>
            </Nav.Item>
            <Nav.Item className="navbar__option">
              <FaUserFriends className="navbar__icon" />
              <span>Rete</span>
            </Nav.Item>
            <Nav.Item className="navbar__option">
              <FaBriefcase className="navbar__icon" />
              <span>Lavoro</span>
            </Nav.Item>
            <Nav.Item className="navbar__option">
              <FaCommentDots className="navbar__icon" />
              <span>Messaggistica</span>
            </Nav.Item>
            <Nav.Item className="navbar__option">
              <FaBell className="navbar__icon" />
              <span>Notifiche</span>
            </Nav.Item>
            <Dropdown className="navbar__option">
              <FaUserCircle className="navbar__icon" />
              <Dropdown.Toggle
                className="p-0 text-black text-decoration-none"
                id="dropdown-basic"
                variant="link"
              >
                Tu
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className="navbar__divider"></div>
            <Dropdown className="navbar__option">
              <FaBuilding className="navbar__icon" />
              <Dropdown.Toggle
                className="p-0 text-black text-decoration-none"
                id="dropdown-basic"
                variant="link"
              >
                Per le aziende
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Link className="navbar__optionText d-flex align-items-center">
              <div className='text-decoration-underline text-warning'>Prova Premium per 0</div>
              <span className='text-decoration-underline text-warning'>EUR</span>
            </Nav.Link>
          </Nav>
        </div>
        </Container>

    </Navbar>
  );
};

export default MyNavBar;
